import { motion } from "framer-motion";
import Breadcrumbs from "./Breadcrumbs";

export default function PageHeader({ title, subtitle, crumbs }) {
  return (
    <section className="relative overflow-hidden border-b border-app">
      <div className="bg-mesh absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-20">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-4 font-serif text-4xl font-semibold tracking-tight md:text-6xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 max-w-2xl text-lg text-soft"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
