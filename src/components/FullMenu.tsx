import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

import wholeChickenImg from "@/assets/menu-whole-chicken.jpg";
import halfChickenImg from "@/assets/menu-half-chicken.jpg";
import chickenLegImg from "@/assets/menu-chicken-leg.jpg";
import friesImg from "@/assets/menu-fries.jpg";
import jollofImg from "@/assets/menu-jollof.jpg";
import saladImg from "@/assets/menu-salad.jpg";
import attiekeImg from "@/assets/gallery-attieke.jpg";
import plantainsImg from "@/assets/gallery-plantains.jpg";
import skewersImg from "@/assets/gallery-skewers.jpg";
import shrimpImg from "@/assets/gallery-shrimp.jpg";
import sandwichImg from "@/assets/gallery-sandwich.jpg";
import comboImg from "@/assets/menu-combo.jpg";
import bissapImg from "@/assets/gallery-bissap.jpg";
import gingerImg from "@/assets/menu-ginger-juice.jpg";
import platterImg from "@/assets/menu-platter.jpg";

const UBER_EATS_URL = "https://www.ubereats.com/ca/store/royal-chicken-bbq-197-rue-bank/";
const PROMO_CODE = "eats-pxvn2akvxy";

type MenuItem = {
  name: string;
  nameFr?: string;
  price: string;
  description?: string;
  image?: string;
};

type MenuCategory = {
  title: string;
  categoryImage: string;
  items: MenuItem[];
};

const menuData: MenuCategory[] = [
  {
    title: "⭐ Featured",
    categoryImage: platterImg,
    items: [
      { name: "Whole Chicken", nameFr: "Poulet Entier", price: "$28.00", description: "Tender and juicy chicken smothered with a rich sauce", image: wholeChickenImg },
      { name: "Half Chicken", nameFr: "Demi-poulet", price: "$16.95", description: "Tender smoky half chicken with a rich flavour", image: halfChickenImg },
      { name: "Fries", nameFr: "Frittes", price: "$11.50", image: friesImg },
    ],
  },
  {
    title: "🍗 Meats & Protein",
    categoryImage: skewersImg,
    items: [
      { name: "Whole Chicken", nameFr: "Poulet Entier", price: "$28.00", description: "Tender and juicy chicken smothered with a rich sauce", image: wholeChickenImg },
      { name: "Half Chicken", nameFr: "Demi-poulet", price: "$16.95", description: "Tender smoky half chicken with a rich flavour", image: halfChickenImg },
      { name: "Chicken Leg", nameFr: "Cuisse de Poulet", price: "$11.25", description: "Juicy and tender chicken leg", image: chickenLegImg },
      { name: "(2) Beef Skewers", nameFr: "Brochettes de boeuf", price: "$14.95", description: "Tender beef skewers, marinated to perfection", image: skewersImg },
      { name: "(2) Chicken Skewers", nameFr: "Brochettes de Poulet", price: "$14.50", description: "Two skewers of seasoned chicken pieces, ready to enjoy", image: skewersImg },
      { name: "Jumbo Shrimp Skewer", price: "$14.50", image: shrimpImg },
    ],
  },
  {
    title: "🥗 Side Dishes",
    categoryImage: jollofImg,
    items: [
      { name: "Fries", nameFr: "Frittes", price: "$11.50", image: friesImg },
      { name: "Jollof Rice", nameFr: "Riz Jollof", price: "$11.50", description: "Rice made of spices for a savory, aromatic delight", image: jollofImg },
      { name: "Salad", nameFr: "Salade", price: "$11.50", description: "Fresh mixed greens with tomato, cucumber and red pepper", image: saladImg },
      { name: "Attieke", nameFr: "Cassava Couscous", price: "$11.95", description: "Traditional West African dish made from cassava", image: attiekeImg },
      { name: "Fried Plantains", nameFr: "Plantains fries", price: "$11.50", description: "Sliced plantain, crispy on the outside and tender within", image: plantainsImg },
    ],
  },
  {
    title: "🔥 Combos",
    categoryImage: comboImg,
    items: [
      { name: "Half Chicken & Plantain", nameFr: "Moitié Poulet & Plantains Frits", price: "$26.50", image: comboImg },
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
    categoryImage: sandwichImg,
    items: [
      { name: "Mix Chicken/Beef Baguette", nameFr: "Sandwich Baguette au poulet et boeuf", price: "$16.45", description: "Baguette filled with a combination of chicken and beef", image: sandwichImg },
      { name: "Chicken Baguette", nameFr: "Sandwich Baguette au poulet", price: "$15.75", description: "Baguette filled with chicken, classic sandwich option", image: sandwichImg },
      { name: "Beef Baguette", nameFr: "Sandwich Baguette au boeuf", price: "$15.99", description: "Baguette filled with sliced beef, classic option", image: sandwichImg },
    ],
  },
  {
    title: "🥤 Beverages",
    categoryImage: bissapImg,
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
      { name: "Hibiscus Juice", nameFr: "Bissap", price: "$7.59", description: "Pure and refreshing hibiscus drink (Sorel)", image: bissapImg },
      { name: "Ginger Juice", nameFr: "Gnamakou", price: "$7.59", description: "Refreshing West African ginger juice", image: gingerImg },
    ],
  },
  {
    title: "🌶️ Extras",
    categoryImage: platterImg,
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
  const { addItem } = useCart();

  const parsePrice = (price: string) => parseFloat(price.replace("$", ""));

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      name: item.name,
      nameFr: item.nameFr,
      price: parsePrice(item.price),
      image: item.image,
    });
    toast.success(`${item.name} ajouté au panier`);
  };
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

        {/* Menu items with category image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            {/* Category hero image */}
            <div className="relative rounded-2xl overflow-hidden mb-8 aspect-[21/9]">
              <img
                src={menuData[activeCategory].categoryImage}
                alt={menuData[activeCategory].title}
                loading="lazy"
                width={1200}
                height={514}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
              <h3 className="absolute bottom-4 left-6 font-display text-2xl md:text-3xl font-bold text-white">
                {menuData[activeCategory].title}
              </h3>
            </div>

            <div className="space-y-1">
              {menuData[activeCategory].items.map((item, i) => (
                <motion.div
                  key={item.name + i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-4 py-4 border-b border-border/20 group"
                >
                  {/* Item thumbnail */}
                  {item.image && (
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                      {item.name}
                    </h4>
                    {item.nameFr && (
                      <span className="font-body text-xs text-muted-foreground italic">
                        {item.nameFr}
                      </span>
                    )}
                    {item.description && (
                      <p className="font-body text-sm text-muted-foreground mt-1 truncate">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <span className="font-body font-bold text-primary text-base whitespace-nowrap mr-2">
                    {item.price}
                  </span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/80 transition-colors flex-shrink-0"
                    aria-label={`Add ${item.name} to cart`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
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
