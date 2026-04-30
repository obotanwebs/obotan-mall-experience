import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Globe2, HeartHandshake } from "lucide-react";
import { SectionHeader } from "./index";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — OBOTANMALL" },
      { name: "description", content: "Learn about OBOTANMALL — a premium digital mall for everything you need." },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-5xl px-4 md:px-8 py-12">
      <SectionHeader eyebrow="Our story" title="A premium digital mall, built for what's next" subtitle="OBOTANMALL was born from a simple idea — shopping online should feel as elegant and trustworthy as walking into a luxury boutique." />
      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {[
          { icon: Sparkles, title: "Curated, never cluttered", desc: "Every product in our catalog is hand-picked for quality, design and longevity." },
          { icon: Globe2, title: "Worldwide by design", desc: "Air or sea shipping, transparent pricing and pre-order options that work everywhere." },
          { icon: HeartHandshake, title: "People-first support", desc: "Real humans, fast replies and policies that put customers ahead of paperwork." },
        ].map((it) => (
          <div key={it.title} className="glass-strong rounded-3xl p-7">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--gradient-primary)] text-primary-foreground mb-4"><it.icon className="h-5 w-5" /></div>
            <h3 className="font-display text-lg font-bold">{it.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
          </div>
        ))}
      </div>
    </div>
  ),
});
