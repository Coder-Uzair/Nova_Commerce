import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import Toaster from "./components/ui/Toaster";
import { useThemeStore } from "./store/useThemeStore";

export default function App() {
  const theme = useThemeStore((s) => s.theme);
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster />
    </BrowserRouter>
  );
}
