import { SectionHeader } from "@/routes/index";

const ROW_ONE = [
  "Apple", "Samsung", "Dell", "HP", "Lenovo", "Sony", "LG", "Hisense", "TCL", "Microsoft",
  "Asus", "Acer", "Huawei", "Xiaomi", "Google",
];

const ROW_TWO = [
  "Nike", "Adidas", "Puma", "Philips", "Panasonic", "Bosch", "Whirlpool", "Canon", "Nikon",
  "JBL", "Bose", "Beats", "Under Armour", "Reebok", "GoPro",
];

function Logo({ name }: { name: string }) {
  return (
    <div className="mx-3 md:mx-5 shrink-0 grid place-items-center h-16 md:h-20 px-6 md:px-8 rounded-2xl glass border border-glass-border min-w-[140px] md:min-w-[180px] transition-all duration-300 hover:scale-105 hover:opacity-100 opacity-70 hover:border-primary/40">
      <span className="font-display text-lg md:text-2xl font-bold tracking-tight whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  // Duplicate for seamless loop
  const list = [...items, ...items];
  return (
    <div className="brands-marquee group relative overflow-hidden">
      <div
        className="flex w-max"
        style={{
          animation: `brands-scroll 40s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {list.map((name, i) => (
          <Logo key={`${name}-${i}`} name={name} />
        ))}
      </div>
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}

export function BrandsMarquee() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 py-16">
      <SectionHeader
        eyebrow="Trusted Partners"
        title="Brands We Sell"
        subtitle="From global tech giants to iconic lifestyle names — shop the brands you love."
      />
      <div className="space-y-5">
        <Row items={ROW_ONE} />
        <Row items={ROW_TWO} reverse />
      </div>
      <style>{`
        @keyframes brands-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .brands-marquee:hover > div:first-child {
          animation-play-state: paused !important;
        }
      `}</style>
    </section>
  );
}
