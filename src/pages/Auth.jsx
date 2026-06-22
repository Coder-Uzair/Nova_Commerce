import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiLock, FiUser, FiArrowRight } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import PageTransition from "../components/layout/PageTransition";
import Button from "../components/ui/Button";
import SmartImage from "../components/ui/SmartImage";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "../store/useToastStore";

export default function Auth({ mode = "login" }) {
  const [tab, setTab] = useState(mode);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { login, register } = useAuthStore();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return toast.error("Please fill in all fields");
    if (tab === "login") {
      login(form.email);
      toast.success("Welcome back ✦");
    } else {
      register(form.name || "Member", form.email);
      toast.success("Account created — welcome to NOVA ✦");
    }
    navigate("/dashboard");
  };

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <PageTransition>
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-stretch gap-0 px-0 lg:grid-cols-2">
        {/* Visual side */}
        <div className="relative hidden overflow-hidden lg:block">
          <SmartImage src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80" alt="" className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-12">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 font-serif text-xl font-bold text-white">N</span>
            <h2 className="mt-6 max-w-sm font-serif text-4xl font-semibold leading-tight text-white">
              The wardrobe of the future, today.
            </h2>
            <p className="mt-3 max-w-sm text-white/70">Join 180,000+ members enjoying early access, private sales and white-glove service.</p>
          </div>
        </div>

        {/* Form side */}
        <div className="flex items-center justify-center px-5 py-16 sm:px-8">
          <div className="w-full max-w-md">
            <div className="flex rounded-full border border-app p-1">
              {["login", "register"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`relative flex-1 rounded-full py-2.5 text-sm font-medium capitalize transition ${tab === t ? "text-white" : "text-soft"}`}
                >
                  {tab === t && <motion.span layoutId="auth-tab" className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-brand-600 to-accent-500" />}
                  {t === "login" ? "Sign in" : "Create account"}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.form
                key={tab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                onSubmit={submit}
                className="mt-8"
              >
                <h1 className="font-serif text-3xl font-semibold">{tab === "login" ? "Welcome back" : "Join NOVA"}</h1>
                <p className="mt-2 text-soft">{tab === "login" ? "Sign in to access your account." : "Create an account in seconds."}</p>

                <div className="mt-6 space-y-4">
                  {tab === "register" && (
                    <InputIcon icon={<FiUser />} placeholder="Full name" value={form.name} onChange={set("name")} />
                  )}
                  <InputIcon icon={<FiMail />} placeholder="Email address" type="email" value={form.email} onChange={set("email")} />
                  <InputIcon icon={<FiLock />} placeholder="Password" type="password" value={form.password} onChange={set("password")} />
                </div>

                {tab === "login" && (
                  <div className="mt-3 text-right">
                    <a href="#" className="text-sm text-brand-500">Forgot password?</a>
                  </div>
                )}

                <Button type="submit" size="lg" className="mt-6 w-full">
                  {tab === "login" ? "Sign in" : "Create account"} <FiArrowRight />
                </Button>

                <div className="my-6 flex items-center gap-4 text-xs text-muted">
                  <div className="h-px flex-1 bg-[var(--border)]" /> OR <div className="h-px flex-1 bg-[var(--border)]" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" type="button" onClick={() => { login("guest@nova.com"); navigate("/dashboard"); }}>
                    <FcGoogle size={18} /> Google
                  </Button>
                  <Button variant="outline" type="button" onClick={() => { login("guest@nova.com"); navigate("/dashboard"); }}>
                    <FaApple size={18} /> Apple
                  </Button>
                </div>
              </motion.form>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

function InputIcon({ icon, ...props }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-app surface-2 px-4 focus-within:ring-2 focus-within:ring-brand-500/40">
      <span className="text-muted">{icon}</span>
      <input {...props} className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted" />
    </div>
  );
}
