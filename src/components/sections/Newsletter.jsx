import { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiMail } from "react-icons/fi";
import Section from "../ui/Section";
import Button from "../ui/Button";
import { toast } from "../../store/useToastStore";
import { fadeUp, viewportOnce } from "../../hooks/useScrollReveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  return (
    <Section>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="relative overflow-hidden rounded-[2.5rem] border border-app p-10 text-center md:p-16"
      >
        <div className="bg-mesh absolute inset-0" />
        <div className="pointer-events-none absolute -right-10 -top-10 h-60 w-60 rounded-full bg-accent-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-60 w-60 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="relative">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 text-white">
            <FiMail size={24} />
          </span>
          <h2 className="mt-6 font-serif text-3xl font-semibold md:text-5xl">Join the inner circle</h2>
          <p className="mx-auto mt-4 max-w-md text-soft">
            Early access to drops, private sales and 10% off your first order. No noise — only the good stuff.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!email) return;
              toast.success("You're in. Check your inbox ✦");
              setEmail("");
            }}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="h-14 flex-1 rounded-full border border-app surface px-6 text-sm outline-none focus:ring-2 focus:ring-brand-500/40"
            />
            <Button type="submit" size="lg">
              Subscribe <FiArrowRight />
            </Button>
          </form>
          <p className="mt-4 text-xs text-muted">By subscribing you agree to our privacy policy.</p>
        </div>
      </motion.div>
    </Section>
  );
}
