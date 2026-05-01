import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
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
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-12">
      <SectionHeader eyebrow="Discover" title="All categories" subtitle="Find your next favorite thing." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((c) => {
          const count = PRODUCTS.filter((p) => p.category === c.slug).length;
          return (
            <div
              key={c.slug}
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden glass-strong"
            >
              <Link
                to="/categories/$slug"
                params={{ slug: c.slug }}
                aria-label={`Explore ${c.name}`}
                className="absolute inset-0 z-10 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <img
                src={IMG[c.slug]}
                alt={c.name}
                loading="lazy"
                width={800}
                height={600}
                className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="pointer-events-none absolute inset-x-6 bottom-6 z-20 text-white">
                <div className="text-3xl mb-2">{c.emoji}</div>
                <h3 className="font-display text-2xl font-bold">{c.name}</h3>
                <div className="mt-1 flex items-center justify-between">
                  <p className="text-sm opacity-80">{count} products</p>
                  <Link
                    to="/categories/$slug"
                    params={{ slug: c.slug }}
                    className="pointer-events-auto inline-flex items-center gap-1 text-sm font-semibold opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition rounded-full bg-foreground/15 px-3 py-1.5 backdrop-blur-md hover:bg-foreground/25 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    Explore <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
