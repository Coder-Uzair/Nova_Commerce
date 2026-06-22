import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiShoppingBag, FiHeart, FiTruck, FiRefreshCw, FiShield, FiMinus, FiPlus, FiCheck } from "react-icons/fi";
import PageTransition from "../components/layout/PageTransition";
import SmartImage from "../components/ui/SmartImage";
import Badge from "../components/ui/Badge";
import Rating from "../components/ui/Rating";
import Button from "../components/ui/Button";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import Skeleton from "../components/ui/Skeleton";
import ProductCard from "../components/product/ProductCard";
import { productService } from "../services/api";
import { useCartStore } from "../store/useCartStore";
import { useWishlistStore } from "../store/useWishlistStore";
import { useUIStore } from "../store/useUIStore";
import { toast } from "../store/useToastStore";
import { formatPrice, pct, cn } from "../utils/format";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("details");

  const addItem = useCartStore((s) => s.addItem);
  const toggleWish = useWishlistStore((s) => s.toggle);
  const wished = useWishlistStore((s) => (product ? s.ids.includes(product.id) : false));
  const openQuickView = useUIStore((s) => s.openQuickView);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    window.scrollTo(0, 0);
    productService.get(id).then((p) => {
      setProduct(p);
      setSize(p.sizes[0]);
      setColor(p.colors[0]);
      setActiveImg(0);
      setQty(1);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <Skeleton className="aspect-square rounded-3xl" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="grid min-h-[50vh] place-items-center text-center">
        <div>
          <h1 className="font-serif text-3xl">Product not found</h1>
          <Button to="/shop" className="mt-4">Back to shop</Button>
        </div>
      </div>
    );
  }

  const discount = pct(product.price, product.compareAt);

  const handleAdd = () => {
    addItem(product, { size, color, qty });
    toast.success(`${product.name} added to bag`);
  };

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 md:py-12">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Shop", to: "/shop" },
            { label: product.name },
          ]}
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <div className="flex flex-col-reverse gap-4 sm:flex-row">
            <div className="flex gap-3 sm:flex-col">
              {product.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={cn(
                    "h-20 w-20 overflow-hidden rounded-2xl border-2 transition",
                    activeImg === i ? "border-brand-500" : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <SmartImage src={src} alt="" seed={i} className="h-full w-full" />
                </button>
              ))}
            </div>
            <motion.div
              key={activeImg}
              initial={{ opacity: 0.4, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative flex-1"
            >
              <SmartImage src={product.images[activeImg]} alt={product.name} className="aspect-[4/5] w-full rounded-3xl shadow-soft" />
              {product.badge && (
                <div className="absolute left-4 top-4"><Badge tone="accent">{product.badge}</Badge></div>
              )}
            </motion.div>
          </div>

          {/* Info */}
          <div>
            <span className="text-sm font-medium uppercase tracking-wider text-muted">{product.brand}</span>
            <h1 className="mt-2 font-serif text-3xl font-semibold leading-tight md:text-4xl">{product.name}</h1>
            <div className="mt-3"><Rating value={product.rating} reviews={product.reviews} size={16} /></div>

            <div className="mt-5 flex items-center gap-3">
              <span className="text-3xl font-semibold">{formatPrice(product.price)}</span>
              {product.compareAt > 0 && (
                <>
                  <span className="text-lg text-muted line-through">{formatPrice(product.compareAt)}</span>
                  <Badge tone="brand">Save {discount}%</Badge>
                </>
              )}
            </div>

            <p className="mt-5 leading-relaxed text-soft">{product.description}</p>

            {/* Colors */}
            <div className="mt-7">
              <div className="mb-2.5 flex items-center justify-between">
                <p className="text-sm font-semibold">Colour</p>
              </div>
              <div className="flex gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={cn(
                      "grid h-10 w-10 place-items-center rounded-full border-2 transition",
                      color === c ? "border-brand-500 scale-110" : "border-app"
                    )}
                    style={{ background: c }}
                  >
                    {color === c && <FiCheck className="text-white mix-blend-difference" size={16} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mt-6">
              <div className="mb-2.5 flex items-center justify-between">
                <p className="text-sm font-semibold">Size</p>
                <Link to="/faq" className="text-xs text-brand-500">Size guide</Link>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={cn(
                      "min-w-12 rounded-xl border px-4 py-2.5 text-sm font-medium transition",
                      size === s ? "border-brand-500 bg-brand-500/10 text-brand-500" : "border-app hover:bg-[var(--surface-2)]"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty + actions */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 rounded-full border border-app p-1">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-10 w-10 place-items-center rounded-full hover:bg-[var(--surface-2)]"><FiMinus /></button>
                <span className="w-8 text-center font-medium">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="grid h-10 w-10 place-items-center rounded-full hover:bg-[var(--surface-2)]"><FiPlus /></button>
              </div>
              <Button size="lg" className="flex-1 min-w-[180px]" onClick={handleAdd}>
                <FiShoppingBag /> Add to bag — {formatPrice(product.price * qty)}
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="h-14 w-14"
                onClick={() => {
                  toggleWish(product.id);
                  toast.info(wished ? "Removed from wishlist" : "Saved to wishlist");
                }}
              >
                <FiHeart className={cn(wished && "fill-current text-accent-500")} size={20} />
              </Button>
            </div>

            <p className="mt-4 flex items-center gap-2 text-sm text-emerald-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              In stock — only {product.stock} left
            </p>

            {/* Perks */}
            <div className="mt-7 grid grid-cols-3 gap-3 border-t border-app pt-7">
              {[
                [<FiTruck key="t" />, "Free shipping"],
                [<FiRefreshCw key="r" />, "30-day returns"],
                [<FiShield key="s" />, "2-yr warranty"],
              ].map(([icon, label]) => (
                <div key={label} className="flex flex-col items-center gap-2 text-center">
                  <span className="text-xl text-brand-500">{icon}</span>
                  <span className="text-xs text-soft">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <div className="flex gap-1 border-b border-app">
            {[["details", "Details"], ["care", "Care & materials"], ["shipping", "Shipping"]].map(([k, l]) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={cn(
                  "relative px-5 py-3 text-sm font-medium transition",
                  tab === k ? "text-[var(--text)]" : "text-muted hover:text-[var(--text)]"
                )}
              >
                {l}
                {tab === k && <motion.span layoutId="tab-underline" className="absolute inset-x-0 -bottom-px h-0.5 bg-gradient-to-r from-brand-600 to-accent-500" />}
              </button>
            ))}
          </div>
          <div className="py-7 text-soft">
            {tab === "details" && (
              <ul className="grid gap-3 sm:grid-cols-2">
                {product.details.map((d) => (
                  <li key={d} className="flex items-start gap-2.5">
                    <FiCheck className="mt-0.5 shrink-0 text-brand-500" /> {d}
                  </li>
                ))}
              </ul>
            )}
            {tab === "care" && (
              <p className="max-w-2xl leading-relaxed">
                Each NOVA piece is crafted from responsibly sourced, premium materials. To preserve its quality, follow the care instructions on the garment label. Store knitwear folded, hang tailoring on shaped hangers, and treat leather with a neutral conditioner twice a year.
              </p>
            )}
            {tab === "shipping" && (
              <p className="max-w-2xl leading-relaxed">
                Complimentary carbon-neutral shipping on orders over $250. Standard delivery in 2–4 business days, with express options at checkout. Enjoy 30 days of free returns — simply initiate from your dashboard for a prepaid label.
              </p>
            )}
          </div>
        </div>

        {/* Related */}
        {product.related?.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-2xl font-semibold md:text-3xl">You may also like</h2>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {product.related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} onQuickView={openQuickView} />
              ))}
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
