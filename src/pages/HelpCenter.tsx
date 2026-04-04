import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, HelpCircle, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HelpCenter = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.subject.trim() || !form.message.trim()) {
      toast.error("Veuillez remplir les champs obligatoires.");
      return;
    }

    setLoading(true);
    try {
      // Save to database
      const { error } = await supabase.from("contact_submissions").insert({
        name: form.name.trim(),
        email: form.email.trim() || null,
        phone: form.phone.trim() || null,
        subject: form.subject.trim(),
        message: form.message.trim(),
      });
      if (error) throw error;

      // Send email notification
      await supabase.functions.invoke("send-notification", {
        body: {
          type: "contact",
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        },
      });

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de l'envoi. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="bg-background">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center px-6 pt-16">
          <div className="max-w-md w-full text-center">
            <CheckCircle className="w-20 h-20 text-primary mx-auto mb-6" />
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">Message envoyé !</h1>
            <p className="text-muted-foreground font-body mb-8">
              Merci {form.name} ! Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.
            </p>
            <Button onClick={() => navigate("/")} className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-body">
              <ArrowLeft className="w-4 h-4 mr-2" /> Retour au site
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-background">
      <Navbar />
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-2xl">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-body mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour
          </button>

          <div className="text-center mb-10">
            <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">Centre d'aide</h1>
            <p className="text-muted-foreground font-body">
              Un problème ? Une question ? Écrivez-nous et nous vous répondrons rapidement.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Input name="name" placeholder="Votre nom *" value={form.name} onChange={handleChange} required className="rounded-xl bg-muted/30 border-border/30" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input name="email" placeholder="Email (optionnel)" type="email" value={form.email} onChange={handleChange} className="rounded-xl bg-muted/30 border-border/30" />
                <Input name="phone" placeholder="Téléphone (optionnel)" type="tel" value={form.phone} onChange={handleChange} className="rounded-xl bg-muted/30 border-border/30" />
              </div>
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="w-full rounded-xl bg-muted/30 border border-border/30 px-3 py-2.5 text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Choisir un sujet *</option>
                <option value="Problème de commande">Problème de commande</option>
                <option value="Problème technique">Problème technique</option>
                <option value="Question générale">Question générale</option>
                <option value="Suggestion">Suggestion</option>
                <option value="Autre">Autre</option>
              </select>
              <textarea
                name="message"
                placeholder="Décrivez votre problème ou question *"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
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
                "Envoyer le message"
              )}
            </Button>
          </form>

          {/* Contact info */}
          <div className="mt-12 bg-gradient-card rounded-2xl border border-border/20 p-6 text-center">
            <h3 className="font-display text-lg font-bold text-foreground mb-2">Besoin d'aide immédiate ?</h3>
            <p className="font-body text-muted-foreground text-sm mb-4">
              Appelez-nous directement pour une assistance rapide.
            </p>
            <a
              href="tel:6132313010"
              className="inline-flex items-center gap-2 bg-gradient-fire text-primary-foreground font-body font-semibold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity"
            >
              📞 (613) 231-3010
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default HelpCenter;
