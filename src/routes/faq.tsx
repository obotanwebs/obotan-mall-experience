import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, ShoppingBag, CreditCard, Truck, RotateCcw, HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { WhatsAppIcon } from "@/components/whatsapp-icon";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — OBOTANMALL Help Center" },
      { name: "description", content: "Answers to common questions about pre-orders, payments, delivery, returns and more at OBOTANMALL." },
      { property: "og:title", content: "FAQ — OBOTANMALL Help Center" },
      { property: "og:description", content: "Answers to common questions about pre-orders, payments, delivery, returns and more at OBOTANMALL." },
    ],
  }),
  component: FaqPage,
});

type QA = { q: string; a: string };
type Section = { id: string; title: string; icon: React.ComponentType<{ className?: string }>; items: QA[] };

const SECTIONS: Section[] = [
  {
    id: "orders",
    title: "Orders & Pre-Orders",
    icon: ShoppingBag,
    items: [
      { q: "What does “Pre-Order” mean?", a: "A pre-order lets you reserve an item before it arrives in stock. You pay (fully or partially) up front and we ship as soon as the product is available." },
      { q: "How long does pre-order delivery take?", a: "Most pre-orders arrive within 2–4 weeks depending on the item and origin country. The expected window is shown on each product page." },
      { q: "Can I cancel a pre-order?", a: "Yes — pre-orders can be cancelled before the item is dispatched from our supplier. Contact us on WhatsApp for a quick cancellation and refund." },
      { q: "How do I track my order?", a: "Use the Track page from the menu and enter your order ID. We also send WhatsApp updates at every major stage." },
      { q: "Will I be notified when my pre-order ships?", a: "Yes. You’ll receive a WhatsApp message with tracking details once your order leaves our warehouse." },
    ],
  },
  {
    id: "payments",
    title: "Payments",
    icon: CreditCard,
    items: [
      { q: "What payment methods do you accept?", a: "We accept Mobile Money (MTN & Telecel), bank transfer, and cash on delivery within selected areas." },
      { q: "Can I pay via Mobile Money?", a: "Absolutely. Mobile Money is our most popular option. Numbers and instructions are shown at checkout." },
      { q: "How do I confirm my payment?", a: "After sending payment, tap the “Confirm Payment on WhatsApp” button at checkout and share your order ID with us." },
      { q: "Is my payment secure?", a: "Yes. We don’t store card details, and Mobile Money payments go directly to our verified merchant numbers." },
      { q: "Do you offer instalment payments on pre-orders?", a: "For selected high-value items we accept a 50% deposit with the balance due before delivery. Ask us on WhatsApp." },
    ],
  },
  {
    id: "delivery",
    title: "Delivery & Shipping",
    icon: Truck,
    items: [
      { q: "Do you deliver nationwide?", a: "Yes — we deliver across all regions in Ghana, with selected international shipping on request." },
      { q: "How long does delivery take?", a: "In-stock items: 1–3 business days within Accra and 2–5 business days nationwide. Pre-orders follow the timeline on the product page." },
      { q: "What happens if I miss my delivery?", a: "Our courier will call you to reschedule. After 3 failed attempts the item is returned to our hub for pickup." },
      { q: "How much is shipping?", a: "Shipping is calculated at checkout based on your location and the size of the order." },
    ],
  },
  {
    id: "returns",
    title: "Returns & Refunds",
    icon: RotateCcw,
    items: [
      { q: "Do you accept returns?", a: "Yes — items can be returned within 7 days of delivery if they are unused, in original packaging, and not marked final sale." },
      { q: "What is your refund policy?", a: "Approved refunds are issued to your original payment method or as store credit, whichever you prefer." },
      { q: "How long do refunds take?", a: "Refunds are processed within 3–7 business days after we receive and inspect the returned item." },
      { q: "Can I exchange an item instead of returning it?", a: "Yes. Exchanges for a different size, colour, or product of equal value are welcome." },
    ],
  },
  {
    id: "general",
    title: "General",
    icon: HelpCircle,
    items: [
      { q: "How can I contact support?", a: "Reach us on WhatsApp at 0203 662 465 or 0553 306 538, or use the Contact page. We typically reply within minutes." },
      { q: "Do you have a physical store?", a: "We currently operate online-first with pickup points in Accra. Locations are shared on WhatsApp once your order is ready." },
      { q: "How do I join your WhatsApp community?", a: "Tap the floating WhatsApp button on any page and message us — we’ll add you to our deals and updates broadcast list." },
      { q: "Are your products original?", a: "Yes — we source from authorised distributors and verified suppliers. Every product is inspected before dispatch." },
    ],
  },
];

const WHATSAPP = "https://wa.me/233203662465?text=" + encodeURIComponent("Hello OBOTANMALL, I have a question.");

function FaqPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SECTIONS;
    return SECTIONS
      .map((s) => ({ ...s, items: s.items.filter((i) => i.q.toLowerCase().includes(q) || i.a.toLowerCase().includes(q)) }))
      .filter((s) => s.items.length > 0);
  }, [query]);

  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 aurora-bg opacity-30" />
      <section className="mx-auto max-w-4xl px-4 md:px-8 pt-16 pb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground">
          Help Center
        </span>
        <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold tracking-tight">
          Frequently Asked <span className="gradient-text">Questions</span>
        </h1>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          Everything you need to know about pre-orders, payments, shipping and returns at OBOTANMALL.
        </p>

        <div className="relative mt-8 max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions..."
            className="w-full rounded-full glass-strong border border-glass-border pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 md:px-8 pb-16 space-y-8">
        {filtered.length === 0 && (
          <div className="glass-strong rounded-3xl p-10 text-center text-muted-foreground">
            No results for “{query}”. Try a different keyword.
          </div>
        )}

        {filtered.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.id} className="glass-strong rounded-3xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--gradient-primary)] text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="font-display text-xl md:text-2xl font-bold">{section.title}</h2>
              </div>
              <Accordion type="single" collapsible className="w-full">
                {section.items.map((item, idx) => (
                  <AccordionItem key={idx} value={`${section.id}-${idx}`} className="border-glass-border data-[state=open]:bg-foreground/5 rounded-xl px-4 my-1 transition-colors">
                    <AccordionTrigger className="text-left font-medium hover:no-underline data-[state=open]:text-primary">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          );
        })}
      </section>

      <section className="mx-auto max-w-4xl px-4 md:px-8 pb-24">
        <div className="relative overflow-hidden rounded-3xl glass-strong p-8 md:p-12 text-center">
          <div className="absolute inset-0 -z-10 bg-[var(--gradient-primary)] opacity-10" />
          <h3 className="font-display text-2xl md:text-3xl font-bold">Still have questions?</h3>
          <p className="mt-2 text-muted-foreground">Our team is one message away on WhatsApp.</p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-6 py-3 text-sm font-semibold hover:scale-[1.02] transition shadow-glow"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Contact us on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
