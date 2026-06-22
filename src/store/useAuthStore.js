import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      login: (email, name) =>
        set({ user: { email, name: name || email.split("@")[0], joined: "2024" } }),
      register: (name, email) => set({ user: { email, name, joined: "2026" } }),
      logout: () => set({ user: null }),
    }),
    { name: "nova-auth" }
  )
);
