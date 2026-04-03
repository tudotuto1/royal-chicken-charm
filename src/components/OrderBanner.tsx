import { motion } from "framer-motion";
import { ExternalLink, Tag } from "lucide-react";

const UBER_EATS_URL = "https://www.ubereats.com/ca/store/royal-chicken-bbq-197-rue-bank/";
const PROMO_CODE = "eats-pxvn2akvxy";

const OrderBanner = () => {
  return (
    <section className="py-16 bg-gradient-fire relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cuc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')] opacity-30" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Tag className="w-4 h-4 text-white" />
            <span className="font-body text-sm font-semibold text-white">
              Promo: <span className="font-mono">{PROMO_CODE}</span>
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-black text-white mb-4">
            Hungry? Order Delivery Now
          </h2>
          <p className="font-body text-white/80 text-lg mb-8 max-w-lg mx-auto">
            Get Royal Chicken BBQ delivered to your door via Uber Eats. Use our promo code for a special offer on your first order!
          </p>
          <a
            href={UBER_EATS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-charcoal font-body font-bold px-8 py-4 rounded-full text-lg hover:bg-white/90 transition-colors shadow-xl"
          >
            <ExternalLink className="w-5 h-5" />
            Order on Uber Eats
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default OrderBanner;
