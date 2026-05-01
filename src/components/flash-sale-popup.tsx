import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap } from "lucide-react";

const STORAGE_KEY = "obotanmall-flash-dismissed";
const FLASH_END = Date.now() + 1000 * 60 * 60 * 6; // 6h from load

export function FlashSalePopup() {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissedAt = Number(localStorage.getItem(STORAGE_KEY) || 0);
    // re-show after 1 hour
    if (Date.now() - dismissedAt > 1000 * 60 * 60) {
      const t = setTimeout(() => setOpen(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const tick = () => {
      const diff = Math.max(0, FLASH_END - Date.now());
      setTime({
        h: Math.floor(diff / 3.6e6),
        m: Math.floor((diff % 3.6e6) / 6e4),
        s: Math.floor((diff % 6e4) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [open]);

  const close = () => {
    setOpen(false);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, String(Date.now()));
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] grid place-items-center px-4"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md glass-strong rounded-3xl p-8 text-center shadow-glow overflow-hidden"
          >
            <div className="absolute inset-0 -z-10 aurora-bg opacity-60" />
            <button
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-full glass hover:bg-foreground/10 transition"
            >
              <X className="h-4 w-4" />
            </button>

            <motion.div
              animate={{ rotate: [0, -8, 8, -8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1 }}
              className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[var(--gradient-primary)] text-primary-foreground shadow-glow"
            >
              <Zap className="h-8 w-8 fill-current" />
            </motion.div>

            <p className="mt-5 text-xs uppercase tracking-[0.25em] text-primary font-bold">⚡ Flash Sale ⚡</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight">
              Up to <span className="gradient-text">50% OFF</span>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Limited-time deals across gadgets, fashion & electronics. Hurry — ends soon!
            </p>

            <div className="mt-5 flex justify-center gap-2">
              {[
                { v: time.h, l: "Hrs" },
                { v: time.m, l: "Min" },
                { v: time.s, l: "Sec" },
              ].map((t) => (
                <div key={t.l} className="glass rounded-2xl px-4 py-2.5 min-w-[64px]">
                  <div className="font-display text-2xl font-bold tabular-nums">{String(t.v).padStart(2, "0")}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t.l}</div>
                </div>
              ))}
            </div>

            <Link
              to="/shop"
              onClick={close}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-7 py-3.5 text-sm font-semibold shadow-glow hover:scale-[1.03] transition w-full"
            >
              Shop the sale →
            </Link>
            <button onClick={close} className="mt-3 text-xs text-muted-foreground hover:text-foreground">
              No thanks, maybe later
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
