import { motion } from "framer-motion";
import { FiMessageCircle } from "react-icons/fi";
import PageHeader from "../components/ui/PageHeader";
import PageTransition from "../components/layout/PageTransition";
import Accordion from "../components/ui/Accordion";
import Button from "../components/ui/Button";
import { faqs } from "../data/products";
import { fadeUp, viewportOnce } from "../hooks/useScrollReveal";

export default function FAQ() {
  return (
    <PageTransition>
      <PageHeader title="Frequently asked questions" subtitle="Everything you need to know about NOVA, shipping, returns and more." crumbs={[{ label: "Home", to: "/" }, { label: "FAQ" }]} />
      <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
          <Accordion items={faqs} />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-10 flex flex-col items-center gap-4 rounded-3xl border border-app bg-mesh p-10 text-center"
        >
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 text-white">
            <FiMessageCircle size={24} />
          </span>
          <h3 className="font-serif text-2xl font-semibold">Still have questions?</h3>
          <p className="max-w-md text-soft">Our concierge team is available 24/7 to help with anything at all.</p>
          <Button to="/contact">Contact support</Button>
        </motion.div>
      </div>
    </PageTransition>
  );
}
