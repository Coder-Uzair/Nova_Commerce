import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import Section, { SectionHeading } from "../ui/Section";
import ProductGrid from "../product/ProductGrid";
import { byTag } from "../../data/products";

export default function FeaturedProducts() {
  const featured = byTag("featured").slice(0, 8);
  return (
    <Section className="surface-2">
      <div className="flex flex-col items-center gap-4">
        <SectionHeading
          overline="Handpicked"
          title="Featured pieces"
          subtitle="The icons of the season, chosen by our design team."
        />
      </div>
      <div className="mt-12">
        <ProductGrid products={featured} />
      </div>
      <div className="mt-12 text-center">
        <Link to="/shop" className="inline-flex items-center gap-2 font-medium text-brand-500 transition-all hover:gap-3">
          View all products <FiArrowRight />
        </Link>
      </div>
    </Section>
  );
}
