import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { PRODUCTS, CATEGORIES, type ProductStatus } from "@/lib/products";
import { SectionHeader } from "./index";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — OBOTANMALL" },
      { name: "description", content: "Browse all products across gadgets, fashion, electronics and more." },
    ],
  }),
  component: Shop,
});

const STATUS_FILTERS: { id: "all" | ProductStatus; label: string }[] = [
  { id: "all", label: "All" },
  { id: "in-stock", label: "In Stock" },
  { id: "pre-order", label: "Pre-Order" },
  { id: "waiting", label: "Restocking" },
];

function Shop() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [status, setStatus] = useState<"all" | ProductStatus>("all");
  const [maxPrice, setMaxPrice] = useState(2000);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) =>
      (cat === "all" || p.category === cat) &&
      (status === "all" || p.status === status) &&
      p.price <= maxPrice &&
      (q === "" || p.name.toLowerCase().includes(q.toLowerCase()))
    );
  }, [q, cat, status, maxPrice]);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-12">
      <SectionHeader eyebrow="Catalog" title="Shop everything" subtitle={`${PRODUCTS.length} products curated for you.`} />

      <div className="glass-strong rounded-3xl p-5 mb-10 grid gap-4 md:grid-cols-[1fr_auto_auto] items-center">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Search products…"
            className="w-full rounded-full bg-background/40 border border-glass-border pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
        <select value={cat} onChange={(e) => setCat(e.target.value)} className="rounded-full bg-background/40 border border-glass-border px-4 py-3 text-sm">
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
        </select>
        <div className="flex items-center gap-3 px-2">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <input type="range" min={50} max={2000} step={50} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="accent-[var(--primary)]" />
          <span className="text-sm font-medium whitespace-nowrap">≤ ${maxPrice}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {STATUS_FILTERS.map((s) => (
          <button
            key={s.id}
            onClick={() => setStatus(s.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${status === s.id ? "bg-foreground text-background" : "glass hover:bg-foreground/10"}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="glass-strong rounded-3xl p-16 text-center">
          <p className="text-muted-foreground">No products match your filters.</p>
          <Link to="/shop" onClick={() => { setQ(""); setCat("all"); setStatus("all"); setMaxPrice(2000); }} className="mt-4 inline-block text-sm font-semibold text-primary">Reset filters</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </div>
  );
}
