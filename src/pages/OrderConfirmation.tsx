import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Order = {
  id: string;
  customer_name: string;
  order_type: string;
  total_amount: number;
  created_at: string;
};

type OrderItem = {
  item_name: string;
  quantity: number;
  subtotal: number;
};

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;
      const [orderRes, itemsRes] = await Promise.all([
        supabase.from("orders").select("*").eq("id", orderId).single(),
        supabase.from("order_items").select("*").eq("order_id", orderId),
      ]);
      if (orderRes.data) setOrder(orderRes.data as Order);
      if (itemsRes.data) setOrderItems(itemsRes.data as OrderItem[]);
      setLoading(false);
    };
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Commande introuvable</h2>
          <Button onClick={() => navigate("/")} variant="outline" className="rounded-full">
            <ArrowLeft className="w-4 h-4 mr-2" /> Retour
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <CheckCircle className="w-20 h-20 text-primary mx-auto mb-6" />
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Commande confirmée !</h1>
        <p className="text-muted-foreground font-body mb-8">
          Merci {order.customer_name} ! Votre commande {order.order_type === "pickup" ? "sera prête pour le ramassage" : "sera livrée"} bientôt.
        </p>

        <div className="bg-gradient-card rounded-2xl border border-border/20 p-6 text-left mb-8">
          <h3 className="font-display text-lg font-bold text-foreground mb-4">Détails</h3>
          <div className="space-y-2">
            {orderItems.map((item, i) => (
              <div key={i} className="flex justify-between font-body text-sm">
                <span className="text-foreground">{item.quantity}x {item.item_name}</span>
                <span className="text-primary font-semibold">${Number(item.subtotal).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-border/20 pt-2 flex justify-between font-body">
              <span className="font-bold text-foreground">Total</span>
              <span className="font-bold text-primary">${Number(order.total_amount).toFixed(2)}</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground font-body mt-4">
            Numéro de commande : {order.id.slice(0, 8).toUpperCase()}
          </p>
        </div>

        <Button onClick={() => navigate("/")} className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-body">
          <ArrowLeft className="w-4 h-4 mr-2" /> Retour au menu
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
