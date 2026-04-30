import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SectionHeader } from "./index";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — OBOTANMALL" },
      { name: "description", content: "Get in touch with the OBOTANMALL team." },
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
          {[
            { icon: Mail, title: "Email", value: "hello@obotanmall.com" },
            { icon: MessageCircle, title: "Live chat", value: "9am — 9pm GMT" },
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
