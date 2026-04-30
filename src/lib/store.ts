import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./products";

export interface CartItem {
  product: Product;
  qty: number;
  shipping?: "air" | "sea";
}

interface CartState {
  items: CartItem[];
  add: (product: Product, opts?: { shipping?: "air" | "sea"; qty?: number }) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  setShipping: (id: string, shipping: "air" | "sea") => void;
  clear: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (product, opts) =>
        set((s) => {
          const existing = s.items.find((i) => i.product.id === product.id);
          if (existing) {
            return { items: s.items.map((i) => i.product.id === product.id ? { ...i, qty: i.qty + (opts?.qty ?? 1) } : i) };
          }
          return { items: [...s.items, { product, qty: opts?.qty ?? 1, shipping: opts?.shipping }] };
        }),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.product.id !== id) })),
      setQty: (id, qty) => set((s) => ({ items: s.items.map((i) => i.product.id === id ? { ...i, qty: Math.max(1, qty) } : i) })),
      setShipping: (id, shipping) => set((s) => ({ items: s.items.map((i) => i.product.id === id ? { ...i, shipping } : i) })),
      clear: () => set({ items: [] }),
    }),
    { name: "obotanmall-cart" }
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
