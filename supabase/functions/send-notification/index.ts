const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/resend'
const NOTIFY_EMAIL = 'commercial.vitriweb@gmail.com'

const OrderNotificationSchema = z.object({
  type: z.literal('order'),
  customerName: z.string().min(1).max(200),
  customerPhone: z.string().min(1).max(50),
  customerEmail: z.string().email().optional().or(z.literal('')),
  orderType: z.string(),
  deliveryAddress: z.string().optional().or(z.literal('')),
  notes: z.string().optional().or(z.literal('')),
  totalAmount: z.number().min(0),
  items: z.array(z.object({
    name: z.string(),
    quantity: z.number(),
    subtotal: z.number(),
  })),
})

const ContactNotificationSchema = z.object({
  type: z.literal('contact'),
  name: z.string().min(1).max(200),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  subject: z.string().min(1).max(300),
  message: z.string().min(1).max(5000),
})

const BodySchema = z.discriminatedUnion('type', [OrderNotificationSchema, ContactNotificationSchema])

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY is not configured')

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY is not configured')

    const body = await req.json()
    const parsed = BodySchema.safeParse(body)
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.flatten().fieldErrors }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const data = parsed.data
    let subject: string
    let html: string

    if (data.type === 'order') {
      const itemsHtml = data.items.map(i =>
        `<tr><td style="padding:6px 12px;border-bottom:1px solid #eee">${i.quantity}x ${i.name}</td><td style="padding:6px 12px;border-bottom:1px solid #eee;text-align:right">$${i.subtotal.toFixed(2)}</td></tr>`
      ).join('')

      subject = `🍗 Nouvelle commande — ${data.customerName} ($${data.totalAmount.toFixed(2)})`
      html = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <h1 style="color:#d97706;border-bottom:2px solid #d97706;padding-bottom:10px">Nouvelle Commande</h1>
          <h3>Client</h3>
          <p><strong>Nom:</strong> ${escapeHtml(data.customerName)}<br/>
          <strong>Téléphone:</strong> ${escapeHtml(data.customerPhone)}<br/>
          ${data.customerEmail ? `<strong>Email:</strong> ${escapeHtml(data.customerEmail)}<br/>` : ''}
          <strong>Type:</strong> ${data.orderType === 'pickup' ? 'Ramassage' : 'Livraison'}<br/>
          ${data.deliveryAddress ? `<strong>Adresse:</strong> ${escapeHtml(data.deliveryAddress)}<br/>` : ''}
          ${data.notes ? `<strong>Notes:</strong> ${escapeHtml(data.notes)}` : ''}</p>
          <h3>Articles commandés</h3>
          <table style="width:100%;border-collapse:collapse">${itemsHtml}
            <tr><td style="padding:8px 12px;font-weight:bold">Total</td><td style="padding:8px 12px;font-weight:bold;text-align:right;color:#d97706">$${data.totalAmount.toFixed(2)}</td></tr>
          </table>
        </div>`
    } else {
      subject = `📩 Nouveau message — ${escapeHtml(data.subject)}`
      html = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <h1 style="color:#d97706;border-bottom:2px solid #d97706;padding-bottom:10px">Nouveau Message — Centre d'aide</h1>
          <p><strong>Nom:</strong> ${escapeHtml(data.name)}<br/>
          ${data.email ? `<strong>Email:</strong> ${escapeHtml(data.email)}<br/>` : ''}
          ${data.phone ? `<strong>Téléphone:</strong> ${escapeHtml(data.phone)}<br/>` : ''}
          <strong>Sujet:</strong> ${escapeHtml(data.subject)}</p>
          <h3>Message</h3>
          <div style="background:#f5f5f5;padding:16px;border-radius:8px;white-space:pre-wrap">${escapeHtml(data.message)}</div>
        </div>`
    }

    const response = await fetch(`${GATEWAY_URL}/emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'X-Connection-Api-Key': RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: 'Royal Chicken BBQ <onboarding@resend.dev>',
        to: [NOTIFY_EMAIL],
        subject,
        html,
      }),
    })

    const result = await response.json()
    if (!response.ok) {
      throw new Error(`Resend API failed [${response.status}]: ${JSON.stringify(result)}`)
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error: unknown) {
    console.error('Notification error:', error)
    const msg = error instanceof Error ? error.message : 'Unknown error'
    return new Response(JSON.stringify({ error: msg }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
