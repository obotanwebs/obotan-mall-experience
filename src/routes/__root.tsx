import { Outlet, Link, createRootRoute } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { FlashSalePopup } from "@/components/flash-sale-popup";

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10 aurora-bg opacity-50" />
      <div className="glass-strong rounded-3xl p-12 text-center max-w-md">
        <h1 className="font-display text-7xl font-bold gradient-text">404</h1>
        <h2 className="mt-3 text-xl font-semibold">Lost in the mall</h2>
        <p className="mt-2 text-sm text-muted-foreground">This page wandered off. Let's get you home.</p>
        <Link to="/" className="mt-6 inline-flex items-center justify-center rounded-full bg-foreground text-background px-6 py-2.5 text-sm font-semibold hover:opacity-90 transition">
          Back home
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "OBOTANMALL — Everything You Need, All in One Place" },
      { name: "description", content: "Premium online mall for gadgets, fashion, electronics, accessories and more. Pre-order, in-stock, and waiting items with worldwide shipping." },
      { property: "og:title", content: "OBOTANMALL — Everything You Need, All in One Place" },
      { property: "og:description", content: "Premium online mall for gadgets, fashion, electronics, accessories and more. Pre-order, in-stock, and waiting items with worldwide shipping." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "OBOTANMALL — Everything You Need, All in One Place" },
      { name: "twitter:description", content: "Premium online mall for gadgets, fashion, electronics, accessories and more. Pre-order, in-stock, and waiting items with worldwide shipping." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/7cb6f2d4-590e-4175-91f6-1e54b63b532b" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/7cb6f2d4-590e-4175-91f6-1e54b63b532b" },
    ],
    links: [{ rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen flex flex-col">
        <div className="pointer-events-none fixed inset-0 -z-10 aurora-bg opacity-40" />
        <Navbar />
        <main className="flex-1"><Outlet /></main>
        <Footer />
        <Toaster position="top-center" />
        <FlashSalePopup />
      </div>
    </ThemeProvider>
  );
}
