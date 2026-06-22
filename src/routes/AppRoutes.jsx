import { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import RootLayout from "../layouts/RootLayout";
import ScrollToTop from "../components/layout/ScrollToTop";
import PageLoader from "../components/ui/PageLoader";

const Home = lazy(() => import("../pages/Home"));
const Shop = lazy(() => import("../pages/Shop"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const Cart = lazy(() => import("../pages/Cart"));
const Wishlist = lazy(() => import("../pages/Wishlist"));
const Checkout = lazy(() => import("../pages/Checkout"));
const Auth = lazy(() => import("../pages/Auth"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const OrderTracking = lazy(() => import("../pages/OrderTracking"));
const Contact = lazy(() => import("../pages/Contact"));
const About = lazy(() => import("../pages/About"));
const FAQ = lazy(() => import("../pages/FAQ"));
const NotFound = lazy(() => import("../pages/NotFound"));

export default function AppRoutes() {
  const location = useLocation();
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route element={<RootLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Auth mode="login" />} />
              <Route path="/register" element={<Auth mode="register" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/track" element={<OrderTracking />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </Suspense>
    </>
  );
}
