import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import MobileMenu from "../components/layout/MobileMenu";
import CartDrawer from "../components/layout/CartDrawer";
import SearchModal from "../components/layout/SearchModal";
import ScrollProgress from "../components/layout/ScrollProgress";
import QuickView from "../components/product/QuickView";
import { useUIStore } from "../store/useUIStore";

export default function RootLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { quickViewProduct, closeQuickView } = useUIStore();

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <Navbar onOpenMenu={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <CartDrawer />
      <SearchModal />
      <QuickView product={quickViewProduct} open={!!quickViewProduct} onClose={closeQuickView} />
    </div>
  );
}
