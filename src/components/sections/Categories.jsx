import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import Section, { SectionHeading } from "../ui/Section";
import SmartImage from "../ui/SmartImage";
import { categories } from "../../data/products";
import { stagger, fadeUp, viewportOnce } from "../../hooks/useScrollReveal";

export default function Categories() {
  return (
    <Section>
      <SectionHeading
        overline="Browse"
        title="Shop by category"
        subtitle="Curated edits across every corner of the modern wardrobe."
      />
      <motion.div
        variants={stagger(0.07)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4 md:auto-rows-[240px]"
      >
        {categories.map((c, i) => (
          <motion.div
            key={c.id}
            variants={fadeUp}
            className={i === 0 || i === 3 ? "md:row-span-2 md:row-end-auto" : ""}
            style={i === 0 ? { gridRow: "span 2" } : i === 3 ? { gridRow: "span 2" } : {}}
          >
            <Link
              to="/shop"
              className="group relative block h-full overflow-hidden rounded-3xl border border-app"
            >
              <SmartImage
                src={c.image}
                alt={c.name}
                seed={i}
                className="h-full w-full transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-white">{c.name}</h3>
                  <p className="text-sm text-white/70">{c.count} pieces</p>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-full glass text-white transition-transform duration-300 group-hover:rotate-45">
                  <FiArrowUpRight />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
