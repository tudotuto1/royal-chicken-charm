import { motion } from "framer-motion";
import { MapPin, Phone, Star } from "lucide-react";
import heroImg from "@/assets/hero-chicken.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Royal Chicken BBQ signature grilled chicken with rice and vegetables"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/80 to-charcoal/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          {/* Rating badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 bg-secondary/80 backdrop-blur-sm rounded-full px-4 py-2 mb-8"
          >
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="text-sm font-body font-medium text-foreground">4.9 / 5 — 63 avis</span>
          </motion.div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-6">
            <span className="text-foreground">Royal</span>
            <br />
            <span className="text-gradient-fire">Chicken</span>
            <br />
            <span className="text-foreground">BBQ</span>
          </h1>

          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-lg mb-8 leading-relaxed">
            Authentic grilled chicken & BBQ in the heart of Ottawa. 
            Smoky flavours, bold spices, unforgettable taste.
          </p>

          {/* Info pills */}
          <div className="flex flex-wrap gap-3 mb-10">
            <div className="flex items-center gap-2 bg-muted/60 backdrop-blur-sm rounded-full px-4 py-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-body text-foreground">197 Bank St, Ottawa</span>
            </div>
            <div className="flex items-center gap-2 bg-muted/60 backdrop-blur-sm rounded-full px-4 py-2">
              <Phone className="w-4 h-4 text-primary" />
              <span className="text-sm font-body text-foreground">(613) 231-3010</span>
            </div>
            <div className="bg-muted/60 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-sm font-body text-primary font-semibold">$10 – $20</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-4">
            <a
              href="https://www.ubereats.com/ca/store/royal-chicken-bbq-197-rue-bank/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-fire text-primary-foreground font-body font-semibold px-8 py-4 rounded-full text-lg hover:opacity-90 transition-opacity shadow-glow"
            >
              Order on Uber Eats
            </a>
            <a
              href="tel:6132313010"
              className="border border-border text-foreground font-body font-semibold px-8 py-4 rounded-full text-lg hover:bg-secondary transition-colors"
            >
              Call to Order
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-muted-foreground/40 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
