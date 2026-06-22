import { motion } from "framer-motion";
import { FiHome } from "react-icons/fi";
import PageTransition from "../components/layout/PageTransition";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <PageTransition>
      <div className="relative grid min-h-[calc(100vh-4rem)] place-items-center overflow-hidden px-5">
        <div className="bg-mesh pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl animate-float" />
        <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-accent-500/20 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

        <div className="relative text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="font-serif text-[8rem] font-bold leading-none tracking-tight text-gradient sm:text-[12rem]"
          >
            404
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-2xl font-semibold md:text-3xl"
          >
            This page took an early retirement.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-3 max-w-md text-soft"
          >
            The page you're looking for doesn't exist or has been moved. Let's get you back to something beautiful.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Button to="/"><FiHome /> Back home</Button>
            <Button to="/shop" variant="outline">Browse the shop</Button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
