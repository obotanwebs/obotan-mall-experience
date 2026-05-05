import { Link, useRouterState } from "@tanstack/react-router";
import { Search, ShoppingBag, Heart, Sun, Moon, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart, useWishlist, useTheme } from "@/lib/store";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/track", label: "Track" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const path = useRouterState({ select: (r) => r.location.pathname });
  const itemCount = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));
  const wishCount = useWishlist((s) => s.ids.length);
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="absolute inset-x-0 top-0 h-full bg-background/40 backdrop-blur-xl border-b border-glass-border" />
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--gradient-primary)] text-primary-foreground shadow-glow">
            O
          </span>
          <span className="hidden sm:block">OBOTANMALL</span>
        </Link>

        <div className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-1.5">
          {NAV.map((n) => {
            const active = n.to === "/" ? path === "/" : path.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${active ? "bg-foreground text-background" : "hover:bg-foreground/10"}`}
              >
                {n.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-1">
          <Link to="/shop" className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-foreground/10 transition" aria-label="Search">
            <Search className="h-5 w-5" />
          </Link>
          <button onClick={toggle} aria-label="Toggle theme" className="h-10 w-10 rounded-full hover:bg-foreground/10 transition grid place-items-center">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <Link to="/wishlist" className="relative h-10 w-10 rounded-full hover:bg-foreground/10 transition grid place-items-center" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
            {wishCount > 0 && <span className="absolute -top-0.5 -right-0.5 grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">{wishCount}</span>}
          </Link>
          <Link to="/cart" className="relative h-10 w-10 rounded-full hover:bg-foreground/10 transition grid place-items-center" aria-label="Cart">
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && <span className="absolute -top-0.5 -right-0.5 grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">{itemCount}</span>}
          </Link>
          <button onClick={() => setOpen((o) => !o)} className="md:hidden h-10 w-10 rounded-full hover:bg-foreground/10 grid place-items-center" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden relative glass-strong mx-4 mb-3 rounded-2xl p-3 animate-fade-up">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium hover:bg-foreground/10">
              {n.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
