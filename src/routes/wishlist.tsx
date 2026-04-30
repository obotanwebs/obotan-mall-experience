import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { PRODUCTS } from "@/lib/products";
import { useWishlist } from "@/lib/store";
import { SectionHeader } from "./index";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — OBOTANMALL" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const ids = useWishlist((s) => s.ids);
  const items = PRODUCTS.filter((p) => ids.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-12">
      <SectionHeader eyebrow="Saved" title="Your wishlist" subtitle={`${items.length} item${items.length === 1 ? "" : "s"} saved.`} />
      {items.length === 0 ? (
        <div className="glass-strong rounded-3xl p-16 text-center">
          <Heart className="h-12 w-12 mx-auto text-muted-foreground" />
          <p className="mt-3 text-muted-foreground">Nothing saved yet.</p>
          <Link to="/shop" className="mt-4 inline-flex rounded-full bg-foreground text-background px-6 py-2.5 text-sm font-semibold">Discover products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </div>
  );
}
