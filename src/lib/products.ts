import headphones from "@/assets/p-headphones.jpg";
import watch from "@/assets/p-watch.jpg";
import phone from "@/assets/p-phone.jpg";
import sneakers from "@/assets/p-sneakers.jpg";
import backpack from "@/assets/p-backpack.jpg";
import sunglasses from "@/assets/p-sunglasses.jpg";
import laptop from "@/assets/p-laptop.jpg";
import earbuds from "@/assets/p-earbuds.jpg";
import lamp from "@/assets/p-lamp.jpg";
import wallet from "@/assets/p-wallet.jpg";
import jacket from "@/assets/p-jacket.jpg";
import mouse from "@/assets/p-mouse.jpg";
import keyboard from "@/assets/p-keyboard.jpg";
import speaker from "@/assets/p-speaker.jpg";
import tablet from "@/assets/p-tablet.jpg";
import drone from "@/assets/p-drone.jpg";
import jeans from "@/assets/p-jeans.jpg";
import tshirt from "@/assets/p-tshirt.jpg";
import perfume from "@/assets/p-perfume.jpg";
import skincare from "@/assets/p-skincare.jpg";
import coffeemaker from "@/assets/p-coffeemaker.jpg";
import pillow from "@/assets/p-pillow.jpg";
import beltwatch from "@/assets/p-belt.jpg";

export type ProductStatus = "in-stock" | "waiting" | "pre-order";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
  images: string[];
  description: string;
  status: ProductStatus;
  rating: number;
  reviews: number;
}

export const CATEGORIES = [
  { slug: "gadgets", name: "Gadgets", emoji: "📱" },
  { slug: "fashion", name: "Fashion", emoji: "👕" },
  { slug: "electronics", name: "Electronics", emoji: "💻" },
  { slug: "accessories", name: "Accessories", emoji: "👜" },
  { slug: "home", name: "Home", emoji: "🏠" },
  { slug: "beauty", name: "Beauty", emoji: "✨" },
];

export const SHIPPING_OPTIONS = [
  { id: "air", label: "Air Shipping", days: "15 days", icon: "✈️", cost: 45 },
  { id: "sea", label: "Sea Shipping", days: "45–60 days", icon: "🚢", cost: 18 },
] as const;

