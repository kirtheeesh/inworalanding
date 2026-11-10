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

export const PRODUCT_BANNER_MAP: Record<string, string> = {
  "pos-kot": "/assets/projects/pos-kot.jpg",
  "pos-kot-software": "/assets/projects/pos-kot.jpg",
  "unified-business-erp": "/assets/projects/unified-business-erp.jpg",
  "gold-application": "/assets/projects/gold-poster.jpg",
  "inwora-daily-gold": "/assets/projects/gold-poster.jpg",
  "gold-poster": "/assets/projects/gold-poster.jpg",
  "construction-erp": "/assets/projects/construction-crm.jpg",
  "construction-management": "/assets/projects/construction-crm.jpg",
  "factory-management": "/assets/projects/factory-automation.jpg",
  "factory-automation": "/assets/projects/factory-automation.jpg",
};

export function getProductBanner(product: Product | null | undefined): string {
  if (!product) return "/assets/projects/pos-kot.jpg";
  if (product.banners && product.banners.length > 0 && product.banners[0]?.trim()) {
    return product.banners[0];
  }
  if (product.image?.trim()) {
    return product.image;
  }
  return PRODUCT_BANNER_MAP[product.id] || "/assets/projects/pos-kot.jpg";
}

export function getProductBanners(product: Product | null | undefined): string[] {
  if (!product) return ["/assets/projects/pos-kot.jpg"];
  const valid = (product.banners || []).filter((b) => Boolean(b && b.trim() !== ""));
  if (valid.length > 0) return valid;
  const b = getProductBanner(product);
  return [b];
}

/**
 * Static copy of the five products. Used as an instant fallback for the Hero
 * panel (above the fold) so it never renders empty while /api/products loads,
 * and if the API is unreachable.
 */
type FallbackProductSeed = Omit<Product, "banners" | "videoType" | "videoUrl" | "videoFileUrl"> & {
  overview?: string;
  banners?: string[];
};

