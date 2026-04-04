import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CartButton from "@/components/CartButton";

const links = [
  { label: "Menu", href: "#menu" },
  { label: "Full Menu", href: "#full-menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Hours", href: "#hours" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
  { label: "Aide", href: "/help" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-charcoal/80 backdrop-blur-lg border-b border-border/30">
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        <a href="#" className="font-display text-xl font-bold text-foreground">
          Royal <span className="text-gradient-fire">Chicken</span> BBQ
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <CartButton />
          <a
            href="tel:6132313010"
            className="bg-gradient-fire text-primary-foreground font-body font-semibold px-5 py-2 rounded-full text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            Order
          </a>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <CartButton />
          <button
            onClick={() => setOpen(!open)}
            className="text-foreground"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-charcoal/95 backdrop-blur-lg border-b border-border/30 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-4">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block font-body text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:6132313010"
                className="block bg-gradient-fire text-primary-foreground font-body font-semibold px-5 py-3 rounded-full text-center"
              >
                Call to Order
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
