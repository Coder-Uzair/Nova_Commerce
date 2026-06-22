import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: "dark",
      setTheme: (theme) => {
        applyTheme(theme);
        set({ theme });
      },
      toggle: () => {
        const next = get().theme === "dark" ? "light" : "dark";
        applyTheme(next);
        set({ theme: next });
      },
    }),
    {
      name: "nova-theme",
      onRehydrateStorage: () => (state) => {
        applyTheme(state?.theme || "dark");
      },
    }
  )
);

function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}