export const PRODUCTS: Product[] = [
  {
    id: "1", slug: "aurora-pro-headphones", name: "Aurora Pro Headphones",
    category: "gadgets", price: 299, image: headphones, images: [headphones],
    description: "Studio-grade wireless headphones with adaptive ANC, 40h battery and spatial audio.",
    status: "in-stock", rating: 4.8, reviews: 1284,
  },
  {
    id: "2", slug: "halo-smartwatch-x", name: "Halo Smartwatch X",
    category: "gadgets", price: 349, image: watch, images: [watch],
    description: "Always-on AMOLED display, ECG, GPS and 7-day battery in a titanium case.",
    status: "pre-order", rating: 4.7, reviews: 642,
  },
  {
    id: "3", slug: "nova-edge-phone", name: "Nova Edge Phone",
    category: "electronics", price: 899, image: phone, images: [phone],
    description: "Flagship 6.7\" OLED, triple-lens 50MP camera and pro-grade neural chip.",
    status: "waiting", rating: 4.9, reviews: 2104,
  },
  {
    id: "4", slug: "cloud-runner-sneakers", name: "Cloud Runner Sneakers",
    category: "fashion", price: 159, image: sneakers, images: [sneakers],
    description: "Premium leather low-tops with cloud-foam sole. Engineered for everyday comfort.",
    status: "in-stock", rating: 4.6, reviews: 521,
  },
  {
    id: "5", slug: "atlas-leather-backpack", name: "Atlas Leather Backpack",
    category: "accessories", price: 219, image: backpack, images: [backpack],
    description: "Full-grain leather backpack with padded laptop sleeve and lifetime hardware.",
    status: "in-stock", rating: 4.7, reviews: 318,
  },
  {
    id: "6", slug: "solstice-aviators", name: "Solstice Aviators",
    category: "accessories", price: 129, image: sunglasses, images: [sunglasses],
    description: "Polarized aviators with featherweight gold-tone titanium frame.",
    status: "pre-order", rating: 4.5, reviews: 209,
  },
  {
    id: "7", slug: "prism-laptop-15", name: "Prism Laptop 15",
    category: "electronics", price: 1599, image: laptop, images: [laptop],
    description: "15\" Liquid Retina, M-class chip, 18h battery and silent thermal design.",
    status: "in-stock", rating: 4.9, reviews: 942,
  },
  {
    id: "8", slug: "echo-buds-mini", name: "Echo Buds Mini",
    category: "gadgets", price: 149, image: earbuds, images: [earbuds],
    description: "Tiny earbuds with custom-tuned drivers and 30h total playback.",
    status: "in-stock", rating: 4.6, reviews: 1873,
  },
  {
    id: "9", slug: "lumen-desk-lamp", name: "Lumen Desk Lamp",
    category: "home", price: 89, image: lamp, images: [lamp],
    description: "Warm-tone LED desk lamp with touch dimming and USB-C charging base.",
    status: "waiting", rating: 4.4, reviews: 156,
  },
  {
    id: "10", slug: "noble-bifold-wallet", name: "Noble Bifold Wallet",
    category: "accessories", price: 79, image: wallet, images: [wallet],
    description: "Slim full-grain leather bifold with RFID protection and 8 card slots.",
    status: "in-stock", rating: 4.8, reviews: 412,
  },
  {
    id: "11", slug: "drift-canvas-jacket", name: "Drift Canvas Jacket",
    category: "fashion", price: 189, image: jacket, images: [jacket],
    description: "Heritage-cut canvas jacket with brushed-cotton lining and copper rivets.",
    status: "pre-order", rating: 4.6, reviews: 287,
  },
  {
    id: "12", slug: "halo-smartwatch-classic", name: "Halo Smartwatch Classic",
    category: "gadgets", price: 249, image: watch, images: [watch],
    description: "The classic Halo experience in a smaller, lighter case.",
    status: "in-stock", rating: 4.5, reviews: 731,
  },
  {
    id: "13", slug: "vortex-rgb-gaming-mouse", name: "Vortex RGB Gaming Mouse",
    category: "gadgets", price: 89, image: mouse, images: [mouse],
    description: "Ultra-light wireless gaming mouse with 26K DPI sensor and customizable RGB.",
    status: "in-stock", rating: 4.7, reviews: 612,
  },
  {
    id: "14", slug: "keystroke-mech-keyboard", name: "Keystroke Mech Keyboard",
    category: "gadgets", price: 179, image: keyboard, images: [keyboard],
    description: "65% hot-swappable mechanical keyboard with per-key RGB and wireless mode.",
    status: "in-stock", rating: 4.8, reviews: 488,
  },
  {
    id: "15", slug: "pulse-portable-speaker", name: "Pulse Portable Speaker",
    category: "gadgets", price: 139, image: speaker, images: [speaker],
    description: "360° room-filling sound with 24-hour battery and IPX7 waterproof body.",
    status: "in-stock", rating: 4.6, reviews: 854,
  },
  {
    id: "16", slug: "slate-pro-tablet", name: "Slate Pro Tablet",
    category: "electronics", price: 699, image: tablet, images: [tablet],
    description: "11\" Liquid display tablet with stylus support and all-day battery life.",
    status: "pre-order", rating: 4.7, reviews: 376,
  },
  {
    id: "17", slug: "skyline-camera-drone", name: "Skyline Camera Drone",
    category: "electronics", price: 1299, image: drone, images: [drone],
    description: "4K HDR aerial drone with 3-axis gimbal, obstacle sensing and 35-min flight.",
    status: "waiting", rating: 4.8, reviews: 263,
  },
  {
    id: "18", slug: "indigo-slim-jeans", name: "Indigo Slim Jeans",
    category: "fashion", price: 119, image: jeans, images: [jeans],
    description: "Premium stretch denim with a clean indigo wash and tailored slim fit.",
    status: "in-stock", rating: 4.5, reviews: 392,
  },
  {
    id: "19", slug: "essential-cotton-tee", name: "Essential Cotton Tee",
    category: "fashion", price: 39, image: tshirt, images: [tshirt],
    description: "Heavyweight pima cotton t-shirt with a relaxed crew-neck cut.",
    status: "in-stock", rating: 4.6, reviews: 1042,
  },
  {
    id: "20", slug: "noir-eau-de-parfum", name: "Noir Eau de Parfum",
    category: "beauty", price: 149, image: perfume, images: [perfume],
    description: "Warm amber and oud fragrance with notes of bergamot and vanilla, 100ml.",
    status: "in-stock", rating: 4.8, reviews: 568,
  },
  {
    id: "21", slug: "glow-hydrating-cream", name: "Glow Hydrating Cream",
    category: "beauty", price: 69, image: skincare, images: [skincare],
    description: "72-hour moisture lock with hyaluronic acid and niacinamide for radiant skin.",
    status: "in-stock", rating: 4.7, reviews: 1296,
  },
  {
    id: "22", slug: "brewmaster-coffee-machine", name: "Brewmaster Coffee Machine",
    category: "home", price: 349, image: coffeemaker, images: [coffeemaker],
    description: "Programmable drip coffee maker with thermal carafe and built-in grinder.",
    status: "in-stock", rating: 4.6, reviews: 487,
  },
  {
    id: "23", slug: "marigold-throw-pillow-set", name: "Marigold Throw Pillow Set",
    category: "home", price: 59, image: pillow, images: [pillow],
    description: "Set of 3 hand-embroidered cotton throw pillows in warm sun-toned patterns.",
    status: "in-stock", rating: 4.5, reviews: 213,
  },
  {
    id: "24", slug: "ravena-chrono-watch", name: "Ravena Chrono Watch",
    category: "accessories", price: 269, image: beltwatch, images: [beltwatch],
    description: "Stainless chronograph with sapphire crystal and full-grain leather strap.",
    status: "pre-order", rating: 4.7, reviews: 184,
  },
];

export const getProduct = (slug: string) => PRODUCTS.find(p => p.slug === slug);

export const STATUS_META: Record<ProductStatus, { label: string; color: string }> = {
  "in-stock":   { label: "In Stock",       color: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30" },
  "waiting":    { label: "Restocking Soon", color: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30" },
  "pre-order":  { label: "Pre-Order",      color: "bg-primary/15 text-primary border-primary/30" },
};
