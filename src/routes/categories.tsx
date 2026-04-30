import { createFileRoute, Link } from "@tanstack/react-router";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import { SectionHeader } from "./index";
import catGadgets from "@/assets/cat-gadgets.jpg";
import catFashion from "@/assets/cat-fashion.jpg";
import catElectronics from "@/assets/cat-electronics.jpg";
import catAccessories from "@/assets/cat-accessories.jpg";
import catHome from "@/assets/cat-home.jpg";
import catBeauty from "@/assets/cat-beauty.jpg";

const IMG: Record<string, string> = {
  gadgets: catGadgets, fashion: catFashion, electronics: catElectronics,
  accessories: catAccessories, home: catHome, beauty: catBeauty,
};

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — OBOTANMALL" },
      { name: "description", content: "Browse all OBOTANMALL categories." },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-12">
      <SectionHeader eyebrow="Discover" title="All categories" subtitle="Find your next favorite thing." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((c) => {
          const count = PRODUCTS.filter((p) => p.category === c.slug).length;
          return (
            <Link key={c.slug} to="/categories/$slug" params={{ slug: c.slug }} className="group relative aspect-[4/3] rounded-3xl overflow-hidden glass-strong">
              <img src={IMG[c.slug]} alt={c.name} loading="lazy" width={800} height={600} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-x-6 bottom-6 text-white">
                <div className="text-3xl mb-2">{c.emoji}</div>
                <h3 className="font-display text-2xl font-bold">{c.name}</h3>
                <p className="text-sm opacity-80">{count} products</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  ),
});
