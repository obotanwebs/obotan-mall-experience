import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ProductImageCarousel({
  images,
  alt,
  badge,
}: {
  images: string[];
  alt: string;
  badge?: React.ReactNode;
}) {
  const [idx, setIdx] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const touchStart = useRef<number | null>(null);
  const list = images.length ? images : [""];

  // Reset when images change (e.g. variant color switch)
  useEffect(() => { setIdx(0); }, [images]);

  const go = (dir: number) => setIdx((i) => (i + dir + list.length) % list.length);

  return (
    <div className="space-y-3">
      <div
        className="relative aspect-square rounded-[2rem] overflow-hidden glass-strong shadow-glass select-none"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
        }}
        onMouseLeave={() => setZoom(null)}
        onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchStart.current == null) return;
          const dx = e.changedTouches[0].clientX - touchStart.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchStart.current = null;
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={list[idx] + idx}
            src={list[idx]}
            alt={alt}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 h-full w-full object-cover"
            style={zoom ? { transformOrigin: `${zoom.x}% ${zoom.y}%`, transform: "scale(1.6)" } : undefined}
            draggable={false}
          />
        </AnimatePresence>

        {badge}

        {list.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full glass-strong hover:scale-105 transition"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full glass-strong hover:scale-105 transition"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {list.map((_, i) => (
                <span key={i} className={`h-1.5 rounded-full transition-all ${i === idx ? "w-6 bg-foreground" : "w-1.5 bg-foreground/40"}`} />
              ))}
            </div>
          </>
        )}
      </div>

      {list.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {list.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-2xl overflow-hidden border-2 transition ${i === idx ? "border-primary" : "border-glass-border hover:border-primary/40"}`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