const FALLBACK_PRODUCT_SEEDS: FallbackProductSeed[] = [
  {
    id: "inwora-daily-gold",
    title: "Inwora Daily Gold",
    subtitle: "Gold-rate poster & daily creatives app",
    badge: "Poster Automation",
    tagline: "Gold-rate posters & daily creatives",
    desc: "A mobile app & subscription platform for creating gold & silver rate posters and promotional graphics for jewelry brands.",
    overview: "Specialized mobile app and subscription platform for premier jewelry showrooms. Automatically synchronizes live gold and silver market bullion rates onto high-resolution luxury promotional templates and social media creatives. Showroom owners can generate daily branded posters in one tap, export directly to WhatsApp Status and Instagram, and access ready-to-post creatives — eliminating manual graphic design overhead.",
    icon: "Image",
    image: "/assets/projects/gold-poster.jpg",
    banners: [
      "/assets/projects/gold-poster.jpg",
      "/assets/projects/gold-poster-slide2.jpg",
      "/assets/projects/gold-poster-slide3.jpg",
    ],
    liveUrl: "https://gold.inwora.com",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.kirtheeshh.usermobile&pli=1",
    featured: false,
    features: [
      "Official Android app on Google Play",
      "Automated gold & silver daily market rate sync",
      "Luxury branded showroom poster templates",
      "One-click WhatsApp Status & Instagram export",
    ],
  },
  {
    id: "pos-kot-software",
    title: "POS & KOT",
    subtitle: "Restaurants, billing & kitchen order workflows",
    badge: "Restaurant SaaS",
    tagline: "Fast restaurant billing & kitchen orders",
    desc: "A live SaaS subscription POS & Kitchen Order Ticket system for restaurants, cafes, food trucks, and retail counters. Cloud-synchronized billing with live table layout and kitchen display routing.",
    overview: "High-speed point-of-sale and kitchen order ticket (KOT) system for restaurants, cafes, quick-service counters, and multi-branch retail outlets. Cloud-synchronized billing with live table layout management, kitchen display routing, split bills, and daily sales auditing.",
    icon: "Monitor",
    image: "/assets/projects/pos-kot.jpg",
    banners: [
      "/assets/projects/pos-kot.jpg",
      "/assets/projects/pos-kot-slide2.jpg",
      "/assets/projects/pos-kot-slide3.jpg",
    ],
    liveUrl: null,
    playStoreUrl: null,
    featured: true,
    features: [
      "Real-time Kitchen Order Ticket (KOT) routing",
      "High-speed billing & multi-counter support",
      "Table layout & takeaway order management",
      "Live daily sales, revenue & item analytics",
    ],
  },
  {
    id: "unified-business-erp",
    title: "Unified Business ERP",
    subtitle: "Integrated finance, inventory, sales & HR operations",
    badge: "Enterprise ERP",
    tagline: "Unified operations, multi-warehouse & GST workflows",
    desc: "All-in-one cloud ERP system engineered to unify multi-channel sales billing, warehouse inventory, GST accounting, customer workflows, and staff management into a single centralized command center.",
    overview: "Unified Business ERP is an enterprise-grade cloud resource planning platform engineered for manufacturing, wholesale, distribution, and multi-branch retail enterprises. It brings together double-entry financial accounting, multi-warehouse inventory tracking, automated GST-compliant invoicing, purchase order approvals, and workforce permissions into one intuitive command center. Say goodbye to fragmented spreadsheets and disparate software—Unified Business ERP eliminates data silos, cuts administrative overhead by up to 60%, and delivers real-time visibility into your cash flow, stock valuations, and departmental productivity.",
    icon: "Boxes",
    image: "/assets/projects/unified-business-erp.jpg",
    banners: [
      "/assets/projects/unified-business-erp.jpg",
      "/assets/projects/unified-business-erp-slide2.jpg",
      "/assets/projects/unified-business-erp-slide3.jpg",
    ],
    liveUrl: null,
    playStoreUrl: null,
    featured: false,
    features: [
      "Centralized multi-warehouse inventory & batch tracking",
      "Automated GST-compliant billing & tax reconciliation",
      "Order-to-cash procurement & purchase approvals",
      "Executive financial balance sheets & sales analytics",
    ],
  },
  {
    id: "construction-management",
    title: "Construction Management",
    subtitle: "Site accounts & operations in a single step",
    badge: "Site Operations",
    tagline: "Site accounts & every movement in one step",
    desc: "Manage every construction site account and track each movement from one place. Materials, labour, expenses and progress stay in sync.",
    overview: "End-to-end cloud ERP for construction contractors and infrastructure developers. Centralize site expense accounts, material requisitions, labour muster rolls, and multi-site project milestones into one synchronized ledger.",
    icon: "HardHat",
    image: "/assets/projects/construction-crm.jpg",
    banners: [
      "/assets/projects/construction-crm.jpg",
      "/assets/projects/construction-management-slide2.jpg",
      "/assets/projects/construction-crm.png",
    ],
    liveUrl: "https://construction.inwora.com",
    playStoreUrl: null,
    featured: false,
    features: [
      "Multi-site account & cash movement tracking",
      "Material requisition & site inventory control",
      "Subcontractor billing & daily labour muster logs",
      "Real-time project milestone progress tracking",
    ],
  },
  {
    id: "factory-management",
    title: "Factory Management",
    subtitle: "Raw material to dispatch in one click",
    badge: "Production Ops",
    tagline: "Raw material to packing & dispatch",
    desc: "Record the full production flow — from raw material intake through manufacturing to product packing and final dispatch — in a single click.",
    overview: "Smart industrial production workflow system. Track raw material inventory, batch processing, work-in-progress stages, quality inspection checkpoints, and final dispatch in a single unified workflow.",
    icon: "Factory",
    image: "/assets/projects/factory-automation.jpg",
    banners: [
      "/assets/projects/factory-automation.jpg",
      "/assets/projects/factory-management-slide2.jpg",
      "/assets/projects/factory-automation.png",
    ],
    liveUrl: null,
    playStoreUrl: null,
    featured: false,
    features: [
      "Raw material inventory & batch tracking",
      "Multi-stage production & packing workflow",
      "Quality check inspection logging",
      "One-click dispatch & gate pass generation",
    ],
  },
];

export const FALLBACK_PRODUCTS: Product[] = FALLBACK_PRODUCT_SEEDS.map((p) => {
  const primaryBanner = p.image || PRODUCT_BANNER_MAP[p.id] || "/assets/projects/pos-kot.jpg";
  return {
    ...p,
    overview: p.overview ?? p.desc,
    image: primaryBanner,
    banners: p.banners && p.banners.length > 0 ? p.banners : [primaryBanner],
    videoType: null,
    videoUrl: null,
    videoFileUrl: null,
  };
});
