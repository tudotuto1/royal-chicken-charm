import { MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-charcoal border-t border-border/30 py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-4">
              Royal <span className="text-gradient-fire">Chicken</span> BBQ
            </h3>
            <p className="font-body text-muted-foreground text-sm leading-relaxed">
              Authentic grilled chicken & BBQ in Ottawa. Bold spices, smoky flavours, made with love.
            </p>
          </div>

          <div>
            <h4 className="font-body font-semibold text-foreground mb-4 uppercase tracking-wider text-sm">
              Quick Links
            </h4>
            <div className="space-y-3">
              <a href="#menu" className="block font-body text-sm text-muted-foreground hover:text-primary transition-colors">Menu</a>
              <a href="#full-menu" className="block font-body text-sm text-muted-foreground hover:text-primary transition-colors">Full Menu</a>
              <a href="#gallery" className="block font-body text-sm text-muted-foreground hover:text-primary transition-colors">Gallery</a>
              <a href="#hours" className="block font-body text-sm text-muted-foreground hover:text-primary transition-colors">Hours & Location</a>
              <a href="#reviews" className="block font-body text-sm text-muted-foreground hover:text-primary transition-colors">Reviews</a>
              <a
                href="https://www.ubereats.com/ca/store/royal-chicken-bbq-197-rue-bank/"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-body text-sm text-primary font-semibold hover:text-primary/80 transition-colors"
              >
                Order on Uber Eats →
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-body font-semibold text-foreground mb-4 uppercase tracking-wider text-sm">
              Contact
            </h4>
            <div className="space-y-3">
              <a href="tel:6132313010" className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4" /> (613) 231-3010
              </a>
              <a
                href="https://maps.google.com/?q=197+Bank+St+Ottawa+ON+K2P+0A6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <MapPin className="w-4 h-4" /> 197 Bank St, Ottawa, ON
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 mt-12 pt-8 text-center">
          <p className="font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()} Royal Chicken BBQ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
