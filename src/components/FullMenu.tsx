import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";

const UBER_EATS_URL = "https://www.ubereats.com/ca/store/royal-chicken-bbq-197-rue-bank/";
const PROMO_CODE = "eats-pxvn2akvxy";

type MenuItem = {
  name: string;
  nameFr?: string;
  price: string;
  description?: string;
};

type MenuCategory = {
  title: string;
  items: MenuItem[];
};

const menuData: MenuCategory[] = [
  {
    title: "⭐ Featured",
    items: [
      { name: "Whole Chicken", nameFr: "Poulet Entier", price: "$28.00", description: "Tender and juicy chicken smothered with a rich sauce" },
      { name: "Half Chicken", nameFr: "Demi-poulet", price: "$16.95", description: "Tender smoky half chicken with a rich flavour" },
      { name: "Fries", nameFr: "Frittes", price: "$11.50" },
    ],
  },
  {
    title: "🍗 Meats & Protein",
    items: [
      { name: "Whole Chicken", nameFr: "Poulet Entier", price: "$28.00", description: "Tender and juicy chicken smothered with a rich sauce" },
      { name: "Half Chicken", nameFr: "Demi-poulet", price: "$16.95", description: "Tender smoky half chicken with a rich flavour" },
      { name: "Chicken Leg", nameFr: "Cuisse de Poulet", price: "$11.25", description: "Juicy and tender chicken leg" },
      { name: "(2) Beef Skewers", nameFr: "Brochettes de boeuf", price: "$14.95", description: "Tender beef skewers, marinated to perfection" },
      { name: "(2) Chicken Skewers", nameFr: "Brochettes de Poulet", price: "$14.50", description: "Two skewers of seasoned chicken pieces, ready to enjoy" },
      { name: "Jumbo Shrimp Skewer", price: "$14.50" },
    ],
  },
  {
    title: "🥗 Side Dishes",
    items: [
      { name: "Fries", nameFr: "Frittes", price: "$11.50" },
      { name: "Jollof Rice", nameFr: "Riz Jollof", price: "$11.50", description: "Rice made of spices for a savory, aromatic delight" },
      { name: "Salad", nameFr: "Salade", price: "$11.50", description: "Fresh mixed greens with tomato, cucumber and red pepper" },
      { name: "Attieke", nameFr: "Cassava Couscous", price: "$11.95", description: "Traditional West African dish made from cassava" },
      { name: "Fried Plantains", nameFr: "Plantains fries", price: "$11.50", description: "Sliced plantain, crispy on the outside and tender within" },
    ],
  },
  {
    title: "🔥 Combos",
    items: [
      { name: "Half Chicken & Plantain", nameFr: "Moitié Poulet & Plantains Frits", price: "$26.50" },
      { name: "Half Chicken & Salad", nameFr: "Moitié poulet et salade", price: "$26.50" },
      { name: "Half Chicken & Fries", nameFr: "Moitié poulet & Frittes", price: "$26.50" },
      { name: "Half Chicken & Rice", nameFr: "Moitié Poulet & Riz", price: "$26.50" },
      { name: "Half Chicken & Cassava", nameFr: "Moitié poulet et Attieké", price: "$27.50" },
      { name: "Quarter Chicken & Rice", nameFr: "Quart de poulet & Riz", price: "$21.75" },
      { name: "Quarter Chicken & Plantain", nameFr: "Quart de poulet et plantains frits", price: "$21.75" },
      { name: "Quarter Chicken & Fries", nameFr: "Quart de poulet et Frittes", price: "$21.75" },
      { name: "Quarter Chicken & Cassava", nameFr: "Quart de Poulet & Attieké", price: "$22.75" },
      { name: "Quarter Chicken & Salad", nameFr: "Quart de Poulet & Salade", price: "$21.75" },
      { name: "Lil Hungry", nameFr: "Petite faim", price: "$15.75", description: "Chicken thigh & 1 side" },
    ],
  },
  {
    title: "🥖 Sandwiches",
    items: [
      { name: "Mix Chicken/Beef Baguette", nameFr: "Sandwich Baguette au poulet et boeuf", price: "$16.45", description: "Baguette filled with a combination of chicken and beef" },
      { name: "Chicken Baguette", nameFr: "Sandwich Baguette au poulet", price: "$15.75", description: "Baguette filled with chicken, classic sandwich option" },
      { name: "Beef Baguette", nameFr: "Sandwich Baguette au boeuf", price: "$15.99", description: "Baguette filled with sliced beef, classic option" },
    ],
  },
  {
    title: "🥤 Beverages",
    items: [
      { name: "Water", price: "$1.80", description: "Pure and refreshing hydration" },
      { name: "Sprite", price: "$3.00" },
      { name: "Crush Orange", price: "$3.00" },
      { name: "Coke", price: "$3.00", description: "Classic carbonated soft drink" },
      { name: "Coke Zero", price: "$3.00" },
      { name: "Fanta Orange", price: "$3.00" },
      { name: "Fanta Pineapple", nameFr: "Ananas", price: "$3.50" },
      { name: "Pepsi", price: "$3.00" },
      { name: "Fanta Strawberry", nameFr: "Fraise", price: "$3.50" },
      { name: "Hibiscus Juice", nameFr: "Bissap", price: "$7.59", description: "Pure and refreshing hibiscus drink (Sorel)" },
      { name: "Ginger Juice", nameFr: "Gnamakou", price: "$7.59", description: "Refreshing West African ginger juice" },
    ],
  },
  {
    title: "🌶️ Extras",
    items: [
      { name: "Condiments", price: "$1.00", description: "Mix of tomatoes, onions & cucumbers" },
      { name: "In-House Hot Sauce", nameFr: "Sauce piquante", price: "$1.00", description: "A tangy sauce to add a bold kick" },
      { name: "Mayo", price: "$0.50", description: "Smooth and creamy condiment" },
      { name: "Ketchup", price: "$0.50" },
    ],
  },
];

