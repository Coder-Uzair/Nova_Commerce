import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiHeart, FiShoppingBag, FiUser, FiMenu } from "react-icons/fi";
import ThemeToggle from "../ui/ThemeToggle";
import { navLinks } from "../../utils/constants";
import { useCartStore, selectCartCount } from "../../store/useCartStore";
import { useWishlistStore } from "../../store/useWishlistStore";
import { useUIStore } from "../../store/useUIStore";
import { cn } from "../../utils/format";

export default function Navbar({ onOpenMenu }) {
  const [scrolled, setScrolled] = useState(false);
  const cartCount = useCartStore(selectCartCount);
  const openCart = useCartStore((s) => s.openDrawer);
  const wishCount = useWishlistStore((s) => s.ids.length);
  const openSearch = useUIStore((s) => s.openSearch);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div className="relative z-40 overflow-hidden bg-gradient-to-r from-brand-600 to-accent-500 text-center text-white">
        <div className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium tracking-wide">
          <span>✦ Complimentary worldwide shipping over $250 — new SS26 collection now live</span>
        </div>
      </div>

      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50"
      >
        <div className={cn("transition-all duration-500", scrolled ? "px-3 pt-3" : "")}>
          <nav
            className={cn(
              "mx-auto flex h-16 max-w-7xl items-center justify-between px-5 transition-all duration-500 sm:px-8",
              scrolled
                ? "glass mt-0 rounded-full border border-app shadow-soft md:max-w-6xl"
                : "border-b border-transparent"
            )}
          >
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenMenu}
                className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-[var(--surface-2)] lg:hidden"
                aria-label="Open menu"
              >
                <FiMenu size={20} />
              </button>
              <Link to="/" className="group flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 font-serif text-lg font-bold text-white">
                  N
                </span>
                <span className="font-serif text-xl font-bold tracking-tight">NOVA</span>
              </Link>
            </div>

            <ul className="hidden items-center gap-1 lg:flex">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      cn(
                        "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                        isActive ? "text-[var(--text)]" : "text-soft hover:text-[var(--text)]"
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {l.label}
                        {isActive && (
                          <motion.span
                            layoutId="nav-pill"
                            className="absolute inset-0 -z-10 rounded-full bg-[var(--surface-2)]"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-1.5">
              <button
                onClick={openSearch}
                className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-[var(--surface-2)]"
                aria-label="Search"
              >
                <FiSearch size={18} />
              </button>
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>
              <Link
                to="/wishlist"
                className="relative grid h-10 w-10 place-items-center rounded-full transition hover:bg-[var(--surface-2)]"
                aria-label="Wishlist"
              >
                <FiHeart size={18} />
                {wishCount > 0 && <Dot>{wishCount}</Dot>}
              </Link>
              <Link
                to="/dashboard"
                className="hidden h-10 w-10 place-items-center rounded-full transition hover:bg-[var(--surface-2)] sm:grid"
                aria-label="Account"
              >
                <FiUser size={18} />
              </Link>
              <button
                onClick={openCart}
                className="relative grid h-10 w-10 place-items-center rounded-full transition hover:bg-[var(--surface-2)]"
                aria-label="Cart"
              >
                <FiShoppingBag size={18} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Dot>{cartCount}</Dot>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </nav>
        </div>
      </motion.header>
    </>
  );
}

function Dot({ children }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-accent-500 px-1 text-[10px] font-bold text-white">
      {children}
    </span>
  );
}
