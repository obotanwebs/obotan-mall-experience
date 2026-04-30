import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/product-card";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import { SectionHeader } from "./index";

export const Route = createFileRoute("/categories/$slug")({
  component: CategoryPage,
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const cat = CATEGORIES.find((c) => c.slug === slug);
  const items = PRODUCTS.filter((p) => p.category === slug);

  if (!cat) {
    return (
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Category not found</h1>
        <Link to="/categories" className="mt-4 inline-block text-primary font-semibold">Back to categories</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-12">
      <SectionHeader eyebrow={cat.emoji + " " + cat.name} title={cat.name} subtitle={`${items.length} curated products in ${cat.name}.`} />
      {items.length === 0 ? (
        <div className="glass-strong rounded-3xl p-16 text-center text-muted-foreground">Nothing here yet — check back soon.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </div>
  );
}
