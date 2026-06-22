import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHeart, FiShoppingBag, FiEye } from "react-icons/fi";
import SmartImage from "../ui/SmartImage";
import Badge from "../ui/Badge";
import Rating from "../ui/Rating";
import { formatPrice, pct, cn } from "../../utils/format";
import { useCartStore } from "../../store/useCartStore";
import { useWishlistStore } from "../../store/useWishlistStore";
import { toast } from "../../store/useToastStore";
import { fadeUp } from "../../hooks/useScrollReveal";

export default function ProductCard({ product, index = 0, onQuickView }) {
  const addItem = useCartStore((s) => s.addItem);
  const wishIds = useWishlistStore((s) => s.ids);
  const toggleWish = useWishlistStore((s) => s.toggle);
  const wished = wishIds.includes(product.id);
  const [hover, setHover] = useState(false);
  const discount = pct(product.price, product.compareAt);

  const handleAdd = (e) => {
    e.preventDefault();
    addItem(product);
    toast.success(`${product.name} added to bag`);
  };
  const handleWish = (e) => {
    e.preventDefault();
    toggleWish(product.id);
    toast.info(wished ? "Removed from wishlist" : "Saved to wishlist");
  };

  return (
    <motion.div variants={fadeUp} className="group h-full">
      <Link
        to={`/product/${product.id}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="flex h-full flex-col overflow-hidden rounded-3xl border border-app surface transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glow"
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <SmartImage
            src={product.images[hover && product.images[1] ? 1 : 0]}
            alt={product.name}
            seed={index}
            className="h-full w-full transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {product.badge && <Badge tone={product.badge === "Bestseller" ? "accent" : "brand"}>{product.badge}</Badge>}
            {discount > 0 && <Badge tone="dark">-{discount}%</Badge>}
          </div>

          <button
            onClick={handleWish}
            aria-label="Toggle wishlist"
            className={cn(
              "absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full glass transition hover:scale-110",
              wished ? "text-accent-500" : "text-[var(--text)]"
            )}
          >
            <FiHeart className={cn(wished && "fill-current")} />
          </button>

          {/* Hover action bar */}
          <div className="pointer-events-none absolute inset-x-3 bottom-3 flex translate-y-3 gap-2 opacity-0 transition-all duration-400 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
            <button
              onClick={handleAdd}
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-accent-500 text-sm font-medium text-white shadow-lg transition hover:opacity-95"
            >
              <FiShoppingBag /> Add
            </button>
            {onQuickView && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onQuickView(product);
                }}
                aria-label="Quick view"
                className="grid h-11 w-11 place-items-center rounded-full glass text-[var(--text)] transition hover:scale-105"
              >
                <FiEye />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted">{product.brand}</span>
          <h3 className="mt-1 line-clamp-1 font-medium leading-snug">{product.name}</h3>
          <div className="mt-1.5">
            <Rating value={product.rating} reviews={product.reviews} />
          </div>
          <div className="mt-auto flex items-center gap-2 pt-3">
            <span className="text-lg font-semibold">{formatPrice(product.price)}</span>
            {product.compareAt > 0 && (
              <span className="text-sm text-muted line-through">{formatPrice(product.compareAt)}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
