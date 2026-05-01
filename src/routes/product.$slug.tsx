import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Bell, Star, Truck, ShieldCheck, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { getProduct, PRODUCTS, SHIPPING_OPTIONS, STATUS_META } from "@/lib/products";
import { useCart, useWishlist } from "@/lib/store";
import { ProductCard } from "@/components/product-card";
import { ghs } from "@/lib/currency";

export const Route = createFileRoute("/product/$slug")({
  component: ProductPage,
  notFoundComponent: () => <div className="p-24 text-center">Product not found</div>,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const product = getProduct(slug);
  const navigate = useNavigate();
  const add = useCart((s) => s.add);
  const wishToggle = useWishlist((s) => s.toggle);
  const wished = useWishlist((s) => product ? s.ids.includes(product.id) : false);
  const [shipping, setShipping] = useState<"air" | "sea">("air");
  const [notifyEmail, setNotifyEmail] = useState("");

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Product not found</h1>
        <Link to="/shop" className="mt-4 inline-block text-primary font-semibold">Browse all products</Link>
      </div>
    );
  }

  const meta = STATUS_META[product.status];
  const shipOpt = SHIPPING_OPTIONS.find((o) => o.id === shipping)!;
  const total = product.status === "pre-order" ? product.price + shipOpt.cost : product.price;
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-8 md:py-12">
      <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to shop
      </Link>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
          className="relative aspect-square rounded-[2rem] overflow-hidden glass-strong shadow-glass"
        >
          <img src={product.image} alt={product.name} width={800} height={800} className="h-full w-full object-cover" />
          <span className={`absolute top-5 left-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border ${meta.color}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {meta.label}
          </span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">{product.category}</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold tracking-tight">{product.name}</h1>
          <div className="mt-3 flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40"}`} />
              ))}
            </div>
            <span className="text-muted-foreground">{product.rating} · {product.reviews} reviews</span>
          </div>

          <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

          {/* Pricing */}
          <div className="mt-8 glass-strong rounded-3xl p-6">
            {product.status === "pre-order" ? (
              <>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm text-muted-foreground">Product price</span>
                  <span className="font-display text-2xl font-bold">{ghs(product.price)}</span>
                </div>
                <p className="mt-5 text-sm font-semibold mb-3">Choose shipping method</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {SHIPPING_OPTIONS.map((opt) => {
                    const active = shipping === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setShipping(opt.id)}
                        className={`text-left rounded-2xl p-4 border-2 transition ${active ? "border-primary bg-primary/5" : "border-glass-border hover:border-primary/40"}`}
                      >
                        <div className="text-xl">{opt.icon}</div>
                        <div className="mt-2 font-semibold text-sm">{opt.label}</div>
                        <div className="text-xs text-muted-foreground">{opt.days}</div>
                        <div className="mt-2 font-display font-bold">{ghs(opt.cost)}</div>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-5 pt-5 border-t border-glass-border flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">Estimated delivery</div>
                    <div className="text-sm font-semibold">{shipOpt.days}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Total</div>
                    <div className="font-display text-3xl font-bold gradient-text">{ghs(total)}</div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm text-muted-foreground">Price</span>
                <span className="font-display text-3xl font-bold gradient-text">{ghs(product.price)}</span>
              </div>
            )}
          </div>

          {/* Action */}
          <div className="mt-6 flex flex-wrap gap-3">
            {product.status === "in-stock" && (
              <button
                onClick={() => { add(product); toast.success("Added to cart"); }}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-7 py-4 text-sm font-semibold shadow-glow hover:scale-[1.02] transition"
              >
                <ShoppingBag className="h-4 w-4" /> Add to cart
              </button>
            )}
            {product.status === "pre-order" && (
              <button
                onClick={() => { add(product, { shipping }); toast.success("Pre-order added to cart"); navigate({ to: "/cart" }); }}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-7 py-4 text-sm font-semibold shadow-glow hover:scale-[1.02] transition"
              >
                <ShoppingBag className="h-4 w-4" /> Pre-order now
              </button>
            )}
            {product.status === "waiting" && (
              <form
                onSubmit={(e) => { e.preventDefault(); if (!notifyEmail.includes("@")) return toast.error("Enter a valid email"); toast.success("We'll notify you when it's back!"); setNotifyEmail(""); }}
                className="flex-1 flex gap-2"
              >
                <input
                  value={notifyEmail} onChange={(e) => setNotifyEmail(e.target.value)} type="email" placeholder="Email me when back in stock"
                  className="flex-1 glass rounded-full px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                <button type="submit" className="rounded-full bg-foreground text-background px-6 text-sm font-semibold inline-flex items-center gap-2">
                  <Bell className="h-4 w-4" /> Notify
                </button>
              </form>
            )}
            <button
              onClick={() => { wishToggle(product.id); toast.success(wished ? "Removed from wishlist" : "Added to wishlist"); }}
              className="grid h-14 w-14 place-items-center rounded-full glass-strong hover:scale-105 transition"
              aria-label="Wishlist"
            >
              <Heart className={`h-5 w-5 ${wished ? "fill-primary text-primary" : ""}`} />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="glass rounded-2xl p-4 flex items-center gap-3">
              <Truck className="h-5 w-5 text-primary" />
              <div className="text-xs"><div className="font-semibold">Worldwide shipping</div><div className="text-muted-foreground">Air or sea</div></div>
            </div>
            <div className="glass rounded-2xl p-4 flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <div className="text-xs"><div className="font-semibold">Authenticity</div><div className="text-muted-foreground">Verified by us</div></div>
            </div>
          </div>
        </motion.div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
}
