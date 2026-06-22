import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import { useThemeStore } from "../../store/useThemeStore";

export default function ThemeToggle() {
  const { theme, toggle } = useThemeStore();
  const dark = theme === "dark";
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative grid h-10 w-10 place-items-center rounded-full border border-app surface transition hover:bg-[var(--surface-2)]"
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="text-[var(--text)]"
      >
        {dark ? <FiMoon size={18} /> : <FiSun size={18} />}
      </motion.span>
    </button>
  );
}
