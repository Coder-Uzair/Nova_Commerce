import { create } from "zustand";
import { persist } from "zustand/middleware";

const lineId = (id, size, color) => `${id}__${size || "os"}__${color || "def"}`;

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      drawerOpen: false,

      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),
      toggleDrawer: () => set((s) => ({ drawerOpen: !s.drawerOpen })),

      addItem: (product, { size, color, qty = 1 } = {}) => {
        const key = lineId(product.id, size, color);
        const items = [...get().items];
        const existing = items.find((i) => i.key === key);
        if (existing) {
          existing.qty += qty;
        } else {
          items.push({
            key,
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images?.[0],
            brand: product.brand,
            size: size || product.sizes?.[0] || "One Size",
            color: color || product.colors?.[0] || "#1c1c2b",
            qty,
          });
        }
        set({ items, drawerOpen: true });
      },

      removeItem: (key) => set((s) => ({ items: s.items.filter((i) => i.key !== key) })),
      updateQty: (key, qty) =>
        set((s) => ({
          items: s.items.map((i) => (i.key === key ? { ...i, qty: Math.max(1, qty) } : i)),
        })),
      clearCart: () => set({ items: [] }),

      get count() {
        return get().items.reduce((n, i) => n + i.qty, 0);
      },
    }),
    { name: "nova-cart" }
  )
);

export const selectCartCount = (s) => s.items.reduce((n, i) => n + i.qty, 0);
export const selectSubtotal = (s) => s.items.reduce((n, i) => n + i.price * i.qty, 0);