const FullMenu = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="full-menu" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary font-body text-sm uppercase tracking-[0.2em] font-semibold">
            Full Menu
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3">
            Our Complete Menu
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-md mx-auto">
            Prices from our Uber Eats menu. Dine-in prices may vary.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {menuData.map((cat, i) => (
            <button
              key={cat.title}
              onClick={() => setActiveCategory(i)}
              className={`font-body text-sm px-4 py-2 rounded-full transition-all duration-300 ${
                activeCategory === i
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Menu items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            <div className="space-y-1">
              {menuData[activeCategory].items.map((item, i) => (
                <motion.div
                  key={item.name + i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-start justify-between gap-4 py-4 border-b border-border/20 group"
                >
                  <div className="flex-1">
                    <h4 className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                      {item.name}
                    </h4>
                    {item.nameFr && (
                      <span className="font-body text-xs text-muted-foreground italic">
                        {item.nameFr}
                      </span>
                    )}
                    {item.description && (
                      <p className="font-body text-sm text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <span className="font-body font-bold text-primary text-base whitespace-nowrap">
                    {item.price}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Uber Eats CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-card rounded-2xl p-8 max-w-xl mx-auto border border-border/20">
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">
              Order on Uber Eats
            </h3>
            <p className="font-body text-muted-foreground text-sm mb-4">
              Use promo code <span className="text-primary font-bold">{PROMO_CODE}</span> for a discount on your first order!
            </p>
            <a
              href={UBER_EATS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[hsl(142,72%,40%)] hover:bg-[hsl(142,72%,35%)] text-white font-body font-semibold px-8 py-4 rounded-full text-lg transition-colors shadow-lg"
            >
              <ExternalLink className="w-5 h-5" />
              Order on Uber Eats
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FullMenu;
