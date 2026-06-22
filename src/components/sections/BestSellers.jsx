import { motion } from "framer-motion";
import { FiArrowRight, FiAward } from "react-icons/fi";
import Section from "../ui/Section";
import ProductCard from "../product/ProductCard";
import Button from "../ui/Button";
import { useUIStore } from "../../store/useUIStore";
import { bestSellers } from "../../data/products";
import { fadeUp, stagger, viewportOnce } from "../../hooks/useScrollReveal";

export default function BestSellers() {
  const items = bestSellers();
  const openQuickView = useUIStore((s) => s.openQuickView);

  return (
    <Section className="surface-2">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_2fr] lg:items-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-500">
            <FiAward /> Customer favourites
          </span>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight md:text-5xl">
            Best sellers, loved worldwide
          </h2>
          <p className="mt-4 text-soft">
            The pieces our community returns to again and again — proven, perfected, and always in demand.
          </p>
          <Button to="/shop" className="mt-6">
            Shop best sellers <FiArrowRight />
          </Button>
        </motion.div>

        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3"
        >
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onQuickView={openQuickView} />
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
