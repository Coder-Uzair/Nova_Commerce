import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiLock, FiCreditCard, FiTruck, FiCheck, FiChevronRight } from "react-icons/fi";
import PageTransition from "../components/layout/PageTransition";
import Button from "../components/ui/Button";
import SmartImage from "../components/ui/SmartImage";
import Empty from "../components/ui/Empty";
import { FiShoppingBag } from "react-icons/fi";
import { useCartStore, selectSubtotal } from "../store/useCartStore";
import { formatPrice } from "../utils/format";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FLAT, TAX_RATE } from "../utils/constants";
import { toast } from "../store/useToastStore";

const steps = ["Shipping", "Payment", "Review"];

export default function Checkout() {
  const { items, clearCart } = useCartStore();
  const subtotal = useCartStore(selectSubtotal);
  const [step, setStep] = useState(0);
  const [placing, setPlacing] = useState(false);
  const navigate = useNavigate();

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  if (items.length === 0 && !placing) {
    return (
      <PageTransition>
        <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
          <Empty icon={<FiShoppingBag />} title="Nothing to check out" desc="Add some pieces to your bag first." action={{ to: "/shop", label: "Go shopping" }} />
        </div>
      </PageTransition>
    );
  }

  const placeOrder = () => {
    setPlacing(true);
    toast.info("Processing your order…");
    setTimeout(() => {
      clearCart();
      toast.success("Order placed successfully! ✦");
      navigate("/track");
    }, 1600);
  };

  return (
    <PageTransition>
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <h1 className="font-serif text-3xl font-semibold md:text-4xl">Checkout</h1>

        {/* Stepper */}
        <div className="mt-8 flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 items-center gap-2">
              <div className={`flex items-center gap-2 ${i <= step ? "text-brand-500" : "text-muted"}`}>
                <span className={`grid h-9 w-9 place-items-center rounded-full border-2 text-sm font-semibold transition ${
                  i < step ? "border-brand-500 bg-brand-500 text-white" : i === step ? "border-brand-500" : "border-app"
                }`}>
                  {i < step ? <FiCheck /> : i + 1}
                </span>
                <span className="hidden text-sm font-medium sm:block">{s}</span>
              </div>
              {i < steps.length - 1 && <div className={`h-0.5 flex-1 rounded ${i < step ? "bg-brand-500" : "bg-[var(--border)]"}`} />}
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="rounded-3xl border border-app surface p-6 md:p-8">
            {step === 0 && (
              <div>
                <h2 className="flex items-center gap-2 font-serif text-xl font-semibold"><FiTruck className="text-brand-500" /> Shipping details</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field label="First name" placeholder="Julian" />
                  <Field label="Last name" placeholder="Mercer" />
                  <Field label="Email" placeholder="you@email.com" full />
                  <Field label="Address" placeholder="123 Madison Ave" full />
                  <Field label="City" placeholder="New York" />
                  <Field label="Postal code" placeholder="10016" />
                  <Field label="Country" placeholder="United States" full />
                </div>
                <Button className="mt-8" onClick={() => setStep(1)}>Continue to payment <FiChevronRight /></Button>
              </div>
            )}
            {step === 1 && (
              <div>
                <h2 className="flex items-center gap-2 font-serif text-xl font-semibold"><FiCreditCard className="text-brand-500" /> Payment</h2>
                <div className="mt-6 grid gap-4">
                  <Field label="Cardholder name" placeholder="Julian Mercer" full />
                  <Field label="Card number" placeholder="4242 4242 4242 4242" full />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Expiry" placeholder="12 / 28" />
                    <Field label="CVC" placeholder="123" />
                  </div>
                </div>
                <p className="mt-4 flex items-center gap-2 text-xs text-muted"><FiLock /> Your payment information is encrypted & secure.</p>
                <div className="mt-8 flex gap-3">
                  <Button variant="outline" onClick={() => setStep(0)}>Back</Button>
                  <Button onClick={() => setStep(2)}>Review order <FiChevronRight /></Button>
                </div>
              </div>
            )}
            {step === 2 && (
              <div>
                <h2 className="font-serif text-xl font-semibold">Review your order</h2>
                <ul className="mt-6 space-y-4">
                  {items.map((item) => (
                    <li key={item.key} className="flex items-center gap-4">
                      <SmartImage src={item.image} alt={item.name} className="h-16 w-14 shrink-0 rounded-xl" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-muted">Qty {item.qty} · {item.size}</p>
                      </div>
                      <span className="text-sm font-semibold">{formatPrice(item.price * item.qty)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                  <Button onClick={placeOrder} disabled={placing}>
                    {placing ? <Spinner /> : <><FiLock /> Place order — {formatPrice(total)}</>}
                  </Button>
                </div>
              </div>
            )}
          </motion.div>

          {/* Summary */}
          <div>
            <div className="sticky top-28 rounded-3xl border border-app surface p-6">
              <h3 className="font-serif text-lg font-semibold">In your bag</h3>
              <ul className="mt-4 space-y-3 border-b border-app pb-4">
                {items.map((item) => (
                  <li key={item.key} className="flex items-center gap-3">
                    <div className="relative">
                      <SmartImage src={item.image} alt={item.name} className="h-14 w-12 rounded-lg" />
                      <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-brand-500 text-[10px] font-bold text-white">{item.qty}</span>
                    </div>
                    <p className="flex-1 line-clamp-1 text-sm">{item.name}</p>
                    <span className="text-sm font-medium">{formatPrice(item.price * item.qty)}</span>
                  </li>
                ))}
              </ul>
              <dl className="mt-4 space-y-2.5 text-sm">
                <div className="flex justify-between"><dt className="text-soft">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-soft">Shipping</dt><dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd></div>
                <div className="flex justify-between"><dt className="text-soft">Tax</dt><dd>{formatPrice(tax)}</dd></div>
                <div className="flex justify-between border-t border-app pt-3 text-base font-semibold"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

function Field({ label, placeholder, full }) {
  return (
    <label className={full ? "sm:col-span-2" : ""}>
      <span className="mb-1.5 block text-sm font-medium text-soft">{label}</span>
      <input placeholder={placeholder} className="h-12 w-full rounded-xl border border-app surface-2 px-4 text-sm outline-none focus:ring-2 focus:ring-brand-500/40" />
    </label>
  );
}

function Spinner() {
  return <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />;
}
