# NOVA — Premium Fashion House (2026)

A highly modern, premium, fully responsive **e-commerce frontend** built to feel
like a multi-million-dollar international brand. Inspired by Apple, Stripe,
Shopify and Tesla — quiet luxury, glassmorphism, smooth Framer Motion
animations, dark/light mode and a scalable, production-grade architecture.

> Brand: **NOVA** · Niche: **Luxury fashion & accessories**

---

## ✨ Tech stack

| Area        | Library |
|-------------|---------|
| Framework   | React 19 + Vite |
| Styling     | Tailwind CSS v4 (`@tailwindcss/vite`) + design tokens |
| Animation   | Framer Motion |
| Routing     | React Router DOM (lazy routes + page transitions) |
| State       | Zustand (cart, wishlist, theme, auth, UI, toasts) — persisted to localStorage |
| Data        | Axios-ready service layer with a mocked catalogue |
| Sliders     | Swiper.js (trending + testimonials) |
| Icons       | React Icons |

---

## 🗂 Folder structure

```
src/
├── components/
│   ├── ui/         # Button, Badge, Modal, Accordion, Toaster, Skeleton, SmartImage, …
│   ├── layout/     # Navbar, Footer, MobileMenu, CartDrawer, SearchModal, transitions
│   ├── product/    # ProductCard, ProductGrid, QuickView
│   └── sections/   # Hero, Categories, Featured, Trending, BestSellers, Testimonials, …
├── pages/          # Home, Shop, ProductDetails, Cart, Wishlist, Checkout, Auth,
│                   # Dashboard, OrderTracking, Contact, About, FAQ, NotFound
├── layouts/        # RootLayout (shell with navbar/footer/drawers)
├── routes/         # AppRoutes (lazy loading + AnimatePresence transitions)
├── hooks/          # useScrollReveal (motion variants), useLockBody
├── store/          # Zustand stores
├── services/       # api.js (axios instance + mock product service)
├── utils/          # format helpers + constants
├── data/           # realistic dummy product catalogue
└── assets/
```

---

## 🚀 Getting started

```bash
cd nova
npm install        # already installed in this workspace
npm run dev        # start dev server → http://localhost:5173
npm run build      # production build
npm run preview    # preview the build
npm run lint       # eslint (passes clean)
```

---

## 🧭 Pages (13)

Home · Shop · Product Details · Cart · Wishlist · Checkout · Login/Register ·
Dashboard · Order Tracking · Contact · About · FAQ · 404.

## 🧩 Key features

- Sticky **glass navbar** that morphs into a floating pill on scroll, animated
  active-link indicator, live cart/wishlist badges.
- **Mobile menu**, **search modal** (live results), **cart drawer** with
  free-shipping progress bar and quantity controls.
- **Product cards** with hover image swap, quick-add, wishlist toggle and a
  **quick-view modal**; **product filtering** (categories + price + sort).
- **Dark / light mode** with a token-driven theme, persisted.
- **Toast notifications**, **loading skeletons**, **scroll progress bar**,
  **page transitions**, and scroll-reveal animations everywhere.
- Full **cart → checkout** flow (multi-step stepper) and a polished
  **dashboard** + **order tracking** timeline.
- Persistent **cart / wishlist / auth / theme** via Zustand `persist`.

## 🎨 Design system

Design tokens live in `src/index.css` (`@theme` + CSS variables for light/dark).
Reusable primitives (`Button`, `Badge`, `Section`, etc.) keep everything
consistent. Glassmorphism, mesh gradients, soft shadows, Inter + Playfair
Display typography.

## 🖼 A note on images

Product imagery uses live Unsplash URLs that load in a real browser.
`SmartImage` gracefully falls back to a branded gradient + monogram if an image
can't load (e.g. inside an offline preview iframe), so the layout always looks
intentional. Promo codes: try **`NOVA10`** in the cart for 10% off.
