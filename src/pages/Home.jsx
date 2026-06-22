import Hero from "../components/sections/Hero";
import Promo, { EditorialBanner } from "../components/sections/Promo";
import Categories from "../components/sections/Categories";
import FeaturedProducts from "../components/sections/FeaturedProducts";
import TrendingSlider from "../components/sections/TrendingSlider";
import BestSellers from "../components/sections/BestSellers";
import Testimonials from "../components/sections/Testimonials";
import BrandPartners from "../components/sections/BrandPartners";
import Newsletter from "../components/sections/Newsletter";
import PageTransition from "../components/layout/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <div className="py-6">
        <Promo />
      </div>
      <Categories />
      <FeaturedProducts />
      <TrendingSlider />
      <EditorialBanner />
      <BestSellers />
      <BrandPartners />
      <Testimonials />
      <Newsletter />
    </PageTransition>
  );
}
