import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { ProductCardSkeleton } from "../ui/Skeleton";
import { stagger, viewportOnce } from "../../hooks/useScrollReveal";
import { useUIStore } from "../../store/useUIStore";
import { cn } from "../../utils/format";

export default function ProductGrid({ products, loading = false, count = 8, cols = "lg:grid-cols-4", className }) {
  const openQuickView = useUIStore((s) => s.openQuickView);

  if (loading) {
    return (
      <div className={cn("grid grid-cols-2 gap-4 sm:gap-6", cols, className)}>
        {Array.from({ length: count }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-app py-20 text-center">
        <p className="font-serif text-2xl">No pieces found</p>
        <p className="mt-2 text-soft">Try adjusting your filters or search.</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={stagger(0.06)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={cn("grid grid-cols-2 gap-4 sm:gap-6", cols, className)}
    >
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} onQuickView={openQuickView} />
      ))}
    </motion.div>
  );
}
