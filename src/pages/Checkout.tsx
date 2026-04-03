import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, ShoppingBag, Loader2 } from "lucide-react";
import { toast } from "sonner";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    orderType: "pickup" as "pickup" | "delivery",
    address: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Veuillez remplir votre nom et numéro de téléphone.");
      return;
    }
    if (form.orderType === "delivery" && !form.address.trim()) {
      toast.error("Veuillez entrer une adresse de livraison.");
      return;
    }

    setLoading(true);
    try {
      // Insert order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          customer_name: form.name.trim(),
          customer_phone: form.phone.trim(),
          customer_email: form.email.trim() || null,
          order_type: form.orderType,
          delivery_address: form.orderType === "delivery" ? form.address.trim() : null,
          notes: form.notes.trim() || null,
          total_amount: totalPrice,
        })
        .select("id")
        .single();

      if (orderError) throw orderError;

      // Insert order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        item_name: item.name,
        item_name_fr: item.nameFr || null,
        quantity: item.quantity,
        unit_price: item.price,
        subtotal: item.price * item.quantity,
      }));

      const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
      if (itemsError) throw itemsError;

      clearCart();
      navigate(`/order-confirmation/${order.id}`);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la commande. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Panier vide</h2>
          <p className="text-muted-foreground font-body mb-6">Ajoutez des articles depuis le menu.</p>
          <Button onClick={() => navigate("/")} variant="outline" className="rounded-full">
            <ArrowLeft className="w-4 h-4 mr-2" /> Retour au menu
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8 max-w-2xl">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-body mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Retour au menu
        </button>

        <h1 className="font-display text-3xl font-bold text-foreground mb-8">Finaliser la commande</h1>

        {/* Order summary */}
        <div className="bg-gradient-card rounded-2xl border border-border/20 p-6 mb-8">
          <h3 className="font-display text-lg font-bold text-foreground mb-4">Résumé</h3>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.name} className="flex justify-between font-body text-sm">
                <span className="text-foreground">
                  {item.quantity}x {item.name}
                </span>
                <span className="text-primary font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-border/20 pt-3 flex justify-between font-body">
              <span className="font-bold text-foreground">Total</span>
              <span className="font-bold text-primary text-lg">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Checkout form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold text-foreground">Vos informations</h3>
            <Input name="name" placeholder="Nom complet *" value={form.name} onChange={handleChange} required className="rounded-xl bg-muted/30 border-border/30" />
            <Input name="phone" placeholder="Téléphone *" type="tel" value={form.phone} onChange={handleChange} required className="rounded-xl bg-muted/30 border-border/30" />
            <Input name="email" placeholder="Email (optionnel)" type="email" value={form.email} onChange={handleChange} className="rounded-xl bg-muted/30 border-border/30" />
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold text-foreground">Type de commande</h3>
            <div className="flex gap-3">
              {(["pickup", "delivery"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, orderType: type }))}
                  className={`flex-1 py-3 rounded-xl font-body font-semibold text-sm transition-all ${
                    form.orderType === type
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "bg-muted/30 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {type === "pickup" ? "🏪 Ramassage" : "🚗 Livraison"}
                </button>
              ))}
            </div>
            {form.orderType === "delivery" && (
              <Input name="address" placeholder="Adresse de livraison *" value={form.address} onChange={handleChange} className="rounded-xl bg-muted/30 border-border/30" />
            )}
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold text-foreground">Notes</h3>
            <textarea
              name="notes"
              placeholder="Instructions spéciales (optionnel)"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-xl bg-muted/30 border border-border/30 px-3 py-2 text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body font-semibold text-base py-6 rounded-full"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Envoi en cours...</>
            ) : (
              `Confirmer — $${totalPrice.toFixed(2)}`
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground font-body">
            💳 Le paiement Stripe sera bientôt disponible. Pour l'instant, payez sur place.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
