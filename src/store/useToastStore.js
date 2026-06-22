import { create } from "zustand";

let id = 0;
export const useToastStore = create((set, get) => ({
  toasts: [],
  push: (message, type = "success") => {
    const tid = ++id;
    set((s) => ({ toasts: [...s.toasts, { id: tid, message, type }] }));
    setTimeout(() => get().dismiss(tid), 3200);
    return tid;
  },
  dismiss: (tid) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== tid) })),
}));

export const toast = {
  success: (m) => useToastStore.getState().push(m, "success"),
  error: (m) => useToastStore.getState().push(m, "error"),
  info: (m) => useToastStore.getState().push(m, "info"),
};
