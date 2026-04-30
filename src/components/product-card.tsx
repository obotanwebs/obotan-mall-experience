import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { STATUS_META } from "@/lib/products";
import { useWishlist } from "@/lib/store";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const wished = useWishlist((s) => s.ids.includes(product.id));
  const toggle = useWishlist((s) => s.toggle);
  const meta = STATUS_META[product.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <Link to="/product/$slug" params={{ slug: product.slug }} className="block">
        <div className="relative aspect-square overflow-hidden rounded-3xl glass">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={800}
            height={800}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md border ${meta.color}`}>
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {meta.label}
            </span>
          </div>
          <button
            onClick={(e) => { e.preventDefault(); toggle(product.id); }}
            className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full glass-strong hover:scale-110 transition"
            aria-label="Wishlist"
          >
            <Heart className={`h-4 w-4 ${wished ? "fill-primary text-primary" : ""}`} />
          </button>
          <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <div className="glass-strong rounded-xl px-4 py-2.5 text-center text-sm font-semibold">
              View product →
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{product.category}</p>
            <h3 className="mt-0.5 font-medium truncate">{product.name}</h3>
          </div>
          <p className="font-display text-lg font-semibold whitespace-nowrap">${product.price}</p>
        </div>
      </Link>
    </motion.div>
  );
}
