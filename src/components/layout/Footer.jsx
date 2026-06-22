import { Link } from "react-router-dom";
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube, FiArrowRight } from "react-icons/fi";
import { useState } from "react";
import { toast } from "../../store/useToastStore";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", to: "/shop" },
      { label: "Outerwear", to: "/shop" },
      { label: "Tailoring", to: "/shop" },
      { label: "Footwear", to: "/shop" },
      { label: "Accessories", to: "/shop" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Careers", to: "/about" },
      { label: "Sustainability", to: "/about" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", to: "/faq" },
      { label: "Track Order", to: "/track" },
      { label: "Shipping & Returns", to: "/faq" },
      { label: "Size Guide", to: "/faq" },
    ],
  },
];

const socials = [FiInstagram, FiTwitter, FiFacebook, FiYoutube];

export default function Footer() {
  const [email, setEmail] = useState("");
  return (
    <footer className="relative mt-10 overflow-hidden border-t border-app">
      <div className="bg-mesh absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 font-serif text-lg font-bold text-white">
                N
              </span>
              <span className="font-serif text-2xl font-bold">NOVA</span>
            </Link>
            <p className="mt-4 max-w-sm text-soft">
              An elevated wardrobe. Modern essentials, crafted in limited runs for those who notice the details.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!email) return;
                toast.success("Welcome to the inner circle ✦");
                setEmail("");
              }}
              className="mt-6 flex max-w-sm items-center gap-2 rounded-full border border-app surface p-1.5"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-muted"
              />
              <button
                type="submit"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-r from-brand-600 to-accent-500 text-white transition hover:scale-105"
              >
                <FiArrowRight />
              </button>
            </form>
            <div className="mt-6 flex gap-3">
              {socials.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full border border-app transition hover:bg-[var(--surface-2)] hover:text-brand-500"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold uppercase tracking-wider">{col.title}</h4>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.to} className="text-sm text-soft transition hover:text-[var(--text)]">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-app pt-8 text-sm text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} NOVA Atelier. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition hover:text-[var(--text)]">Privacy</a>
            <a href="#" className="transition hover:text-[var(--text)]">Terms</a>
            <a href="#" className="transition hover:text-[var(--text)]">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
