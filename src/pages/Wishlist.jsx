import PageHeader from "../components/ui/PageHeader";
import PageTransition from "../components/layout/PageTransition";
import ProductGrid from "../components/product/ProductGrid";
import Empty from "../components/ui/Empty";
import Button from "../components/ui/Button";
import { FiHeart } from "react-icons/fi";
import { useWishlistStore } from "../store/useWishlistStore";
import { useCartStore } from "../store/useCartStore";
import { toast } from "../store/useToastStore";
import { products } from "../data/products";

export default function Wishlist() {
  const ids = useWishlistStore((s) => s.ids);
  const clear = useWishlistStore((s) => s.clear);
  const addItem = useCartStore((s) => s.addItem);
  const items = products.filter((p) => ids.includes(p.id));

  const addAll = () => {
    items.forEach((p) => addItem(p));
    toast.success("All wishlist items added to bag");
  };

  return (
    <PageTransition>
      <PageHeader
        title="Wishlist"
        subtitle="Your saved pieces, ready when you are."
        crumbs={[{ label: "Home", to: "/" }, { label: "Wishlist" }]}
      />
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        {items.length === 0 ? (
          <Empty
            icon={<FiHeart />}
            title="No saved pieces yet"
            desc="Tap the heart on any product to save it here for later."
            action={{ to: "/shop", label: "Browse the collection" }}
          />
        ) : (
          <>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-soft"><span className="font-semibold text-[var(--text)]">{items.length}</span> saved {items.length === 1 ? "piece" : "pieces"}</p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={clear}>Clear all</Button>
                <Button onClick={addAll}>Add all to bag</Button>
              </div>
            </div>
            <ProductGrid products={items} />
          </>
        )}
      </div>
    </PageTransition>
  );
}
