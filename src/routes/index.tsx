import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Truck, Shield, RefreshCcw, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCard } from "@/components/product-card";
import { PRODUCTS, CATEGORIES } from "@/lib/products";
import heroImg from "@/assets/hero.jpg";
import catGadgets from "@/assets/cat-gadgets.jpg";
import catFashion from "@/assets/cat-fashion.jpg";
import catElectronics from "@/assets/cat-electronics.jpg";
import catAccessories from "@/assets/cat-accessories.jpg";
import catHome from "@/assets/cat-home.jpg";
import catBeauty from "@/assets/cat-beauty.jpg";

const CAT_IMAGES: Record<string, string> = {
  gadgets: catGadgets, fashion: catFashion, electronics: catElectronics,
  accessories: catAccessories, home: catHome, beauty: catBeauty,
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OBOTANMALL — Premium Online Mall" },
      { name: "description", content: "Discover gadgets, fashion, electronics and more in a premium digital shopping experience." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Featured />
      <WhyUs />
      <Newsletter />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-8 pt-10 md:pt-20 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              The premium digital mall · 2026
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-6 font-display text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]"
            >
              Welcome to <span className="gradient-text">OBOTANMALL</span><br />
              Your one-stop shopping destination
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-6 text-lg text-muted-foreground max-w-xl"
            >
              Curated gadgets, fashion, electronics and accessories — delivered with care.
              Shop in-stock favorites or pre-order tomorrow's essentials today.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link to="/shop" className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-3.5 text-sm font-semibold shadow-glow hover:scale-[1.03] transition-transform">
                Shop now <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
              </Link>
              <Link to="/categories" className="inline-flex items-center gap-2 glass-strong rounded-full px-7 py-3.5 text-sm font-semibold hover:scale-[1.03] transition-transform">
                Browse categories
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 flex flex-wrap gap-6 text-sm"
            >
              {[["10K+","Products"],["120+","Countries"],["4.9★","Rating"]].map(([n,l]) => (
                <div key={l}><div className="font-display text-2xl font-bold">{n}</div><div className="text-muted-foreground text-xs uppercase tracking-wider">{l}</div></div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-square rounded-[2.5rem] overflow-hidden glass-strong shadow-glow animate-float">
              <img src={heroImg} alt="OBOTANMALL premium shopping" width={1920} height={1280} className="h-full w-full object-cover" />
              <div className="absolute inset-x-6 bottom-6 glass-strong rounded-2xl p-4 flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--gradient-primary)] text-primary-foreground text-xl">✨</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">Trending today</p>
                  <p className="font-semibold text-sm truncate">Aurora Pro Headphones — $299</p>
                </div>
                <Link to="/product/$slug" params={{ slug: "aurora-pro-headphones" }} className="text-xs font-semibold rounded-full bg-foreground text-background px-3 py-1.5">View</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 py-16">
      <SectionHeader eyebrow="Explore" title="Shop by category" subtitle="From the latest gadgets to timeless accessories." />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <Link to="/categories/$slug" params={{ slug: cat.slug }} className="group block">
              <div className="relative aspect-square overflow-hidden rounded-2xl glass">
                <img src={CAT_IMAGES[cat.slug]} alt={cat.name} loading="lazy" width={800} height={800} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute inset-x-3 bottom-3 text-white">
                  <div className="text-2xl">{cat.emoji}</div>
                  <div className="font-semibold text-sm">{cat.name}</div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Featured() {
  const featured = PRODUCTS.slice(0, 8);
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 py-16">
      <SectionHeader eyebrow="Featured" title="Bestsellers & new arrivals" subtitle="Hand-picked products our customers love." action={<Link to="/shop" className="text-sm font-semibold hover:underline inline-flex items-center gap-1">View all <ArrowRight className="h-4 w-4" /></Link>} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    { icon: Truck, title: "Fast worldwide delivery", desc: "Air or sea — choose what fits. Track every step." },
    { icon: Shield, title: "Trusted products", desc: "Authenticated by our team. Quality you can trust." },
    { icon: RefreshCcw, title: "Flexible ordering", desc: "Pre-order tomorrow's essentials at today's price." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 py-16">
      <SectionHeader eyebrow="Why OBOTANMALL" title="A premium experience, end to end" />
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="glass-strong rounded-3xl p-8"
          >
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--gradient-primary)] text-primary-foreground mb-5">
              <it.icon className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl font-semibold">{it.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 py-16">
      <div className="relative overflow-hidden rounded-[2rem] glass-strong p-8 md:p-14 text-center">
        <div className="absolute inset-0 -z-10 aurora-bg opacity-50" />
        <Mail className="h-8 w-8 mx-auto mb-4 text-primary" />
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">Stay in the loop</h2>
        <p className="mt-3 text-muted-foreground max-w-lg mx-auto">Be first to hear about restocks, drops and members-only pricing.</p>
        <form
          onSubmit={(e) => { e.preventDefault(); if (!email.includes("@")) return toast.error("Enter a valid email"); toast.success("You're in! Check your inbox."); setEmail(""); }}
          className="mt-7 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
        >
          <input
            value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com" type="email"
            className="flex-1 glass rounded-full px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button type="submit" className="rounded-full bg-foreground text-background px-7 py-3.5 text-sm font-semibold hover:scale-[1.03] transition">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, subtitle, action }: { eyebrow?: string; title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        {eyebrow && <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">{eyebrow}</p>}
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight max-w-2xl">{title}</h2>
        {subtitle && <p className="mt-3 text-muted-foreground max-w-xl">{subtitle}</p>}
      </motion.div>
      {action}
    </div>
  );
}
