import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { FiStar } from "react-icons/fi";
import Section, { SectionHeading } from "../ui/Section";
import SmartImage from "../ui/SmartImage";
import { testimonials } from "../../data/products";
import "swiper/css";
import "swiper/css/pagination";

export default function Testimonials() {
  return (
    <Section>
      <SectionHeading overline="Loved by many" title="Words from our members" />
      <div className="mt-12">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4500 }}
          breakpoints={{ 768: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } }}
          className="!pb-14"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i} className="h-auto">
              <figure className="flex h-full flex-col rounded-3xl border border-app surface p-7 shadow-soft">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <FiStar key={j} className="text-amber-400" style={{ fill: "#fbbf24" }} />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 font-serif text-lg italic leading-relaxed">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <SmartImage src={t.avatar} alt={t.name} seed={i} className="h-12 w-12 rounded-full" />
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-muted">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Section>
  );
}
