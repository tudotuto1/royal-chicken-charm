import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const CartButton = () => {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <button
      onClick={() => setIsCartOpen(true)}
      className="relative p-2 text-foreground hover:text-primary transition-colors"
      aria-label="Open cart"
    >
      <ShoppingBag className="w-6 h-6" />
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-body font-bold w-5 h-5 rounded-full flex items-center justify-center"
          >
            {totalItems}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

export default CartButton;
