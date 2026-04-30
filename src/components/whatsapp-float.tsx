import { MessageCircle } from "lucide-react";

export function WhatsAppFloat({ phone = "233203662465", message = "Hello OBOTANMALL, I have a question." }: { phone?: string; message?: string }) {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping" />
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-glow hover:scale-110 transition-transform">
        <MessageCircle className="h-7 w-7" fill="white" />
      </span>
      <span className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-foreground text-background px-4 py-2 text-xs font-semibold opacity-0 group-hover:opacity-100 transition pointer-events-none">
        Chat with us
      </span>
    </a>
  );
}
