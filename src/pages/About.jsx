import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import PageHeader from "../components/ui/PageHeader";
import PageTransition from "../components/layout/PageTransition";
import SmartImage from "../components/ui/SmartImage";
import Button from "../components/ui/Button";
import { SectionHeading } from "../components/ui/Section";
import { fadeUp, stagger, viewportOnce } from "../hooks/useScrollReveal";

const stats = [
  ["2018", "Founded in London"],
  ["180k+", "Members worldwide"],
  ["90+", "Countries served"],
  ["100%", "Carbon-neutral shipping"],
];

const values = [
  { title: "Considered design", desc: "Every silhouette is refined over months, not days. We obsess over drape, proportion and the smallest details." },
  { title: "Responsible craft", desc: "We partner only with certified mills and tanneries, prioritising traceable, low-impact materials." },
  { title: "Built to last", desc: "We design against trends. Our pieces are made to be worn, repaired and loved for decades." },
];

const team = [
  { name: "Elena Voss", role: "Founder & Creative Director", img: "1573496359142-b8d87734a5a2" },
  { name: "Marcus Chen", role: "Head of Design", img: "1500648767791-00dcc994a43e" },
  { name: "Aria Kapoor", role: "Director of Sustainability", img: "1438761681033-6461ffad8d80" },
];

const img = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

export default function About() {
  return (
    <PageTransition>
      <PageHeader title="The NOVA story" subtitle="A modern fashion house built on the belief that true luxury is quiet, considered and made to last." crumbs={[{ label: "Home", to: "/" }, { label: "About" }]} />

      {/* Intro */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-500">Our philosophy</span>
            <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight md:text-5xl">
              Less, but infinitely better.
            </h2>
            <p className="mt-5 leading-relaxed text-soft">
              NOVA was founded on a simple frustration: a wardrobe full of clothes, yet nothing worth keeping. We set out to build the opposite — a tightly edited collection of essentials, each one engineered to be the best version of itself.
            </p>
            <p className="mt-4 leading-relaxed text-soft">
              From the mills of Biella to the ateliers of London, we work with the finest makers in the world, in limited runs, with no compromise. The result is clothing that feels inevitable.
            </p>
            <Button to="/shop" className="mt-7">Explore the collection <FiArrowRight /></Button>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="grid grid-cols-2 gap-4">
            <SmartImage src={img("1490481651871-ab68de25d43d")} alt="" seed={1} className="aspect-[3/4] rounded-3xl shadow-soft" />
            <SmartImage src={img("1539109136881-3be0616acf4b")} alt="" seed={2} className="mt-8 aspect-[3/4] rounded-3xl shadow-glow" />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-app bg-mesh">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 py-14 sm:px-8 lg:grid-cols-4">
          {stats.map(([n, l], i) => (
            <motion.div key={l} variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} transition={{ delay: i * 0.05 }} className="text-center">
              <p className="font-serif text-4xl font-semibold md:text-5xl">{n}</p>
              <p className="mt-2 text-sm text-soft">{l}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <SectionHeading overline="What we stand for" title="Our values" />
        <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewportOnce} className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <motion.div key={v.title} variants={fadeUp} className="rounded-3xl border border-app surface p-7">
              <span className="font-serif text-4xl text-gradient">0{i + 1}</span>
              <h3 className="mt-4 font-serif text-xl font-semibold">{v.title}</h3>
              <p className="mt-3 leading-relaxed text-soft">{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <SectionHeading overline="The people" title="Meet the founders" />
        <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewportOnce} className="mt-12 grid gap-6 sm:grid-cols-3">
          {team.map((m, i) => (
            <motion.div key={m.name} variants={fadeUp} className="group overflow-hidden rounded-3xl border border-app">
              <SmartImage src={img(m.img)} alt={m.name} seed={i} className="aspect-[4/5] w-full transition-transform duration-700 group-hover:scale-105" />
              <div className="p-5">
                <p className="font-serif text-lg font-semibold">{m.name}</p>
                <p className="text-sm text-muted">{m.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </PageTransition>
  );
}
