import { create } from "zustand";

// Lightweight UI store for transient global UI (quick view, search modal).
export const useUIStore = create((set) => ({
  quickViewProduct: null,
  openQuickView: (product) => set({ quickViewProduct: product }),
  closeQuickView: () => set({ quickViewProduct: null }),

  searchOpen: false,
  openSearch: () => set({ searchOpen: true }),
  closeSearch: () => set({ searchOpen: false }),
}));
