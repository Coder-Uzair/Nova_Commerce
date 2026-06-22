import { AnimatePresence, motion } from "framer-motion";
import { FiX, FiPlus, FiMinus, FiTrash2, FiShoppingBag } from "react-icons/fi";
import SmartImage from "../ui/SmartImage";
import Button from "../ui/Button";
import { useCartStore, selectSubtotal } from "../../store/useCartStore";
import { useLockBody } from "../../hooks/useLockBody";
import { formatPrice } from "../../utils/format";
import { FREE_SHIPPING_THRESHOLD } from "../../utils/constants";

export default function CartDrawer() {
  const { items, drawerOpen, closeDrawer, updateQty, removeItem } = useCartStore();
  const subtotal = useCartStore(selectSubtotal);
  useLockBody(drawerOpen);

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <AnimatePresence>
      {drawerOpen && (
        <div className="fixed inset-0 z-[130]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col surface border-l border-app"
          >
            <div className="flex items-center justify-between border-b border-app p-5">
              <h3 className="flex items-center gap-2 font-serif text-xl font-semibold">
                <FiShoppingBag /> Your Bag
                <span className="text-sm font-normal text-muted">({items.length})</span>
              </h3>
              <button onClick={closeDrawer} className="grid h-9 w-9 place-items-center rounded-full hover:bg-[var(--surface-2)]">
                <FiX />
              </button>
            </div>

            {items.length > 0 && (
              <div className="border-b border-app px-5 py-4">
                <p className="text-xs text-soft">
                  {remaining > 0 ? (
                    <>You're <span className="font-semibold text-[var(--text)]">{formatPrice(remaining)}</span> away from free shipping</>
                  ) : (
                    <span className="font-semibold text-emerald-500">✓ You've unlocked free shipping!</span>
                  )}
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--surface-2)]">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-brand-600 to-accent-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="grid h-20 w-20 place-items-center rounded-full surface-2">
                    <FiShoppingBag size={28} className="text-muted" />
                  </div>
                  <p className="mt-4 font-serif text-xl">Your bag is empty</p>
                  <p className="mt-1 text-sm text-soft">Discover something you'll love.</p>
                  <Button to="/shop" onClick={closeDrawer} className="mt-5">
                    Start shopping
                  </Button>
                </div>
              ) : (
                <ul className="space-y-4">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.key}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30, height: 0 }}
                        className="flex gap-3"
                      >
                        <SmartImage src={item.image} alt={item.name} className="h-24 w-20 shrink-0 rounded-xl" />
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between gap-2">
                            <div>
                              <p className="line-clamp-1 text-sm font-medium">{item.name}</p>
                              <p className="mt-0.5 text-xs text-muted">
                                {item.size} · <span className="inline-block h-2.5 w-2.5 translate-y-0.5 rounded-full" style={{ background: item.color }} />
                              </p>
                            </div>
                            <button onClick={() => removeItem(item.key)} className="text-muted transition hover:text-rose-500">
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-1 rounded-full border border-app">
                              <button onClick={() => updateQty(item.key, item.qty - 1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-[var(--surface-2)]">
                                <FiMinus size={13} />
                              </button>
                              <span className="w-5 text-center text-sm font-medium">{item.qty}</span>
                              <button onClick={() => updateQty(item.key, item.qty + 1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-[var(--surface-2)]">
                                <FiPlus size={13} />
                              </button>
                            </div>
                            <span className="text-sm font-semibold">{formatPrice(item.price * item.qty)}</span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-app p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-soft">Subtotal</span>
                  <span className="text-xl font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" to="/cart" onClick={closeDrawer}>
                    View bag
                  </Button>
                  <Button to="/checkout" onClick={closeDrawer}>
                    Checkout
                  </Button>
                </div>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
