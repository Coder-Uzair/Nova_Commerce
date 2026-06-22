export const formatPrice = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export const cn = (...args) => args.filter(Boolean).join(" ");

export const pct = (price, compareAt) =>
  compareAt > price ? Math.round(((compareAt - price) / compareAt) * 100) : 0;
