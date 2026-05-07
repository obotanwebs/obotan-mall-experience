import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, CreditCard, Smartphone, Copy } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/store";
import { SHIPPING_OPTIONS } from "@/lib/products";
import { ghs } from "@/lib/currency";
import { SectionHeader } from "./index";
import { WhatsAppIcon } from "@/components/whatsapp-icon";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — OBOTANMALL" }] }),
  component: Checkout,
});

function Checkout() {
  const { items, clear } = useCart();
  const navigate = useNavigate();
  const [pay, setPay] = useState<"card" | "manual">("card");
  const [done, setDone] = useState(false);

  const subtotal = items.reduce((s, i) => {
    const ship = i.shipping ? SHIPPING_OPTIONS.find((o) => o.id === i.shipping)?.cost ?? 0 : 0;
    return s + (i.product.price + ship) * i.qty;
  }, 0);

  if (items.length === 0 && !done) {
    return (
      <div className="mx-auto max-w-3xl px-4 md:px-8 py-24 text-center">
        <p className="text-muted-foreground">Your cart is empty.</p>
        <Link to="/shop" className="mt-4 inline-block text-primary font-semibold">Browse products</Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-4 md:px-8 py-24 text-center">
        <div className="glass-strong rounded-3xl p-12">
          <CheckCircle2 className="h-14 w-14 text-emerald-500 mx-auto" />
          <h1 className="mt-4 font-display text-3xl font-bold">Order placed!</h1>
          <p className="mt-2 text-muted-foreground">A confirmation has been sent to your email. Thank you for shopping with OBOTANMALL.</p>
          <Link to="/shop" className="mt-6 inline-flex rounded-full bg-foreground text-background px-7 py-3 text-sm font-semibold">Continue shopping</Link>
        </div>
      </div>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Order placed successfully!");
    clear();
    setDone(true);
    setTimeout(() => navigate({ to: "/" }), 5000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-12">
      <SectionHeader eyebrow="Checkout" title="Almost there" />
      <form onSubmit={submit} className="grid lg:grid-cols-[1fr_minmax(0,400px)] gap-8">
        <div className="space-y-6">
          <Card title="Contact & shipping">
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Full name" name="name" required />
              <Field label="Email" type="email" name="email" required />
              <Field label="Phone" name="phone" />
              <Field label="Country" name="country" required />
              <Field label="Address" name="address" className="sm:col-span-2" required />
              <Field label="City" name="city" required />
              <Field label="Postal code" name="zip" required />
            </div>
          </Card>

          <Card title="Payment method">
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { id: "card", label: "Credit / Debit Card", icon: CreditCard, note: "Visa, Mastercard, Amex" },
                { id: "manual", label: "Mobile Money (MTN & Telecel)", icon: Smartphone, note: "Pay via MoMo — fast & easy" },
              ].map((opt) => {
                const active = pay === opt.id;
                return (
                  <button type="button" key={opt.id} onClick={() => setPay(opt.id as typeof pay)}
                    className={`text-left rounded-2xl p-4 border-2 transition ${active ? "border-primary bg-primary/5" : "border-glass-border hover:border-primary/40"}`}>
                    <opt.icon className="h-5 w-5 text-primary" />
                    <div className="mt-2 font-semibold text-sm">{opt.label}</div>
                    <div className="text-xs text-muted-foreground">{opt.note}</div>
                  </button>
                );
              })}
            </div>
            {pay === "card" && (
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                <Field label="Card number" name="card" placeholder="•••• •••• •••• ••••" className="sm:col-span-2" />
                <Field label="Expiry" name="exp" placeholder="MM/YY" />
                <Field label="CVC" name="cvc" placeholder="•••" />
              </div>
            )}
            {pay === "manual" && <MomoInstructions total={subtotal} />}
          </Card>
        </div>

        <aside className="glass-strong rounded-3xl p-6 h-fit lg:sticky lg:top-28">
          <h3 className="font-display text-xl font-bold mb-5">Your order</h3>
          <div className="space-y-3 max-h-72 overflow-auto">
            {items.map((it) => {
              const ship = it.shipping ? SHIPPING_OPTIONS.find((o) => o.id === it.shipping) : null;
              return (
                <div key={it.product.id} className="flex gap-3 items-center">
                  <img src={it.product.image} alt={it.product.name} className="h-14 w-14 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{it.product.name}</p>
                    <p className="text-xs text-muted-foreground">Qty {it.qty}{ship ? ` · ${ship.icon} ${ship.label}` : ""}</p>
                  </div>
                  <p className="text-sm font-semibold">{ghs((it.product.price + (ship?.cost ?? 0)) * it.qty)}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-5 pt-5 border-t border-glass-border flex items-center justify-between">
            <span className="font-semibold">Total</span>
            <span className="font-display text-2xl font-bold gradient-text">{ghs(subtotal)}</span>
          </div>
          <button type="submit" className="mt-6 w-full rounded-full bg-foreground text-background px-7 py-3.5 text-sm font-semibold shadow-glow hover:scale-[1.02] transition">
            Place order
          </button>
        </aside>
      </form>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass-strong rounded-3xl p-6">
      <h3 className="font-display text-lg font-bold mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input {...props} className="mt-1.5 w-full rounded-xl bg-background/40 border border-glass-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
    </label>
  );
}

function MomoInstructions({ total }: { total: number }) {
  const copy = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    toast.success(`${label} copied`);
  };
  const orderLines = items.map((it) => {
    const ship = it.shipping ? SHIPPING_OPTIONS.find((o) => o.id === it.shipping) : null;
    return `• ${it.product.name} × ${it.qty} — ${ghs((it.product.price + (ship?.cost ?? 0)) * it.qty)}${ship ? ` (${ship.label})` : ""}`;
  }).join("\n");
  const waMsg = `Hello OBOTANMALL, I have made a Mobile Money payment of ${ghs(total)} for the following order:\n\n${orderLines}\n\nTotal: ${ghs(total)}\n\nHere is my transaction reference:`;
  const waHref = `https://wa.me/233203662465?text=${encodeURIComponent(waMsg)}`;

  return (
    <div className="mt-5 space-y-4">
      <div className="rounded-2xl border border-glass-border bg-background/40 p-5">
        <p className="text-sm text-muted-foreground">
          You can complete your payment using <span className="font-semibold text-foreground">Mobile Money</span>. Please send the exact amount to one of the numbers below and use your <span className="font-semibold text-foreground">name or order ID</span> as reference.
        </p>

        <div className="mt-4 grid sm:grid-cols-2 gap-3">
          {/* MTN */}
          <div className="rounded-2xl p-4 border-2 border-yellow-400/50 bg-yellow-400/5">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-yellow-400 text-black font-display font-extrabold text-xs">MTN</span>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">MTN Mobile Money</div>
                <div className="font-display text-lg font-bold">0553 306 538</div>
              </div>
            </div>
            <button type="button" onClick={() => copy("0553306538", "MTN number")}
              className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-foreground/80 hover:text-foreground">
              <Copy className="h-3.5 w-3.5" /> Copy number
            </button>
          </div>

          {/* Telecel */}
          <div className="rounded-2xl p-4 border-2 border-red-500/40 bg-red-500/5">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-red-600 text-white font-display font-extrabold text-[10px]">TEL</span>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Telecel Cash</div>
                <div className="font-display text-lg font-bold">0203 662 465</div>
              </div>
            </div>
            <button type="button" onClick={() => copy("0203662465", "Telecel number")}
              className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-foreground/80 hover:text-foreground">
              <Copy className="h-3.5 w-3.5" /> Copy number
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl bg-foreground/5 px-4 py-3">
          <span className="text-xs text-muted-foreground">Amount to send</span>
          <span className="font-display text-lg font-bold gradient-text">{ghs(total)}</span>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          After payment, please send a screenshot or transaction ID via WhatsApp or wait for automatic confirmation.
        </p>

        <a href={waHref} target="_blank" rel="noopener noreferrer"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] text-white px-7 py-3 text-sm font-semibold hover:scale-[1.02] transition">
          <WhatsAppIcon className="h-5 w-5" /> Confirm Payment on WhatsApp
        </a>
      </div>
    </div>
  );
}
