import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";
import logo from "@/assets/logo.jpeg";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-glass-border">
      <div className="absolute inset-0 -z-10 aurora-bg opacity-30" />
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid h-10 w-10 place-items-center rounded-xl overflow-hidden bg-black"><img src={logo} alt="OBOTANMALL logo" className="h-full w-full object-cover" /></span>
            OBOTANMALL
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            Everything you need, all in one place. A premium digital mall built for what's next.
          </p>
          <div className="mt-4 space-y-1 text-sm text-muted-foreground">
            <p className="flex items-start font-bold gap-1">📍 <span>Ashongman Estate, Last Stop, Greater Accra, Ghana</span></p>
            <a href="tel:+233203662465" className="block hover:text-foreground transition font-bold">📞 0203 662 465</a>
            <a href="tel:+233553306538" className="block hover:text-foreground transition font-bold">📞 0553 306 538</a>
          </div>
          <div className="mt-5 flex gap-2">
            {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="grid h-10 w-10 place-items-center rounded-full glass hover:scale-105 transition" aria-label="social">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <FooterCol title="Shop" links={[["All Products","/shop"],["Categories","/categories"],["New Arrivals","/shop"],["Pre-order","/shop"]]} />
        <FooterCol title="Support" links={[["Contact","/contact"],["FAQ","/faq"],["Track Order","/track"],["Shipping","/about"],["Returns","/about"]]} />
        <FooterCol title="Company" links={[["About","/about"],["Careers","/about"],["Privacy","/about"],["Terms","/about"]]} />
      </div>
      <div className="border-t border-glass-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} OBOTANMALL. Crafted with care.
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="font-semibold text-sm mb-4">{title}</h4>
      <ul className="space-y-2.5 text-sm text-muted-foreground">
        {links.map(([label, to]) => (
          <li key={label}><Link to={to} className="hover:text-foreground transition">{label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
