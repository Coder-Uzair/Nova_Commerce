import { motion } from "framer-motion";
import { FiArrowRight, FiPlay } from "react-icons/fi";
import Button from "../ui/Button";
import SmartImage from "../ui/SmartImage";

const img = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

const ease = [0.22, 1, 0.36, 1];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-mesh pointer-events-none absolute inset-0" />
      {/* floating orbs */}
      <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl animate-float" />
      <div className="pointer-events-none absolute -right-10 top-40 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-2">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-app glass px-4 py-1.5 text-xs font-medium"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            SS26 Collection — Now Available
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="mt-6 font-serif text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Wardrobe,
            <br />
            <span className="text-gradient">refined to essence.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease }}
            className="mt-6 max-w-md text-lg text-soft"
          >
            Limited-run pieces engineered from the world's finest materials. Quiet luxury, built to outlast trends and seasons.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Button to="/shop" size="lg">
              Explore Collection <FiArrowRight />
            </Button>
            <Button to="/about" variant="ghost" size="lg">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--surface-2)]">
                <FiPlay size={14} />
              </span>
              Our Story
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex items-center gap-8"
          >
            {[
              ["180k+", "Members"],
              ["4.9★", "Avg. rating"],
              ["90+", "Countries"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-serif text-2xl font-semibold">{n}</p>
                <p className="text-sm text-muted">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Visual collage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease }}
          className="relative mx-auto grid w-full max-w-md grid-cols-2 gap-4"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="space-y-4"
          >
            <SmartImage src={img("1551028719-00167b16eac5")} alt="Editorial" seed={1} className="aspect-[3/4] rounded-3xl shadow-glow" />
            <SmartImage src={img("1594938298603-c8148c4dae35")} alt="Editorial" seed={2} className="aspect-square rounded-3xl shadow-soft" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="space-y-4 pt-8"
          >
            <SmartImage src={img("1539533018447-63fcce2678e3")} alt="Editorial" seed={3} className="aspect-square rounded-3xl shadow-soft" />
            <SmartImage src={img("1576566588028-4147f3842f27")} alt="Editorial" seed={4} className="aspect-[3/4] rounded-3xl shadow-glow" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, type: "spring" }}
            className="absolute -left-6 top-1/2 hidden -translate-y-1/2 rounded-2xl glass p-4 shadow-glow sm:block"
          >
            <p className="text-xs text-muted">Crafted in</p>
            <p className="font-serif text-lg font-semibold">Italy 🇮🇹</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
