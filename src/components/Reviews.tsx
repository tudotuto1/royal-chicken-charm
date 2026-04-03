import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Sarah M.",
    text: "Best chicken BBQ in Ottawa, hands down! The flavours are incredible and the portions are generous.",
    rating: 5,
  },
  {
    name: "Ahmed K.",
    text: "The jollof rice is authentic and the grilled chicken is perfectly seasoned. My go-to spot!",
    rating: 5,
  },
  {
    name: "Julie T.",
    text: "Amazing food at great prices. The BBQ platter is a must-try. Will definitely come back!",
    rating: 5,
  },
  {
    name: "David L.",
    text: "Incredible value for money. Fresh, flavourful, and fast. The whole family loved it.",
    rating: 5,
  },
];

const Reviews = () => {
  return (
    <section id="reviews" className="py-24 bg-gradient-dark">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-body text-sm uppercase tracking-[0.2em] font-semibold">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3">
            What People Say
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            <span className="font-body text-foreground font-semibold">4.9</span>
            <span className="font-body text-muted-foreground text-sm">(63 reviews)</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-card rounded-2xl p-6 border border-border/30"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="font-body text-foreground text-sm leading-relaxed mb-4">
                "{review.text}"
              </p>
              <p className="font-body text-primary font-semibold text-sm">{review.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
