import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FiPlus, FiMinus, FiTrash2, FiShoppingBag, FiArrowRight, FiTag } from "react-icons/fi";
import { useState } from "react";
import PageHeader from "../components/ui/PageHeader";
import PageTransition from "../components/layout/PageTransition";
import SmartImage from "../components/ui/SmartImage";
import Button from "../components/ui/Button";
import Empty from "../components/ui/Empty";
import { useCartStore, selectSubtotal } from "../store/useCartStore";
import { formatPrice } from "../utils/format";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FLAT, TAX_RATE } from "../utils/constants";
import { toast } from "../store/useToastStore";

export default function Cart() {
  const { items, updateQty, removeItem } = useCartStore();
  const subtotal = useCartStore(selectSubtotal);
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FLAT;
  const tax = subtotal * TAX_RATE;
  const total = subtotal - discount + shipping + tax;

  const applyPromo = () => {
    if (promo.toUpperCase() === "NOVA10") {
      setDiscount(subtotal * 0.1);
      toast.success("Promo applied — 10% off!");
    } else {
      toast.error("Invalid promo code");
    }
  };

  return (
    <PageTransition>
      <PageHeader title="Shopping Bag" crumbs={[{ label: "Home", to: "/" }, { label: "Cart" }]} />
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        {items.length === 0 ? (
          <Empty
            icon={<FiShoppingBag />}
            title="Your bag is empty"
            desc="Looks like you haven't added anything yet. Let's fix that."
            action={{ to: "/shop", label: "Continue shopping" }}
          />
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1.7fr_1fr]">
            <div>
              <div className="overflow-hidden rounded-3xl border border-app surface">
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={item.key}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: 40 }}
                      className="flex gap-4 border-b border-app p-4 last:border-0 sm:p-6"
                    >
                      <Link to={`/product/${item.id}`}>
                        <SmartImage src={item.image} alt={item.name} className="h-28 w-24 shrink-0 rounded-2xl sm:h-32 sm:w-28" />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-3">
                          <div>
                            <p className="text-xs text-muted">{item.brand}</p>
                            <Link to={`/product/${item.id}`} className="font-medium hover:text-brand-500">{item.name}</Link>
                            <p className="mt-1 flex items-center gap-2 text-sm text-muted">
                              Size {item.size}
                              <span className="inline-block h-3 w-3 rounded-full border border-app" style={{ background: item.color }} />
                            </p>
                          </div>
                          <button onClick={() => removeItem(item.key)} className="h-fit text-muted transition hover:text-rose-500">
                            <FiTrash2 />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center gap-1 rounded-full border border-app p-1">
                            <button onClick={() => updateQty(item.key, item.qty - 1)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-[var(--surface-2)]"><FiMinus size={14} /></button>
                            <span className="w-7 text-center text-sm font-medium">{item.qty}</span>
                            <button onClick={() => updateQty(item.key, item.qty + 1)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-[var(--surface-2)]"><FiPlus size={14} /></button>
                          </div>
                          <span className="font-semibold">{formatPrice(item.price * item.qty)}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <Link to="/shop" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-500 transition-all hover:gap-3">
                ← Continue shopping
              </Link>
            </div>

            {/* Summary */}
            <div>
              <div className="sticky top-28 rounded-3xl border border-app surface p-6">
                <h3 className="font-serif text-xl font-semibold">Order summary</h3>
                <div className="mt-5 flex gap-2">
                  <div className="flex flex-1 items-center gap-2 rounded-full border border-app px-4">
                    <FiTag className="text-muted" />
                    <input
                      value={promo}
                      onChange={(e) => setPromo(e.target.value)}
                      placeholder="Promo code (try NOVA10)"
                      className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-muted"
                    />
                  </div>
                  <Button variant="outline" onClick={applyPromo}>Apply</Button>
                </div>
                <dl className="mt-6 space-y-3 text-sm">
                  <Row label="Subtotal" value={formatPrice(subtotal)} />
                  {discount > 0 && <Row label="Discount" value={`-${formatPrice(discount)}`} accent />}
                  <Row label="Shipping" value={shipping === 0 ? "Free" : formatPrice(shipping)} />
                  <Row label="Estimated tax" value={formatPrice(tax)} />
                  <div className="border-t border-app pt-3">
                    <Row label="Total" value={formatPrice(total)} large />
                  </div>
                </dl>
                <Button to="/checkout" size="lg" className="mt-6 w-full">
                  Proceed to checkout <FiArrowRight />
                </Button>
                <p className="mt-3 text-center text-xs text-muted">Secure checkout · Encrypted payments</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}

function Row({ label, value, large, accent }) {
  return (
    <div className="flex items-center justify-between">
      <dt className={large ? "font-semibold" : "text-soft"}>{label}</dt>
      <dd className={large ? "text-xl font-semibold" : accent ? "font-medium text-emerald-500" : "font-medium"}>{value}</dd>
    </div>
  );
}
