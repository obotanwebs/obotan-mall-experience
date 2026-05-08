import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Bell, Star, Truck, ShieldCheck, ArrowLeft, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import {
  getProduct, PRODUCTS, SHIPPING_OPTIONS, STATUS_META,
  computeVariantPrice, defaultSelectedVariants, variantImagesFor,
} from "@/lib/products";
import { useCart, useWishlist } from "@/lib/store";
import { ProductCard } from "@/components/product-card";
import { ProductImageCarousel } from "@/components/product-image-carousel";
import { ProductVariantSelector } from "@/components/product-variant-selector";
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
  const [qty, setQty] = useState(1);
  const [selected, setSelected] = useState<Record<string, string>>(
    () => product ? defaultSelectedVariants(product) : {}
  );

  const unitPrice = useMemo(
    () => product ? computeVariantPrice(product, selected) : 0,
    [product, selected]
  );
  const galleryImages = useMemo(
    () => product ? variantImagesFor(product, selected) : [],
    [product, selected]
  );

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
  const total = product.status === "pre-order" ? unitPrice + shipOpt.cost : unitPrice;
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const hasVariants = !!product.variantGroups?.length;

  const handleAdd = (goToCart: boolean) => {
    add(product, { shipping, qty, variants: hasVariants ? selected : undefined, unitPrice });
    toast.success(product.status === "pre-order" ? "Pre-order added to cart" : "Added to cart");
    if (goToCart) navigate({ to: "/cart" });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-8 md:py-12">
      <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to shop
      </Link>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
          <ProductImageCarousel
            images={galleryImages}
            alt={product.name}
            badge={
              <span className={`absolute top-5 left-5 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border ${meta.color}`}>
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {meta.label}
              </span>
            }
          />
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

          {hasVariants && (
            <div className="mt-8 glass-strong rounded-3xl p-6">
              <ProductVariantSelector
                groups={product.variantGroups!}
                selected={selected}
                onChange={(type, value) => setSelected((s) => ({ ...s, [type]: value }))}
              />
            </div>
          )}

          {/* Pricing */}
          <div className="mt-6 glass-strong rounded-3xl p-6">
            {product.status === "pre-order" ? (
              <>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm text-muted-foreground">Product price</span>
                  <motion.span
                    key={unitPrice}
                    initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                    className="font-display text-2xl font-bold"
                  >
                    {ghs(unitPrice)}
                  </motion.span>
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
                    <motion.div
                      key={total}
                      initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                      className="font-display text-3xl font-bold gradient-text"
                    >
                      {ghs(total * qty)}
                    </motion.div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm text-muted-foreground">Price</span>
                <motion.span
                  key={unitPrice}
                  initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                  className="font-display text-3xl font-bold gradient-text"
                >
                  {ghs(unitPrice * qty)}
                </motion.span>
              </div>
            )}
          </div>

          {/* Quantity */}
          {product.status !== "waiting" && (
            <div className="mt-6 flex items-center gap-3">
              <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Quantity</span>
              <div className="flex items-center gap-2 glass rounded-full px-2 py-1">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-8 w-8 grid place-items-center rounded-full hover:bg-foreground/10" aria-label="Decrease quantity"><Minus className="h-3 w-3" /></button>
                <span className="w-8 text-center font-semibold">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="h-8 w-8 grid place-items-center rounded-full hover:bg-foreground/10" aria-label="Increase quantity"><Plus className="h-3 w-3" /></button>
              </div>
            </div>
          )}

          {/* Action */}
          <div className="mt-6 flex flex-wrap gap-3">
            {product.status === "in-stock" && (
              <>
                <button
                  onClick={() => handleAdd(false)}
                  className="flex-1 min-w-[10rem] inline-flex items-center justify-center gap-2 rounded-full glass-strong px-7 py-4 text-sm font-semibold hover:scale-[1.02] transition"
                >
                  <ShoppingBag className="h-4 w-4" /> Add to cart
                </button>
                <button
                  onClick={() => handleAdd(true)}
                  className="flex-1 min-w-[10rem] inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-7 py-4 text-sm font-semibold shadow-glow hover:scale-[1.02] transition"
                >
                  Buy now
                </button>
              </>
            )}
            {product.status === "pre-order" && (
              <button
                onClick={() => handleAdd(true)}
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
