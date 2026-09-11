import {
  Image, Monitor, Send, MessageCircle, HardHat, Factory, Store, ShoppingBag,
  Smartphone, Building2, Package, Boxes, Cloud, Cpu, Database, LineChart,
  Rocket, Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * The official INWORA products live in MySQL and are served by the PHP backend
 * (GET /api/products). `icon` is the lucide icon *name* chosen in the admin
 * panel, resolved to a component through `productIconMap` below.
 */
export interface Product {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  tagline: string;
  desc: string;
  /** Fuller description shown in the "Learn more" dialog. Falls back to `desc` server-side. */
  overview: string;
  icon: string;
  /** Cover image — the lowest-priority slide in `banners`. Kept for card thumbnails. */
  image: string;
  /** Full banner slider, ordered by admin-set priority. */
  banners: string[];
  /** A demo video is a YouTube embed OR an uploaded file — never both. */
  videoType?: "youtube" | "upload" | null;
  videoUrl?: string | null;
  videoFileUrl?: string | null;
  liveUrl?: string | null;
  playStoreUrl?: string | null;
  featured: boolean;
  features: string[];
}

/** Must stay in sync with ProductRepository::ICONS in the backend. */
export const productIconMap: Record<string, LucideIcon> = {
  Image, Monitor, Send, MessageCircle, HardHat, Factory, Store, ShoppingBag,
  Smartphone, Building2, Package, Boxes, Cloud, Cpu, Database, LineChart,
  Rocket, Sparkles,
};

export function resolveProductIcon(name: string): LucideIcon {
  return productIconMap[name] ?? Boxes;
}

/**
 * Static copy of the five products. Used as an instant fallback for the Hero
 * panel (above the fold) so it never renders empty while /api/products loads,
 * and if the API is unreachable.
 */
type FallbackProductSeed = Omit<Product, "overview" | "banners" | "videoType" | "videoUrl" | "videoFileUrl">;

const FALLBACK_PRODUCT_SEEDS: FallbackProductSeed[] = [
  {
    id: "inwora-daily-gold",
    title: "Inwora Daily Gold",
    subtitle: "Gold-rate poster & daily creatives app",
    badge: "Poster Automation",
    tagline: "Gold-rate posters & daily creatives",
    desc: "A mobile app & subscription platform for creating gold & silver rate posters and promotional graphics.",
    icon: "Image",
    image: "",
    liveUrl: "https://gold.inwora.com",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.kirtheeshh.usermobile&pli=1",
    featured: false,
    features: [],
  },
  {
    id: "pos-kot-software",
    title: "POS & KOT Software",
    subtitle: "Restaurants, billing & order workflows",
    badge: "Restaurant SaaS",
    tagline: "Restaurant billing & kitchen orders",
    desc: "A live SaaS subscription POS & Kitchen Order Ticket system for restaurants, cafes, and retail counters.",
    icon: "Monitor",
    image: "",
    liveUrl: "https://kot.nexoraapp.in/",
    playStoreUrl: null,
    featured: true,
    features: [],
  },
  {
    id: "whatsapp-crm",
    title: "WhatsApp CRM",
    subtitle: "Scheduled bulk messaging & tag-based campaigns",
    badge: "Marketing CRM",
    tagline: "Scheduled bulk messaging by tag",
    desc: "A CRM built for WhatsApp outreach — send bulk messages on a schedule, segmented by contact tags.",
    icon: "Send",
    image: "",
    liveUrl: null,
    playStoreUrl: null,
    featured: false,
    features: [],
  },
  {
    id: "construction-management",
    title: "Construction Management",
    subtitle: "Site accounts & operations in a single step",
    badge: "Site Operations",
    tagline: "Site accounts & every movement in one step",
    desc: "Manage every construction site account and track each movement from one place.",
    icon: "HardHat",
    image: "",
    liveUrl: "https://construction.inwora.com",
    playStoreUrl: null,
    featured: false,
    features: [],
  },
  {
    id: "factory-management",
    title: "Factory Management",
    subtitle: "Raw material to dispatch in one click",
    badge: "Production Ops",
    tagline: "Raw material to packing & dispatch",
    desc: "Record the full production flow — from raw material intake through manufacturing to packing and dispatch.",
    icon: "Factory",
    image: "",
    liveUrl: null,
    playStoreUrl: null,
    featured: false,
    features: [],
  },
];

export const FALLBACK_PRODUCTS: Product[] = FALLBACK_PRODUCT_SEEDS.map((p) => ({
  ...p,
  overview: p.desc,
  banners: p.image ? [p.image] : [],
  videoType: null,
  videoUrl: null,
  videoFileUrl: null,
}));
