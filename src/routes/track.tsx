import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Package, CheckCircle2, Truck, Home, Search, MapPin } from "lucide-react";
import { SectionHeader } from "./index";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "Track Your Order — OBOTANMALL" },
      { name: "description", content: "Track your OBOTANMALL order status in real time." },
      { property: "og:title", content: "Track Your Order — OBOTANMALL" },
      { property: "og:description", content: "Enter your order ID to see live shipping updates." },
    ],
  }),
  component: TrackPage,
});

type Step = { icon: typeof Package; label: string; date: string; done: boolean; current?: boolean };

function TrackPage() {
  const [orderId, setOrderId] = useState("");
  const [result, setResult] = useState<null | { id: string; eta: string; carrier: string; steps: Step[] }>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    // Mock tracking
    setResult({
      id: orderId.toUpperCase(),
      eta: "May 5, 2026",
      carrier: "OBOTAN Express",
      steps: [
        { icon: CheckCircle2, label: "Order confirmed", date: "Apr 28, 2026 · 10:24", done: true },
        { icon: Package, label: "Packed & dispatched", date: "Apr 29, 2026 · 14:02", done: true },
        { icon: Truck, label: "In transit", date: "Apr 30, 2026 · 08:15", done: true, current: true },
        { icon: MapPin, label: "Out for delivery", date: "Pending", done: false },
        { icon: Home, label: "Delivered", date: "Pending", done: false },
      ],
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 md:px-8 py-12">
      <SectionHeader eyebrow="Order tracking" title="Where's my order?" subtitle="Enter your order ID to see live status updates." />

      <form onSubmit={submit} className="glass-strong rounded-3xl p-3 flex items-center gap-2 max-w-2xl mx-auto">
        <div className="flex items-center gap-3 flex-1 px-4">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="e.g. OBM-10293"
            className="flex-1 bg-transparent py-3 text-sm focus:outline-none"
          />
        </div>
        <button type="submit" className="rounded-full bg-foreground text-background px-6 py-3 text-sm font-semibold hover:opacity-90 transition">
          Track
        </button>
      </form>

      {result && (
        <div className="mt-10 glass-strong rounded-3xl p-8 animate-fade-up">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Order</p>
              <h3 className="font-display text-2xl font-bold">{result.id}</h3>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Estimated delivery</p>
              <p className="font-semibold">{result.eta}</p>
              <p className="text-xs text-muted-foreground">via {result.carrier}</p>
            </div>
          </div>

          <ol className="relative space-y-6 ml-2">
            {result.steps.map((s, i) => (
              <li key={i} className="flex items-start gap-4 relative">
                {i < result.steps.length - 1 && (
                  <span className={`absolute left-5 top-10 bottom-[-1.5rem] w-px ${s.done ? "bg-primary" : "bg-glass-border"}`} />
                )}
                <span className={`grid h-10 w-10 place-items-center rounded-full shrink-0 ${s.done ? "bg-[var(--gradient-primary)] text-primary-foreground" : "glass text-muted-foreground"} ${s.current ? "ring-2 ring-primary ring-offset-2 ring-offset-background animate-pulse" : ""}`}>
                  <s.icon className="h-5 w-5" />
                </span>
                <div className="pt-1.5">
                  <p className={`font-semibold ${s.done ? "" : "text-muted-foreground"}`}>{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.date}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 pt-6 border-t border-glass-border text-sm text-muted-foreground">
            Need help? Call <a href="tel:+233203662465" className="text-foreground font-semibold">0203662465</a> or <a href="tel:+233553306538" className="text-foreground font-semibold">0553306538</a>.
          </div>
        </div>
      )}
    </div>
  );
}
