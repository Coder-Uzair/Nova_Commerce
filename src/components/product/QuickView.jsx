import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag, FiHeart, FiArrowRight } from "react-icons/fi";
import Modal from "../ui/Modal";
import SmartImage from "../ui/SmartImage";
import Badge from "../ui/Badge";
import Rating from "../ui/Rating";
import Button from "../ui/Button";
import { formatPrice, pct, cn } from "../../utils/format";
import { useCartStore } from "../../store/useCartStore";
import { useWishlistStore } from "../../store/useWishlistStore";
import { toast } from "../../store/useToastStore";

export default function QuickView({ product, open, onClose }) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleWish = useWishlistStore((s) => s.toggle);
  const wished = useWishlistStore((s) => (product ? s.ids.includes(product.id) : false));
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);

  useEffect(() => {
    if (product) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSize(product.sizes?.[0]);
      setColor(product.colors?.[0]);
    }
  }, [product]);

  if (!product) return null;
  const discount = pct(product.price, product.compareAt);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="grid md:grid-cols-2">
        <div className="relative aspect-square md:aspect-auto">
          <SmartImage src={product.images[0]} alt={product.name} className="h-full w-full min-h-[320px]" />
          {product.badge && (
            <div className="absolute left-4 top-4">
              <Badge tone="accent">{product.badge}</Badge>
            </div>
          )}
        </div>
        <div className="flex flex-col p-6 md:p-8">
          <span className="text-xs font-medium uppercase tracking-wider text-muted">{product.brand}</span>
          <h3 className="mt-1 font-serif text-2xl font-semibold">{product.name}</h3>
          <div className="mt-2">
            <Rating value={product.rating} reviews={product.reviews} />
          </div>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl font-semibold">{formatPrice(product.price)}</span>
            {product.compareAt > 0 && (
              <>
                <span className="text-muted line-through">{formatPrice(product.compareAt)}</span>
                <Badge tone="brand">-{discount}%</Badge>
              </>
            )}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-soft line-clamp-3">{product.description}</p>

          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Colour</p>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={cn(
                    "h-8 w-8 rounded-full border-2 transition",
                    color === c ? "border-brand-500 scale-110" : "border-transparent"
                  )}
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={cn(
                    "min-w-10 rounded-xl border px-3 py-2 text-sm font-medium transition",
                    size === s ? "border-brand-500 bg-brand-500/10 text-brand-500" : "border-app hover:bg-[var(--surface-2)]"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button
              className="flex-1"
              onClick={() => {
                addItem(product, { size, color });
                toast.success(`${product.name} added to bag`);
                onClose();
              }}
            >
              <FiShoppingBag /> Add to bag
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                toggleWish(product.id);
                toast.info(wished ? "Removed from wishlist" : "Saved to wishlist");
              }}
            >
              <FiHeart className={cn(wished && "fill-current text-accent-500")} />
            </Button>
          </div>

          <Link
            to={`/product/${product.id}`}
            onClick={onClose}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-500 hover:gap-2.5 transition-all"
          >
            View full details <FiArrowRight />
          </Link>
        </div>
      </div>
    </Modal>
  );
}
