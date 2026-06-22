import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

export default function Breadcrumbs({ items }) {
  return (
    <nav className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {it.to ? (
            <Link to={it.to} className="transition hover:text-[var(--text)]">{it.label}</Link>
          ) : (
            <span className="text-[var(--text)]">{it.label}</span>
          )}
          {i < items.length - 1 && <FiChevronRight size={14} />}
        </span>
      ))}
    </nav>
  );
}
