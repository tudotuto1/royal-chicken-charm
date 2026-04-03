import { motion } from "framer-motion";
import platterImg from "@/assets/menu-platter.jpg";
import jollofImg from "@/assets/menu-jollof.jpg";
import wholeChickenImg from "@/assets/menu-whole-chicken.jpg";

const dishes = [
  {
    name: "BBQ Platter",
    description: "Grilled chicken, kebabs & fries with signature sauces",
    price: "$18.99",
    image: platterImg,
  },
  {
    name: "Jollof Rice & Chicken",
    description: "West African classic with perfectly spiced rice",
    price: "$14.99",
    image: jollofImg,
  },
  {
    name: "Whole Roast Chicken",
    description: "Slow-roasted with herbs, potatoes & seasonal vegetables",
    price: "$19.99",
    image: wholeChickenImg,
  },
];

const MenuHighlights = () => {
  return (
    <section id="menu" className="py-24 bg-gradient-dark">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-body text-sm uppercase tracking-[0.2em] font-semibold">
            Our Specialties
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3">
            Fan Favourites
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {dishes.map((dish, i) => (
            <motion.div
              key={dish.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group bg-gradient-card rounded-2xl overflow-hidden shadow-warm hover:shadow-glow transition-all duration-500"
            >
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={dish.image}
                  alt={dish.description}
                  loading="lazy"
                  width={800}
                  height={800}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                <span className="absolute bottom-4 right-4 bg-primary text-primary-foreground font-body font-bold px-4 py-1.5 rounded-full text-sm">
                  {dish.price}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {dish.name}
                </h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                  {dish.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuHighlights;
