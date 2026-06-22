import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiPackage, FiHeart, FiMapPin, FiCreditCard, FiSettings, FiLogOut, FiTrendingUp } from "react-icons/fi";
import PageHeader from "../components/ui/PageHeader";
import PageTransition from "../components/layout/PageTransition";
import Button from "../components/ui/Button";
import SmartImage from "../components/ui/SmartImage";
import Badge from "../components/ui/Badge";
import { useAuthStore } from "../store/useAuthStore";
import { useWishlistStore } from "../store/useWishlistStore";
import { products } from "../data/products";
import { formatPrice, cn } from "../utils/format";
import { toast } from "../store/useToastStore";

const orders = [
  { id: "NV-83920", date: "Jun 14, 2026", status: "Delivered", total: 737, items: 2, statusTone: "neutral" },
  { id: "NV-83104", date: "May 28, 2026", status: "In transit", total: 295, items: 1, statusTone: "brand" },
  { id: "NV-82551", date: "May 02, 2026", status: "Delivered", total: 525, items: 1, statusTone: "neutral" },
];

const tabs = [
  { id: "overview", label: "Overview", icon: <FiTrendingUp /> },
  { id: "orders", label: "Orders", icon: <FiPackage /> },
  { id: "wishlist", label: "Wishlist", icon: <FiHeart /> },
  { id: "addresses", label: "Addresses", icon: <FiMapPin /> },
  { id: "payment", label: "Payment", icon: <FiCreditCard /> },
  { id: "settings", label: "Settings", icon: <FiSettings /> },
];

export default function Dashboard() {
  const { user, logout } = useAuthStore();
  const wishIds = useWishlistStore((s) => s.ids);
  const [tab, setTab] = useState("overview");
  const navigate = useNavigate();

  const name = user?.name || "Guest Member";
  const email = user?.email || "guest@nova.com";
  const wishItems = products.filter((p) => wishIds.includes(p.id));

  const handleLogout = () => { logout(); toast.info("Signed out"); navigate("/login"); };

  return (
    <PageTransition>
      <PageHeader title={`Hello, ${name.split(" ")[0]}`} subtitle="Manage your orders, wishlist and account." crumbs={[{ label: "Home", to: "/" }, { label: "Dashboard" }]} />
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside>
            <div className="rounded-3xl border border-app surface p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-accent-500 text-lg font-semibold text-white">
                  {name[0]}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-medium">{name}</p>
                  <p className="truncate text-xs text-muted">{email}</p>
                </div>
              </div>
              <nav className="mt-5 space-y-1">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                      tab === t.id ? "bg-brand-500/10 font-medium text-brand-500" : "text-soft hover:bg-[var(--surface-2)]"
                    )}
                  >
                    {t.icon} {t.label}
                  </button>
                ))}
                <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-rose-500 transition hover:bg-rose-500/10">
                  <FiLogOut /> Sign out
                </button>
              </nav>
            </div>
          </aside>

          {/* Content */}
          <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            {tab === "overview" && (
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    ["Total orders", "12", <FiPackage key="1" />],
                    ["Wishlist", String(wishItems.length), <FiHeart key="2" />],
                    ["Reward points", "2,480", <FiTrendingUp key="3" />],
                  ].map(([label, val, icon]) => (
                    <div key={label} className="rounded-3xl border border-app surface p-6">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500/15 text-brand-500">{icon}</span>
                      <p className="mt-4 font-serif text-3xl font-semibold">{val}</p>
                      <p className="text-sm text-muted">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-3xl border border-app surface p-6">
                  <h3 className="font-serif text-lg font-semibold">Recent orders</h3>
                  <OrdersTable rows={orders.slice(0, 2)} />
                </div>
              </div>
            )}

            {tab === "orders" && (
              <div className="rounded-3xl border border-app surface p-6">
                <h3 className="font-serif text-lg font-semibold">Order history</h3>
                <OrdersTable rows={orders} />
              </div>
            )}

            {tab === "wishlist" && (
              <div className="rounded-3xl border border-app surface p-6">
                <h3 className="mb-4 font-serif text-lg font-semibold">Your wishlist</h3>
                {wishItems.length === 0 ? (
                  <p className="py-8 text-center text-soft">No saved items yet. <Button to="/shop" variant="ghost" size="sm">Browse</Button></p>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {wishItems.map((p) => (
                      <div key={p.id} className="flex items-center gap-3 rounded-2xl border border-app p-3">
                        <SmartImage src={p.images[0]} alt={p.name} className="h-16 w-14 rounded-xl" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{p.name}</p>
                          <p className="text-sm text-muted">{formatPrice(p.price)}</p>
                        </div>
                        <Button size="sm" to={`/product/${p.id}`}>View</Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === "addresses" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-app surface p-6">
                  <Badge tone="brand">Default</Badge>
                  <p className="mt-3 font-medium">{name}</p>
                  <p className="mt-1 text-sm text-soft">123 Madison Avenue<br />New York, NY 10016<br />United States</p>
                  <Button variant="outline" size="sm" className="mt-4">Edit</Button>
                </div>
                <button className="grid place-items-center rounded-3xl border border-dashed border-app p-6 text-soft transition hover:bg-[var(--surface-2)]">
                  <FiMapPin size={24} /><span className="mt-2 text-sm">Add new address</span>
                </button>
              </div>
            )}

            {tab === "payment" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-accent-500 p-6 text-white">
                  <div className="bg-mesh absolute inset-0 opacity-30" />
                  <div className="relative">
                    <FiCreditCard size={28} />
                    <p className="mt-8 font-mono text-lg tracking-widest">•••• •••• •••• 4242</p>
                    <div className="mt-4 flex justify-between text-sm"><span>{name}</span><span>12/28</span></div>
                  </div>
                </div>
                <button className="grid place-items-center rounded-3xl border border-dashed border-app p-6 text-soft transition hover:bg-[var(--surface-2)]">
                  <FiCreditCard size={24} /><span className="mt-2 text-sm">Add payment method</span>
                </button>
              </div>
            )}

            {tab === "settings" && (
              <div className="rounded-3xl border border-app surface p-6">
                <h3 className="font-serif text-lg font-semibold">Account settings</h3>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Setting label="Full name" value={name} />
                  <Setting label="Email" value={email} />
                  <Setting label="Phone" value="+1 (555) 012-3456" />
                  <Setting label="Member since" value={user?.joined || "2026"} />
                </div>
                <Button className="mt-6">Save changes</Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}

function OrdersTable({ rows }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="text-xs uppercase tracking-wider text-muted">
          <tr className="border-b border-app">
            <th className="py-3">Order</th><th className="py-3">Date</th><th className="py-3">Status</th><th className="py-3">Total</th><th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((o) => (
            <tr key={o.id} className="border-b border-app last:border-0">
              <td className="py-4 font-medium">{o.id}</td>
              <td className="py-4 text-soft">{o.date}</td>
              <td className="py-4"><Badge tone={o.statusTone}>{o.status}</Badge></td>
              <td className="py-4 font-medium">{formatPrice(o.total)}</td>
              <td className="py-4 text-right"><Button to="/track" variant="ghost" size="sm">Track</Button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Setting({ label, value }) {
  return (
    <label>
      <span className="mb-1.5 block text-sm text-soft">{label}</span>
      <input defaultValue={value} className="h-11 w-full rounded-xl border border-app surface-2 px-4 text-sm outline-none focus:ring-2 focus:ring-brand-500/40" />
    </label>
  );
}
