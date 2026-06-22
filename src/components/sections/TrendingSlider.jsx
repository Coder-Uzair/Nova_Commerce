import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Section, { SectionHeading } from "../ui/Section";
import ProductCard from "../product/ProductCard";
import { useUIStore } from "../../store/useUIStore";
import { byTag } from "../../data/products";
import "swiper/css";

export default function TrendingSlider() {
  const trending = byTag("trending");
  const openQuickView = useUIStore((s) => s.openQuickView);
  const [swiper, setSwiper] = useState(null);
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

  useEffect(() => {
    if (swiper && swiper.params && prevEl && nextEl) {
      // eslint-disable-next-line react-hooks/immutability
      swiper.params.navigation.prevEl = prevEl;
      swiper.params.navigation.nextEl = nextEl;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiper, prevEl, nextEl]);

  return (
    <Section>
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          align="left"
          overline="Hot right now"
          title="Trending this week"
          subtitle="What everyone's adding to their bag."
          className="!mx-0"
        />
        <div className="flex gap-2">
          <button
            ref={setPrevEl}
            aria-label="Previous"
            className="grid h-11 w-11 place-items-center rounded-full border border-app surface transition hover:bg-[var(--surface-2)]"
          >
            <FiChevronLeft />
          </button>
          <button
            ref={setNextEl}
            aria-label="Next"
            className="grid h-11 w-11 place-items-center rounded-full border border-app surface transition hover:bg-[var(--surface-2)]"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>

      <div className="mt-12">
        <Swiper
          onSwiper={setSwiper}
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={1.2}
          autoplay={{ delay: 3500, disableOnInteraction: true }}
          navigation={{ prevEl, nextEl }}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.2 },
            1280: { slidesPerView: 4 },
          }}
        >
          {trending.map((p, i) => (
            <SwiperSlide key={p.id} className="h-auto pb-2">
              <ProductCard product={p} index={i} onQuickView={openQuickView} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Section>
  );
}
