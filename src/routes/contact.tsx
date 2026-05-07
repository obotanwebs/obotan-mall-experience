import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { useState } from "react";
import { toast } from "sonner";
import { SectionHeader } from "./index";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { GoogleMap } from "@/components/google-map";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — OBOTANMALL" },
      { name: "description", content: "Get in touch with the OBOTANMALL team by phone, WhatsApp, or email." },
      { property: "og:title", content: "Contact OBOTANMALL" },
      { property: "og:description", content: "Reach us on WhatsApp, by phone, or by email." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email.includes("@") || form.message.length < 5) return toast.error("Please fill all fields");
    toast.success("Message sent! We'll get back within 24h.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-8 py-12">
      <SectionHeader eyebrow="Reach out" title="We'd love to hear from you" subtitle="Questions, partnerships, press — we reply to everything." />
      <div className="grid lg:grid-cols-[1fr_1fr] gap-8">
        <div className="space-y-4">
          <div className="glass-strong rounded-3xl p-6 flex items-start gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#25D366] text-white"><WhatsAppIcon className="h-6 w-6" /></div>
            <div>
              <h3 className="font-display font-bold">WhatsApp</h3>
              <a href="https://wa.me/233203662465" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition block">+233 20 366 2465</a>
              <a href="https://wa.me/233553306538" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition block">+233 55 330 6538</a>
            </div>
          </div>

          <div className="glass-strong rounded-3xl p-6 flex items-start gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--gradient-primary)] text-primary-foreground"><Phone className="h-5 w-5" /></div>
            <div>
              <h3 className="font-display font-bold">Phone</h3>
              <a href="tel:+233203662465" className="text-sm text-muted-foreground hover:text-foreground transition block">0203 662 465</a>
              <a href="tel:+233553306538" className="text-sm text-muted-foreground hover:text-foreground transition block">0553 306 538</a>
            </div>
          </div>

          {[
            { icon: Mail, title: "Email", value: "hello@obotanmall.com" },
            { icon: MapPin, title: "HQ", value: "Lagos · London · Singapore" },
          ].map((c) => (
            <div key={c.title} className="glass-strong rounded-3xl p-6 flex items-start gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--gradient-primary)] text-primary-foreground"><c.icon className="h-5 w-5" /></div>
              <div><h3 className="font-display font-bold">{c.title}</h3><p className="text-sm text-muted-foreground">{c.value}</p></div>
            </div>
          ))}
        </div>

        <form onSubmit={submit} className="glass-strong rounded-3xl p-8 space-y-4">
          <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
          <label className="block">
            <span className="text-xs font-medium text-muted-foreground">Message</span>
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5}
              className="mt-1.5 w-full rounded-2xl bg-background/40 border border-glass-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
          </label>
          <button type="submit" className="w-full rounded-full bg-foreground text-background px-7 py-3.5 text-sm font-semibold shadow-glow hover:scale-[1.02] transition">Send message</button>
        </form>
      </div>

      <WhatsAppFloat />
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-1.5 w-full rounded-xl bg-background/40 border border-glass-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
    </label>
  );
}
