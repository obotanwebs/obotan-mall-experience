import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/store";
import { SHIPPING_OPTIONS } from "@/lib/products";
import { ghs } from "@/lib/currency";
import { SectionHeader } from "./index";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — OBOTANMALL" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, setShipping } = useCart();

  const subtotal = items.reduce((sum, i) => {
    const ship = i.shipping ? SHIPPING_OPTIONS.find((o) => o.id === i.shipping)?.cost ?? 0 : 0;
    return sum + (i.product.price + ship) * i.qty;
  }, 0);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 md:px-8 py-24 text-center">
        <div className="glass-strong rounded-3xl p-14">
          <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground" />
          <h1 className="mt-4 font-display text-3xl font-bold">Your cart is empty</h1>
          <p className="mt-2 text-muted-foreground">Discover our curated collection.</p>
          <Link to="/shop" className="mt-6 inline-flex rounded-full bg-foreground text-background px-7 py-3 text-sm font-semibold">Start shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-12">
      <SectionHeader eyebrow="Cart" title="Your shopping bag" />
      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        <div className="space-y-4">
          {items.map((it) => {
            const ship = it.shipping ? SHIPPING_OPTIONS.find((o) => o.id === it.shipping) : null;
            const line = (it.product.price + (ship?.cost ?? 0)) * it.qty;
            return (
              <div key={it.product.id} className="glass-strong rounded-3xl p-4 flex flex-wrap sm:flex-nowrap gap-4 items-center">
                <Link to="/product/$slug" params={{ slug: it.product.slug }} className="block h-20 w-20 sm:h-24 sm:w-24 rounded-2xl overflow-hidden flex-shrink-0">
                  <img src={it.product.image} alt={it.product.name} className="h-full w-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0 basis-[calc(100%-6rem)] sm:basis-auto">
                  <Link to="/product/$slug" params={{ slug: it.product.slug }} className="font-semibold hover:underline truncate block">{it.product.name}</Link>
                  <p className="text-xs text-muted-foreground capitalize">{it.product.category}</p>
                  {it.product.status === "pre-order" && (
                    <select
                      value={it.shipping ?? "air"}
                      onChange={(e) => setShipping(it.product.id, e.target.value as "air" | "sea")}
                      className="mt-2 max-w-full text-xs rounded-full bg-background/40 border border-glass-border px-3 py-1"
                    >
                      {SHIPPING_OPTIONS.map((o) => <option key={o.id} value={o.id}>{o.icon} {o.label} (+{ghs(o.cost)}, {o.days})</option>)}
                    </select>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setQty(it.product.id, it.qty - 1)} className="h-8 w-8 grid place-items-center rounded-full glass hover:bg-foreground/10"><Minus className="h-3 w-3" /></button>
                  <span className="w-6 text-center font-semibold">{it.qty}</span>
                  <button onClick={() => setQty(it.product.id, it.qty + 1)} className="h-8 w-8 grid place-items-center rounded-full glass hover:bg-foreground/10"><Plus className="h-3 w-3" /></button>
                </div>
                <div className="text-right min-w-[80px] ml-auto">
                  <div className="font-display font-bold">{ghs(line)}</div>
                  <button onClick={() => remove(it.product.id)} className="mt-1 text-xs text-muted-foreground hover:text-destructive inline-flex items-center gap-1"><Trash2 className="h-3 w-3" /> Remove</button>
                </div>
              </div>
            );
          })}
        </div>

        <aside className="glass-strong rounded-3xl p-6 h-fit lg:sticky lg:top-28">
          <h3 className="font-display text-xl font-bold mb-5">Order summary</h3>
          <div className="space-y-2.5 text-sm">
            <Row label="Subtotal" value={ghs(subtotal)} />
            <Row label="Estimated tax" value="—" muted />
            <Row label="Shipping" value="Calculated at checkout" muted />
          </div>
          <div className="mt-5 pt-5 border-t border-glass-border flex items-center justify-between">
            <span className="font-semibold">Total</span>
            <span className="font-display text-2xl font-bold gradient-text">{ghs(subtotal)}</span>
          </div>
          <Link to="/checkout" className="mt-6 block text-center rounded-full bg-foreground text-background px-7 py-3.5 text-sm font-semibold shadow-glow hover:scale-[1.02] transition">
            Checkout
          </Link>
          <Link to="/shop" className="mt-3 block text-center text-sm text-muted-foreground hover:text-foreground">Continue shopping</Link>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={muted ? "text-muted-foreground" : "font-medium"}>{value}</span>
    </div>
  );
}
