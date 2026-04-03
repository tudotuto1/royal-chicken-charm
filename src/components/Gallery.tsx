import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import platterImg from "@/assets/menu-platter.jpg";
import jollofImg from "@/assets/menu-jollof.jpg";
import wholeChickenImg from "@/assets/menu-whole-chicken.jpg";
import plantainsImg from "@/assets/gallery-plantains.jpg";
import skewersImg from "@/assets/gallery-skewers.jpg";
import sandwichImg from "@/assets/gallery-sandwich.jpg";
import attiekeImg from "@/assets/gallery-attieke.jpg";
import bissapImg from "@/assets/gallery-bissap.jpg";
import shrimpImg from "@/assets/gallery-shrimp.jpg";

const photos = [
  { src: wholeChickenImg, alt: "Whole roast chicken with signature BBQ sauce" },
  { src: platterImg, alt: "BBQ platter with grilled chicken and sides" },
  { src: jollofImg, alt: "Jollof rice with grilled chicken" },
  { src: skewersImg, alt: "Beef skewers on the grill" },
  { src: plantainsImg, alt: "Crispy fried plantains" },
  { src: sandwichImg, alt: "Chicken baguette sandwich" },
  { src: attiekeImg, alt: "Attieke cassava couscous with chicken" },
  { src: shrimpImg, alt: "Jumbo grilled shrimp skewers" },
  { src: bissapImg, alt: "Natural hibiscus juice (Bissap)" },
];

const Gallery = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-24 bg-gradient-dark">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-body text-sm uppercase tracking-[0.2em] font-semibold">
            Gallery
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3">
            Our Dishes
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {photos.map((photo, i) => (
            <motion.button
              key={photo.alt}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              onClick={() => setSelected(i)}
              className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                i === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <div className={`aspect-square ${i === 0 ? "aspect-auto h-full" : ""}`}>
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  width={800}
                  height={800}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors duration-300" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-charcoal/95 flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              key={selected}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={photos[selected].src}
              alt={photos[selected].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
