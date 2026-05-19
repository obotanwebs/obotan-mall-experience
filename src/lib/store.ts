import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./products";

export interface CartItem {
  key: string;                                // unique per product+variant combo
  product: Product;
  qty: number;
  shipping?: "air" | "sea";
  variants?: Record<string, string>;          // selected variant values
  unitPrice: number;                          // resolved price (incl. variant deltas)
}

function variantSig(variants?: Record<string, string>) {
  if (!variants) return "";
  return Object.keys(variants).sort().map((k) => `${k}:${variants[k]}`).join("|");
}

interface CartState {
  items: CartItem[];
  add: (
    product: Product,
    opts?: { shipping?: "air" | "sea"; qty?: number; variants?: Record<string, string>; unitPrice?: number }
  ) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  setShipping: (key: string, shipping: "air" | "sea") => void;
  clear: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (product, opts) =>
        set((s) => {
          const key = `${product.id}::${variantSig(opts?.variants)}`;
          const unitPrice = product.price;
          const existing = s.items.find((i) => i.key === key);
          if (existing) {
            return { items: s.items.map((i) => i.key === key ? { ...i, qty: i.qty + (opts?.qty ?? 1) } : i) };
          }
          return {
            items: [...s.items, {
              key, product, qty: opts?.qty ?? 1,
              shipping: opts?.shipping, variants: opts?.variants, unitPrice,
            }],
          };
        }),
      remove: (key) => set((s) => ({ items: s.items.filter((i) => i.key !== key) })),
      setQty: (key, qty) => set((s) => ({ items: s.items.map((i) => i.key === key ? { ...i, qty: Math.max(1, qty) } : i) })),
      setShipping: (key, shipping) => set((s) => ({ items: s.items.map((i) => i.key === key ? { ...i, shipping } : i) })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "obotanmall-cart",
      version: 2,
      migrate: (persisted: any) => {
        if (!persisted?.items) return persisted;
        persisted.items = persisted.items.map((i: any) => ({
          key: i.key ?? `${i.product.id}::`,
          product: i.product,
          qty: i.qty,
          shipping: i.shipping,
          variants: i.variants,
          unitPrice: i.unitPrice ?? i.product.price,
        }));
        return persisted;
      },
    }
  )
);

interface WishState {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
}

export const useWishlist = create<WishState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) => set((s) => ({ ids: s.ids.includes(id) ? s.ids.filter((x) => x !== id) : [...s.ids, id] })),
      has: (id) => get().ids.includes(id),
    }),
    { name: "obotanmall-wishlist" }
  )
);

type Theme = "light" | "dark";
interface ThemeState { theme: Theme; toggle: () => void; set: (t: Theme) => void }
export const useTheme = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "dark",
      toggle: () => set((s) => ({ theme: s.theme === "dark" ? "light" : "dark" })),
      set: (theme) => set({ theme }),
    }),
    { name: "obotanmall-theme" }
  )
);
