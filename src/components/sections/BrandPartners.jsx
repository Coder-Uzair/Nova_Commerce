import { brandPartners } from "../../data/products";

export default function BrandPartners() {
  const list = [...brandPartners, ...brandPartners];
  return (
    <section className="border-y border-app py-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted">
          As featured in
        </p>
        <div className="relative mt-6 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[var(--bg)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[var(--bg)] to-transparent" />
          <div className="flex w-max animate-marquee items-center gap-16">
            {list.map((b, i) => (
              <span key={i} className="font-serif text-2xl font-semibold tracking-wide text-muted transition hover:text-[var(--text)] md:text-3xl">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
