import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from "react-icons/fi";
import PageHeader from "../components/ui/PageHeader";
import PageTransition from "../components/layout/PageTransition";
import Button from "../components/ui/Button";
import { toast } from "../store/useToastStore";
import { fadeUp, stagger, viewportOnce } from "../hooks/useScrollReveal";

const info = [
  { icon: <FiMail />, label: "Email", value: "concierge@nova.com" },
  { icon: <FiPhone />, label: "Phone", value: "+1 (555) 012-3456" },
  { icon: <FiMapPin />, label: "Atelier", value: "21 Savile Row, London" },
  { icon: <FiClock />, label: "Hours", value: "24/7 concierge service" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return toast.error("Please complete the required fields");
    toast.success("Message sent — we'll reply within 24h ✦");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <PageTransition>
      <PageHeader title="Get in touch" subtitle="Our concierge team is here around the clock. We'd love to hear from you." crumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]} />
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={viewportOnce} className="space-y-4">
            {info.map((it) => (
              <motion.div key={it.label} variants={fadeUp} className="flex items-center gap-4 rounded-2xl border border-app surface p-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-500/15 text-xl text-brand-500">{it.icon}</span>
                <div>
                  <p className="text-sm text-muted">{it.label}</p>
                  <p className="font-medium">{it.value}</p>
                </div>
              </motion.div>
            ))}
            <div className="overflow-hidden rounded-2xl border border-app">
              <div className="bg-mesh grid h-48 place-items-center surface-2">
                <span className="flex items-center gap-2 text-soft"><FiMapPin /> Interactive map</span>
              </div>
            </div>
          </motion.div>

          <motion.form
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            onSubmit={submit}
            className="rounded-3xl border border-app surface p-6 md:p-8"
          >
            <h2 className="font-serif text-2xl font-semibold">Send us a message</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Name *" value={form.name} onChange={set("name")} placeholder="Your name" />
              <Field label="Email *" type="email" value={form.email} onChange={set("email")} placeholder="you@email.com" />
              <Field label="Subject" value={form.subject} onChange={set("subject")} placeholder="How can we help?" full />
              <label className="sm:col-span-2">
                <span className="mb-1.5 block text-sm font-medium text-soft">Message *</span>
                <textarea
                  value={form.message}
                  onChange={set("message")}
                  rows={5}
                  placeholder="Tell us more…"
                  className="w-full resize-none rounded-xl border border-app surface-2 p-4 text-sm outline-none focus:ring-2 focus:ring-brand-500/40"
                />
              </label>
            </div>
            <Button type="submit" size="lg" className="mt-6">Send message <FiSend /></Button>
          </motion.form>
        </div>
      </div>
    </PageTransition>
  );
}

function Field({ label, full, ...props }) {
  return (
    <label className={full ? "sm:col-span-2" : ""}>
      <span className="mb-1.5 block text-sm font-medium text-soft">{label}</span>
      <input {...props} className="h-12 w-full rounded-xl border border-app surface-2 px-4 text-sm outline-none focus:ring-2 focus:ring-brand-500/40" />
    </label>
  );
}
