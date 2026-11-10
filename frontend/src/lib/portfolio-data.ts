import {
  Layout, Database, Activity, Code, Compass, HardHat, Globe, GraduationCap,
  Calculator, ShoppingCart, Smartphone, Cloud, Cpu, LineChart, Users, Briefcase,
  Rocket, Boxes, Gem, Utensils, Coffee, Building2, Store, Server,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Portfolio projects live in MySQL and are served by the PHP backend
 * (see backend/api). `icon` is the lucide icon *name* chosen in the admin
 * panel, resolved to a component through `iconMap` below.
 */
export interface Project {
  id: string;
  title: string;
  category: string;
  desc: string;
  fullDesc: string;
  icon: string;
  /** Cover image — the lowest-priority slide in `banners`. Kept for card thumbnails. */
  banner: string;
  /** Full banner slider, ordered by admin-set priority (lowest/highest-priority first). */
  banners: string[];
  /** Phone screenshot images for the mobile view gallery. */
  mobileBanners: string[];
  /** Whether the web banner slider view is enabled. */
  showWebView: boolean;
  /** Whether the mobile phone mockup view is enabled. */
  showMobileView: boolean;
  /** A demo video is a YouTube embed OR an uploaded file — never both. */
  videoType?: "youtube" | "upload" | null;
  videoUrl?: string | null;
  videoFileUrl?: string | null;
  pdfUrl?: string | null;
  liveUrl?: string | null;
  tags: string[];
  features: string[];
}

/** Must stay in sync with ProjectRepository::ICONS in the backend. */
export const iconMap: Record<string, LucideIcon> = {
  Layout, Database, Activity, Code, Compass, HardHat, Globe, GraduationCap,
  Calculator, ShoppingCart, Smartphone, Cloud, Cpu, LineChart, Users, Briefcase,
  Rocket, Boxes, Gem, Utensils, Coffee, Building2, Store, Server,
};

export const FALLBACK_PROJECTS: Project[] = [
  // ── 1. Inwora ERP ──────────────────────────────────────────────────────────
  {
    id: "inwora-erp",
    title: "Inwora ERP",
    category: "Business Software",
    desc: "Centralized enterprise resource planning system streamlining multi-branch inventory tracking, purchase orders, sales billing, role-based staff access, and executive operational reporting.",
    fullDesc:
      "Inwora ERP is a centralized enterprise resource planning platform engineered to unify operations for growing commercial businesses and enterprises. The platform consolidates inventory and stock management, vendor procurement, customer sales records, and role-based staff access controls into a single intuitive interface. Operational dashboards and real-time ledger reporting provide business leaders with complete visibility into supply chain movements, daily sales volume, and multi-location asset allocation.",
    icon: "Briefcase",
    banner: "/assets/projects/inwora-erp.jpg",
    banners: [
      "/assets/projects/inwora-erp.jpg",
      "/assets/projects/inwora-erp-slide2.jpg",
      "/assets/projects/inwora-erp-slide3.jpg",
    ],
    mobileBanners: [],
    showWebView: true,
    showMobileView: false,
    videoType: null,
    videoUrl: null,
    videoFileUrl: null,
    pdfUrl: null,
    liveUrl: "https://erp.inwora.com",
    tags: ["ERP", "Enterprise", "Inventory", "Operations"],
    features: [
      "Multi-branch inventory & warehouse stock management",
      "End-to-end sales, purchase, and customer billing records",
      "Granular role-based staff permissions & audit trails",
      "Executive operational dashboards & real-time financial reporting",
    ],
  },

  // ── 2. Balaji Jewellers ───────────────────────────────────────────────────
  {
    id: "balaji-jewellers",
    title: "Balaji Jewellers",
    category: "Jewellery",
    desc: "Elegant jewellery showroom website presenting bridal collections, gold ornaments, and bespoke craftsmanship with interactive customer enquiry options across all screen sizes.",
    fullDesc:
      "Balaji Jewellers is a modern digital showcase designed for a premier jewellery business. The platform highlights bridal gold, diamond, and antique ornament collections through high-resolution photography, categorized catalogues, and artisan storytelling. Customers can explore hallmark purity standards, review showroom locations, and submit direct enquiries for bespoke designs. Engineered for seamless responsiveness, the site delivers a luxury browsing experience tailored to retail jewellery buyers.",
    icon: "Gem",
    banner: "/assets/projects/balaji-jewellers.svg",
    banners: [
      "/assets/projects/balaji-jewellers.svg",
      "/assets/projects/balaji-jewellers-slide2.jpg",
      "/assets/projects/balaji-jewellers-slide3.svg",
    ],
    mobileBanners: [],
    showWebView: true,
    showMobileView: false,
    videoType: null,
    videoUrl: null,
    videoFileUrl: null,
    pdfUrl: null,
    liveUrl: "https://balajijwellers.aimstorm.in",
    tags: ["Jewellery Showcase", "Brand Website", "Catalogue", "Luxury Retail"],
    features: [
      "High-definition jewellery collection catalogues & galleries",
      "Hallmark purity standards & brand heritage presentation",
      "Direct customer enquiry and showroom contact integration",
      "Fluid, responsive interface optimized for desktop & mobile",
    ],
  },

  // ── 3. Sri Abnaya ─────────────────────────────────────────────────────────
  {
    id: "sri-abnaya",
    title: "Sri Abnaya",
    category: "Business Websites",
    desc: "Modern business website presenting corporate services, product offerings, and brand credentials with intuitive navigation and direct customer enquiry channels.",
    fullDesc:
      "Sri Abnaya is a professional corporate web presence built to establish credible digital branding and streamline client communication. The website features structured service presentations, comprehensive business profile sections, and clear navigation designed to guide prospective clients toward key offerings. Direct enquiry touchpoints and responsive layouts ensure that visitors on any device can easily learn about the firm's solutions and initiate consultations.",
    icon: "Globe",
    banner: "/assets/projects/sri-abnaya.svg",
    banners: [
      "/assets/projects/sri-abnaya.svg",
      "/assets/projects/sri-abnaya-slide2.svg",
      "/assets/projects/sri-abnaya-slide3.svg",
    ],
    mobileBanners: [],
    showWebView: true,
    showMobileView: false,
    videoType: null,
    videoUrl: null,
    videoFileUrl: null,
    pdfUrl: null,
    liveUrl: "https://sriabnaya.aimstorm.in",
    tags: ["Business Profile", "Corporate Web", "Lead Capture", "Responsive Design"],
    features: [
      "Comprehensive business profile & service showcase",
      "Intuitive site architecture & streamlined navigation",
      "Integrated enquiry workflows & direct contact touchpoints",
      "Fully responsive layouts tailored for mobile, tablet, and desktop",
    ],
  },

  // ── 4. Malligai CRM ───────────────────────────────────────────────────────
  {
    id: "malligai-crm",
    title: "Malligai CRM",
    category: "Business Software",
    desc: "Customer relationship and lead management system tracking sales inquiries, automated follow-up schedules, interaction histories, and team conversion performance.",
    fullDesc:
      "Malligai CRM is a dedicated customer relationship platform built to organize lead pipelines and optimize conversion workflows for sales teams. The software centralizes customer contact cards, tracks multi-channel enquiries, and automates follow-up reminder alerts so no prospect slips through the cracks. Team supervisors benefit from role-based assignment, interaction history timelines, and clear pipeline analytics that monitor representative performance and deal velocity.",
    icon: "Users",
    banner: "/assets/projects/malligai-crm.svg",
    banners: [
      "/assets/projects/malligai-crm.svg",
      "/assets/projects/malligai-crm-slide2.svg",
      "/assets/projects/malligai-crm-slide3.svg",
    ],
    mobileBanners: [],
    showWebView: true,
    showMobileView: false,
    videoType: null,
    videoUrl: null,
    videoFileUrl: null,
    pdfUrl: null,
    liveUrl: "https://crmmalligai.inwora.com",
    tags: ["CRM", "Lead Management", "Sales Pipeline", "Customer Tracking"],
    features: [
      "Centralized lead profiles & customer interaction timelines",
      "Inquiry stage tracking with automated follow-up reminders",
      "Role-based sales staff assignment & access permissions",
      "Performance analytics & conversion pipeline dashboards",
    ],
  },

  // ── 5. JCI Malligai ───────────────────────────────────────────────────────
  {
    id: "jci-malligai",
    title: "JCI Malligai",
    category: "Business Software",
    desc: "Member directory and organizational operations portal facilitating activity logging, leadership workflows, event tracking, and centralized chapter administration.",
    fullDesc:
      "JCI Malligai is a comprehensive organizational operations portal developed to coordinate member management and chapter initiatives. The platform digitizes member directories, tracks leadership workflows, and logs chapter projects and community activities in one central hub. Administrative dashboards provide officers with role-based governance, attendance verification, and automated reporting to keep organizational operations transparent and efficient.",
    icon: "Users",
    banner: "/assets/projects/jci-malligai.svg",
    banners: [
      "/assets/projects/jci-malligai.svg",
      "/assets/projects/jci-malligai-slide2.svg",
      "/assets/projects/jci-malligai-slide3.svg",
    ],
    mobileBanners: [],
    showWebView: true,
    showMobileView: false,
    videoType: null,
    videoUrl: null,
    videoFileUrl: null,
    pdfUrl: null,
    liveUrl: "https://jcimalligai.inwora.com",
    tags: ["Member Management", "Operations Portal", "Directory", "Governance"],
    features: [
      "Complete member profiles & active roster directory",
      "Chapter project coordination & activity workflow logging",
      "Centralized administrative governance dashboard",
      "Role-based officer permissions & meeting documentation",
    ],
  },

  // ── 6. Store Grocery Panel ────────────────────────────────────────────────
  {
    id: "store-grocery-panel",
    title: "Store Grocery Panel",
    category: "E-commerce & Retail",
    desc: "Vendor-facing grocery store portal for managing inventory availability, catalog pricing, incoming customer orders, fulfillment statuses, and store operating hours.",
    fullDesc:
      "Store Grocery Panel is a merchant management interface tailored for grocery store managers and department vendors. It allows store staff to manage item catalog pricing, toggle live stock availability, and process incoming grocery orders through real-time fulfillment pipelines. Store managers can monitor order packing stages, update delivery handoffs, adjust operating hours, and oversee daily sales totals directly from their dedicated operational terminal.",
    icon: "Store",
    banner: "/assets/projects/store-grocery-panel.svg",
    banners: [
      "/assets/projects/store-grocery-panel.svg",
      "/assets/projects/store-grocery-panel-slide2.svg",
    ],
    mobileBanners: [],
    showWebView: true,
    showMobileView: false,
    videoType: null,
    videoUrl: null,
    videoFileUrl: null,
    pdfUrl: null,
    liveUrl: "https://storegrocery.inwora.com",
    tags: ["Vendor Panel", "Grocery Commerce", "Order Fulfillment", "Store Management"],
    features: [
      "Real-time catalog editing, pricing, and stock availability toggles",
      "Order processing pipeline with live status updates",
      "Store profile configuration & operational schedule controls",
      "Daily fulfillment tracking & vendor dispatch monitoring",
    ],
  },

  // ── 7. User Grocery App ───────────────────────────────────────────────────
  {
    id: "user-grocery-app",
    title: "User Grocery App",
    category: "E-commerce & Retail",
    desc: "Customer-facing online grocery shopping web app featuring rapid product discovery, category filters, interactive cart, secure checkout, and order history.",
    fullDesc:
      "User Grocery App is an intuitive online grocery application engineered to deliver a seamless shopping experience for everyday household shoppers. Customers can browse fresh produce, pantry staples, and FMCG categories using instant search and filtering. The application features item detail cards, one-tap cart adjustments, scheduled delivery selection, and clear order tracking, enabling users to reorder frequent items effortlessly from desktop or mobile browsers.",
    icon: "ShoppingCart",
    banner: "/assets/projects/user-grocery-app.svg",
    banners: [
      "/assets/projects/user-grocery-app.svg",
      "/assets/projects/user-grocery-app-slide2.svg",
    ],
    mobileBanners: [],
    showWebView: true,
    showMobileView: false,
    videoType: null,
    videoUrl: null,
    videoFileUrl: null,
    pdfUrl: null,
    liveUrl: "https://usergrocery.inwora.com",
    tags: ["Grocery App", "E-commerce", "Cart & Checkout", "Shopping"],
    features: [
      "Fast catalog browsing with instant keyword search & category filters",
      "Comprehensive product detail views with unit pricing",
      "Dynamic shopping cart with quantity adjustments & checkout flow",
      "Customer account dashboard with saved addresses & order history",
    ],
  },

  // ── 8. Admin Grocery Dashboard ────────────────────────────────────────────
  {
    id: "admin-grocery-dashboard",
    title: "Admin Grocery Dashboard",
    category: "E-commerce & Retail",
    desc: "Central administration dashboard overseeing multi-store grocery operations, vendor approvals, catalog categories, platform orders, and role-based permissions.",
    fullDesc:
      "Admin Grocery Dashboard is the central administrative engine orchestrating the entire grocery commerce ecosystem. Platform operators can approve new vendor stores, manage master product taxonomies, monitor platform-wide order velocity, and enforce operational guidelines. Featuring granular role-based access control and detailed activity logs, the dashboard provides administrators with the oversight needed to maintain service quality across participating stores.",
    icon: "LineChart",
    banner: "/assets/projects/admin-grocery-dashboard.svg",
    banners: [
      "/assets/projects/admin-grocery-dashboard.svg",
      "/assets/projects/admin-grocery-dashboard-slide2.svg",
    ],
    mobileBanners: [],
    showWebView: true,
    showMobileView: false,
    videoType: null,
    videoUrl: null,
    videoFileUrl: null,
    pdfUrl: null,
    liveUrl: "https://admingrocery.inwora.com",
    tags: ["Admin Dashboard", "Multi-Store Management", "Platform Ops", "Grocery Analytics"],
    features: [
      "Master store onboarding, approval, and management controls",
      "Centralized product catalogue taxonomy & category governance",
      "Platform-wide live order monitoring & dispatch oversight",
      "Role-based administrative access & system audit logs",
    ],
  },

  // ── 9. Grocery API ────────────────────────────────────────────────────────
  {
    id: "grocery-api",
    title: "Grocery API",
    category: "E-commerce & Retail",
    desc: "High-performance RESTful API powering grocery customer applications, vendor merchant portals, and central admin systems with secure token authentication.",
    fullDesc:
      "Grocery API serves as the foundational backend infrastructure that links the customer web application, vendor store terminals, and central administration dashboard. Built with a scalable RESTful architecture, the API handles token-based authentication, catalog synchronization, real-time inventory adjustments, and transactional order routing. It ensures data consistency and fast response times across concurrent shopping sessions and operational workflows.",
    icon: "Server",
    banner: "/assets/projects/grocery-api.svg",
    banners: [
      "/assets/projects/grocery-api.svg",
      "/assets/projects/grocery-api-slide2.svg",
    ],
    mobileBanners: [],
    showWebView: true,
    showMobileView: false,
    videoType: null,
    videoUrl: null,
    videoFileUrl: null,
    pdfUrl: null,
    liveUrl: "https://groceryapi.inwora.com",
    tags: ["REST API", "Backend Infrastructure", "Microservices", "Grocery Platform"],
    features: [
      "RESTful API endpoints with structured JSON responses",
      "Secure token-based authentication & role authorization",
      "High-concurrency inventory, catalog, and pricing services",
      "Transactional order processing & state synchronization",
    ],
  },

  // ── 10. Takeaway ──────────────────────────────────────────────────────────
  {
    id: "takeaway",
    title: "Takeaway",
    category: "Food & Beverage",
    desc: "Online takeaway and food ordering system featuring digital menu browsing, custom item options, quick cart checkout, and live order tracking.",
    fullDesc:
      "Takeaway is a digital food ordering platform created for restaurants and quick-service food outlets to take direct customer pickup and takeaway orders online. Diners can explore digital menus organized by meal categories, customize portion selections, and place orders smoothly through a mobile-optimized checkout. The system bridges customer orders directly to kitchen counters, streamlining preparation times and pickup coordination.",
    icon: "Utensils",
    banner: "/assets/projects/takeaway.svg",
    banners: [
      "/assets/projects/takeaway.svg",
      "/assets/projects/takeaway-slide2.svg",
    ],
    mobileBanners: [],
    showWebView: true,
    showMobileView: false,
    videoType: null,
    videoUrl: null,
    videoFileUrl: null,
    pdfUrl: null,
    liveUrl: "https://takeaway.inwora.com",
    tags: ["Food Ordering", "Takeaway", "Digital Menu", "Restaurant System"],
    features: [
      "Interactive digital restaurant menu categorized by meal types",
      "Item customization, portion selection, and dynamic cart",
      "Frictionless online order placement and confirmation",
      "Order status tracking with kitchen prep coordination",
    ],
  },

  // ── 11. Wallmark ──────────────────────────────────────────────────────────
  {
    id: "wallmark",
    title: "Wallmark",
    category: "Business Websites",
    desc: "Architectural facades and structural engineering brand website showcasing building envelopes, glazing installations, cladding projects, and technical capabilities.",
    fullDesc:
      "Wallmark is a corporate brand website representing Wallmark Facades and Structures, a specialist in architectural glazing, curtain walls, ACP cladding, and structural steel works. The website presents past commercial architectural projects, detailing technical engineering standards, materials, and exterior design execution. Prospective architects and property developers can examine completed project portfolios and connect directly with structural engineering consultants.",
    icon: "HardHat",
    banner: "/assets/projects/wallmark.svg",
    banners: [
      "/assets/projects/wallmark.svg",
      "/assets/projects/wallmark-slide2.jpg",
      "/assets/projects/wallmark-slide3.svg",
    ],
    mobileBanners: [],
    showWebView: true,
    showMobileView: false,
    videoType: null,
    videoUrl: null,
    videoFileUrl: null,
    pdfUrl: null,
    liveUrl: "https://wallmark.inwora.com",
    tags: ["Architectural Facades", "Structural Engineering", "Brand Website", "Commercial Projects"],
    features: [
      "Architectural facade, curtain wall & structural glazing showcase",
      "Commercial project case studies with high-resolution galleries",
      "Structural engineering specifications & material standards",
      "Direct client consultation enquiry & project quotation workflows",
    ],
  },

  // ── 12. Thambalam ─────────────────────────────────────────────────────────
  {
    id: "thambalam",
    title: "Thambalam",
    category: "Business Websites",
    desc: "Handcrafted wedding thambalam bag design website showcasing customized return-gift bags, traditional zari embroidery, fabric variations, and bulk order enquiries.",
    fullDesc:
      "Thambalam is a boutique showcase website highlighting handcrafted wedding thambalam bags and traditional gift packaging for auspicious celebrations. The platform features curated collections of silk, jute, and raw-silk return-gift bags adorned with traditional motifs and zari embroidery. Wedding planners and families can view customization options, explore fabric finishes, and submit bulk order enquiries for festive occasions.",
    icon: "Layout",
    banner: "/assets/projects/thambalam.svg",
    banners: [
      "/assets/projects/thambalam.svg",
      "/assets/projects/thambalam-slide2.jpg",
      "/assets/projects/thambalam-slide3.svg",
    ],
    mobileBanners: [],
    showWebView: true,
    showMobileView: false,
    videoType: null,
    videoUrl: null,
    videoFileUrl: null,
    pdfUrl: null,
    liveUrl: "https://thambalam.inwora.com",
    tags: ["Wedding Crafts", "Traditional Bags", "Brand Showcase", "Gift Packaging"],
    features: [
      "Curated showcase of handcrafted wedding thambalam bags & totes",
      "Material, zari embroidery, and color customization presentations",
      "Clear product categories for weddings, receptions, and poojas",
      "Bulk order quotation & direct customer enquiry channels",
    ],
  },

  // ── 13. Chai Fi ───────────────────────────────────────────────────────────
  {
    id: "chai-fi",
    title: "Chai Fi",
    category: "Food & Beverage",
    desc: "Modern café and beverage-brand billing solution presenting artisanal teas, instant POS bill generation, ingredient tracking, and mobile-friendly café ordering.",
    fullDesc:
      "Chai Fi is a specialized café web platform and modern billing application built for specialty tea and beverage outlets. Combining contemporary café branding with swift point-of-sale functionality, the interface displays signature chai varieties, snacks, and beverage collections. Counter staff can issue speedy customer bills, track ingredient consumption, and handle customer queues during peak café hours with a lightweight, responsive interface.",
    icon: "Coffee",
    banner: "/assets/projects/chai-fi.svg",
    banners: [
      "/assets/projects/chai-fi.svg",
      "/assets/projects/chai-fi-slide2.jpg",
      "/assets/projects/chai-fi-slide3.svg",
    ],
    mobileBanners: [],
    showWebView: true,
    showMobileView: false,
    videoType: null,
    videoUrl: null,
    videoFileUrl: null,
    pdfUrl: null,
    liveUrl: "https://chaifi.inwora.com",
    tags: ["Café Solution", "POS Billing", "Beverage Brand", "Food & Beverage"],
    features: [
      "Artisanal tea, brew, and café snack menu presentation",
      "Fast POS billing interface tailored for high-volume tea counters",
      "Ingredient usage tracking and recipe consistency support",
      "Responsive mobile-first interface designed for counter tablets",
    ],
  },

  // ── 14. Grocery Website ───────────────────────────────────────────────────
  {
    id: "grocery-website",
    title: "Grocery Website",
    category: "E-commerce & Retail",
    desc: "Responsive grocery e-commerce storefront offering organized pantry categories, smart search, basket management, customer accounts, and scheduled home delivery.",
    fullDesc:
      "Grocery Website is a full-featured customer grocery e-commerce storefront designed for fast, accessible household provisioning on desktop and mobile web browsers. It provides shoppers with intuitive department browsing—spanning fresh produce, grains, dairy, and household essentials. With category filters, persistent cart states, transparent delivery slot selection, and past order reordering, customers enjoy a dependable grocery purchasing journey.",
    icon: "ShoppingCart",
    banner: "/assets/projects/grocery-website.svg",
    banners: [
      "/assets/projects/grocery-website.svg",
      "/assets/projects/grocery-website-slide2.svg",
    ],
    mobileBanners: [],
    showWebView: true,
    showMobileView: false,
    videoType: null,
    videoUrl: null,
    videoFileUrl: null,
    pdfUrl: null,
    liveUrl: "https://grocery.inwora.com",
    tags: ["Grocery Store", "E-commerce Storefront", "Online Retail", "Catalogue"],
    features: [
      "Comprehensive grocery department catalogue with structured categories",
      "Dynamic product search, item filtering, and unit pricing details",
      "Persistent shopping cart and frictionless multi-step checkout",
      "Customer profile dashboard with order tracking and past purchase history",
    ],
  },

  // ── 15. Wora Stayz ────────────────────────────────────────────────────────
  {
    id: "wora-stayz",
    title: "Wora Stayz",
    category: "Hospitality",
    desc: "Hospitality and accommodation platform showcasing room inventories, property amenities, local area guides, and guest room reservation enquiries.",
    fullDesc:
      "Wora Stayz is a boutique hospitality and accommodation web platform designed for premium stays and serviced apartments. The platform showcases room categories with high-definition photography, bed configurations, room amenities, and transparent pricing. Visitors can review property locations, explore nearby attractions, check seasonal availability, and submit direct room reservation inquiries through an intuitive, mobile-friendly interface.",
    icon: "Building2",
    banner: "/assets/projects/wora-stayz.svg",
    banners: [
      "/assets/projects/wora-stayz.svg",
      "/assets/projects/wora-stayz-slide2.jpg",
      "/assets/projects/wora-stayz-slide3.svg",
    ],
    mobileBanners: [],
    showWebView: true,
    showMobileView: false,
    videoType: null,
    videoUrl: null,
    videoFileUrl: null,
    pdfUrl: null,
    liveUrl: "https://worastayz.inwora.com",
    tags: ["Hospitality", "Accommodation", "Room Booking", "Travel & Stay"],
    features: [
      "Detailed room type presentations with amenity specifications & photos",
      "Comprehensive property facility guides and local attraction highlights",
      "Interactive location map, transit details, and guest contact options",
      "Direct room booking enquiry form with date and guest count selection",
    ],
  },

  // ── 16. Priyam ────────────────────────────────────────────────────────────
  {
    id: "priyam",
    title: "Priyam",
    category: "Food & Beverage",
    desc: "Authentic South Indian agro foods website showcasing traditional pastes, thuvaiyals, and culinary relishes with brand storytelling and customer enquiries.",
    fullDesc:
      "Priyam is the official digital brand platform for Priyam Agro Foods, a Madurai-based producer of authentic South Indian culinary pastes, traditional thuvaiyals, and natural food seasonings. The website presents their culinary heritage, natural ingredient philosophy, and product range—including classic garlic, curry leaf, and ginger pastes. Retailers and consumers can learn about hygiene standards, explore recipes, and place direct distribution enquiries.",
    icon: "Utensils",
    banner: "/assets/projects/priyam.svg",
    banners: [
      "/assets/projects/priyam.svg",
      "/assets/projects/priyam-slide2.svg",
    ],
    mobileBanners: [],
    showWebView: true,
    showMobileView: false,
    videoType: null,
    videoUrl: null,
    videoFileUrl: null,
    pdfUrl: null,
    liveUrl: "https://priyam.inwora.com",
    tags: ["Agro Foods", "Food Brand", "Culinary Heritage", "Product Showcase"],
    features: [
      "Traditional South Indian paste & thuvaiyal product catalogue",
      "Farm-to-kitchen brand storytelling and natural ingredient focus",
      "Clear nutritional information and culinary usage guidelines",
      "Trade distribution and customer enquiry communication channels",
    ],
  },

  // ── 17. Gold Platform (Preserves & updates existing gold-poster) ──────────
  {
    id: "gold-poster",
    title: "Gold Platform",
    category: "Jewellery",
    desc: "Jewellery business automation platform generating real-time gold and silver rate posters, dynamic brand overlays, and showroom marketing media.",
    fullDesc:
      "Gold Platform (formerly Inwora Gold Poster) is a specialized digital platform engineered for jewelry showrooms and bullion merchants. The system automates daily bullion rate publication (24K, 22K, 18K gold and silver), embedding verified market prices onto high-resolution showroom-branded promotional templates. Showroom managers can generate customized marketing graphics with their showroom logos and contact details in a single tap, streamlining daily rate communication across social channels.",
    icon: "Gem",
    banner: "/assets/projects/gold-poster.jpg",
    banners: [
      "/assets/projects/gold-poster.jpg",
      "/assets/projects/gold-poster-slide2.jpg",
      "/assets/projects/gold-poster-slide3.jpg",
    ],
    mobileBanners: [],
    showWebView: true,
    showMobileView: false,
    videoType: null,
    videoUrl: null,
    videoFileUrl: null,
    pdfUrl: "/assets/pdf/gold-poster-presentation.pdf",
    liveUrl: "https://gold.inwora.com",
    tags: ["Gold Platform", "Jewellery Tech", "Bullion Rates", "Showroom Marketing"],
    features: [
      "Real-time bullion market gold and silver rate synchronization",
      "Automated high-resolution promotional poster generator",
      "One-tap social status and digital story graphic export",
      "Dynamic showroom brand kit and custom logo overlay",
    ],
  },

  // ── 18. Subra Residency ───────────────────────────────────────────────────
  {
    id: "subra-residency",
    title: "Subra Residency",
    category: "Hospitality",
    desc: "Kumbakonam temple city hotel website highlighting comfortable guest rooms, pilgrimage amenities, proximity to sacred temples, and booking enquiries.",
    fullDesc:
      "Subra Residency is the official hospitality website for a hotel located in the historic temple city of Kumbakonam. The website presents air-conditioned deluxe and family rooms tailored for pilgrims, tourists, and business visitors. Guests can review in-room amenities, access driving directions to prominent Kumbakonam temples, verify front-desk services, and submit booking enquiries directly through a fast, mobile-friendly interface.",
    icon: "Building2",
    banner: "/assets/projects/subra-residency.svg",
    banners: [
      "/assets/projects/subra-residency.svg",
      "/assets/projects/subra-residency-slide2.svg",
    ],
    mobileBanners: [],
    showWebView: true,
    showMobileView: false,
    videoType: null,
    videoUrl: null,
    videoFileUrl: null,
    pdfUrl: null,
    liveUrl: "https://subraresidency.com",
    tags: ["Hotel Website", "Hospitality", "Kumbakonam", "Temple Pilgrimage"],
    features: [
      "Room category showcases with occupancy details & photo galleries",
      "Pilgrimage and tourism information for Kumbakonam sacred temples",
      "Essential guest amenities: Wi-Fi, 24-hr front desk & room service details",
      "Direct reservation enquiry form and interactive location contact",
    ],
  },

  // ── 19. POS & KOT for Restaurants (Existing preserved) ────────────────────
  {
    id: "pos-kot",
    title: "POS & KOT for Restaurants",
    category: "Food & Beverage",
    desc: "Integrated Point-of-Sale billing, table management, and live Kitchen Order Ticket (KOT) workflow system.",
    fullDesc:
      "POS & KOT for Restaurants is an enterprise-grade dining outlet management system designed to bridge table order booking counters directly with the kitchen. Built for fast-paced restaurants, cafes, and multi-outlet dining chains, waitstaff can enter table orders on mobile tablets, which instantly sync onto Kitchen Display System (KDS) screens and print thermal Kitchen Order Tickets (KOT) in real time. It features split billing, captain management, inventory depletion tracking, thermal receipt printing, and automated end-of-day financial reconciliation reports.",
    icon: "Utensils",
    banner: "/assets/projects/pos-kot.png",
    banners: [
      "/assets/projects/pos-kot.jpg",
      "/assets/projects/pos-kot-slide2.jpg",
      "/assets/projects/pos-kot-slide3.jpg",
    ],
    mobileBanners: [],
    showWebView: true,
    showMobileView: false,
    videoType: null,
    videoUrl: null,
    videoFileUrl: null,
    pdfUrl: "/assets/pdf/nexora-pos-deck.pdf",
    liveUrl: null,
    tags: ["Restaurant POS", "KOT Workflow", "Real-time Sync", "Dining Ops"],
    features: [
      "Real-time Kitchen Display System (KDS)",
      "Thermal Receipt Printer Integration",
      "Table & Captain Order Tablet Management",
      "Offline Billing & Data Recovery",
      "Daily Financial Reconciliation Reports",
      "Recipe Costing & Inventory Tracking",
    ],
  },

  // ── 20. Construction CRM (Existing preserved) ─────────────────────────────
  {
    id: "construction-crm",
    title: "Construction CRM",
    category: "Business Software",
    desc: "Dedicated CRM for construction groups to track client bids, contractor materials, and work site progress.",
    fullDesc:
      "Construction CRM is a specialized contractor CRM platform tailored to handle the unique workflows of general contractors, commercial builders, and civil engineering groups. It centralizes contractor directories, tracks construction bid progress, manages building material procurement orders, and hosts client communication boards. Site managers can upload daily site pictures and inspection logs to update property owners on build milestones, weather conditions, and progress billing cycles.",
    icon: "HardHat",
    banner: "/assets/projects/construction-crm.png",
    banners: [
      "/assets/projects/construction-crm.jpg",
      "/assets/projects/construction-crm-slide2.jpg",
      "/assets/projects/construction-crm.png",
    ],
    mobileBanners: [],
    showWebView: true,
    showMobileView: false,
    videoType: null,
    videoUrl: null,
    videoFileUrl: null,
    pdfUrl: null,
    liveUrl: null,
    tags: ["CRM", "Construction", "Contractor Tool", "Project Tracking"],
    features: [
      "Bid & Cost Estimate Builder",
      "Building Material Procurement Tracker",
      "Daily Work Site Inspection Photo Logs",
      "Subcontractor Work Directory",
      "Milestone Progress Billing Cycles",
      "Live Site Weather Sync & Logs",
    ],
  },

  // ── 21. Lead Management System (Existing preserved) ───────────────────────
  {
    id: "lead-management",
    title: "Lead Management System",
    category: "Business Software",
    desc: "Growth-centric sales funnel to capture, score, route, and convert B2B leads across digital marketing channels.",
    fullDesc:
      "The Lead Management System is a B2B sales automation CRM engineered to track business leads from initial digital capture through final deal conversion. Featuring an interactive Kanban pipeline board, the platform ranks incoming leads using an automated lead-scoring algorithm based on engagement levels and buyer intent. It automatically routes high-value prospects to appropriate sales reps, triggers SLA follow-up alerts, tracks email campaign open rates, and provides detailed sales velocity analytics.",
    icon: "LineChart",
    banner: "/assets/projects/lead-management.png",
    banners: [
      "/assets/projects/lead-management.png",
      "/assets/projects/lead-management-slide2.svg",
    ],
    mobileBanners: [],
    showWebView: true,
    showMobileView: false,
    videoType: null,
    videoUrl: null,
    videoFileUrl: null,
    pdfUrl: null,
    liveUrl: null,
    tags: ["CRM", "Lead Scoring", "Sales Funnel", "Pipeline"],
    features: [
      "Automated Multi-Channel Lead Capture",
      "Lead Scoring & Intent Algorithm",
      "SLA Rep Follow-up Alerts",
      "Email Campaign Engagement Tracking",
      "Interactive Kanban Pipeline Board",
      "Detailed Sales Velocity Analytics",
    ],
  },

  // ── 22. Accounts Management System (Existing preserved) ───────────────────
  {
    id: "accounts-management",
    title: "Accounts Management System",
    category: "Business Software",
    desc: "Double-entry financial accounting software with automated invoicing, ledger tracking, and tax reconciliation.",
    fullDesc:
      "The Accounts Management System is a secure, double-entry financial accounting platform designed for small-to-medium enterprises. It automates general financial ledger updates, tracks recurring operating expenses, generates and dispatches professional PDF invoices to clients, and compiles instant Profit & Loss (P&L) financial statements. The system streamlines bank account reconciliations and tax category mapping, saving business owners and accountants over 70% in administrative preparation time.",
    icon: "Calculator",
    banner: "/assets/projects/accounts-management.png",
    banners: [
      "/assets/projects/accounts-management.png",
      "/assets/projects/accounts-management-slide2.svg",
    ],
    mobileBanners: [],
    showWebView: true,
    showMobileView: false,
    videoType: null,
    videoUrl: null,
    videoFileUrl: null,
    pdfUrl: null,
    liveUrl: null,
    tags: ["Accounting", "Invoicing", "Double-Entry", "Financial Ledgers"],
    features: [
      "Automated PDF Invoice Dispatch",
      "Double-Entry General Ledger Balance",
      "Bank Statement Auto-Reconciliation",
      "Instant P&L Financial Statement Generator",
      "Automated Tax Category Mapping",
      "Secure Accountant Access & Audit Trail",
    ],
  },

  // ── 23. Automated Factory Application (Existing preserved) ────────────────
  {
    id: "factory-automation",
    title: "Automated Factory Application",
    category: "Business Software",
    desc: "Smart Industry 4.0 factory floor control dashboard with real-time IoT machinery monitoring and quality checks.",
    fullDesc:
      "The Automated Factory Application is a custom Industry 4.0 industrial IoT monitoring platform built for modern manufacturing plants and assembly lines. By connecting PLC controllers and wireless MQTT sensors directly to centralized management dashboards, the system tracks real-time machine operating status, assembly line throughput, temperature/vibration metrics, and Overall Equipment Effectiveness (OEE). It automatically triggers predictive maintenance alarms before breakdowns occur, reducing factory assembly downtime by 90% and eliminating manual paper logs.",
    icon: "Cpu",
    banner: "/assets/projects/factory-automation.png",
    banners: [
      "/assets/projects/factory-automation.jpg",
      "/assets/projects/factory-automation-slide2.jpg",
      "/assets/projects/factory-automation.png",
    ],
    mobileBanners: [],
    showWebView: true,
    showMobileView: false,
    videoType: null,
    videoUrl: null,
    videoFileUrl: null,
    pdfUrl: null,
    liveUrl: null,
    tags: ["Factory Floor", "IoT Monitoring", "Automation", "Operations"],
    features: [
      "Real-Time Machinery Status Telemetry",
      "Predictive Maintenance Alarms",
      "Shift Assembly Throughput Tracking",
      "Automated Quality Control Checkpoints",
      "Barcode & RFID Label Scanner",
      "PLC & MQTT Industrial Integration",
    ],
  },

  // ── 24. Hospital Management Application (Existing preserved) ──────────────
  {
    id: "hospital-management",
    title: "Hospital Management Application",
    category: "Business Software",
    desc: "HIPAA-compliant healthcare portal for Electronic Health Records (EHR), doctor scheduling, and medical billing.",
    fullDesc:
      "The Hospital Management Application is a secure, HIPAA-compliant digital healthcare portal created to streamline clinical operations and patient care. It manages end-to-end hospital administrative workflows, including patient registration, OPD/IPD admission logs, doctor appointment scheduling calendars, and Electronic Health Record (EHR) maintenance. The platform automates lab test report dispatches, ward bed allocations, and itemized medical billing claims, empowering clinical staff and physicians to deliver coordinated, error-free patient care.",
    icon: "Activity",
    banner: "/assets/projects/hospital-management.png",
    banners: [
      "/assets/projects/hospital-management.png",
      "/assets/projects/hospital-management-slide2.svg",
    ],
    mobileBanners: [],
    showWebView: true,
    showMobileView: false,
    videoType: null,
    videoUrl: null,
    videoFileUrl: null,
    pdfUrl: null,
    liveUrl: null,
    tags: ["Healthcare ERP", "EHR Portal", "Hospital Ops", "Patient Records"],
    features: [
      "Electronic Health Records (EHR)",
      "Doctor Appointment Scheduler Calendar",
      "Ward & ICU Bed Occupancy Management",
      "Automated Laboratory Test Reports",
      "Medical Billing & Insurance Claim Sync",
      "Secure Staff Clinical Communications",
    ],
  },

  // ── 25. Travel Budget Application (Existing preserved) ────────────────────
  {
    id: "travel-budget",
    title: "Travel Budget Application",
    category: "Business Software",
    desc: "Multi-currency travel expense tracker, receipt scanner, and visual itinerary cost planner for teams and travelers.",
    fullDesc:
      "The Travel Budget Application is a smart fintech tool designed for leisure travelers and corporate business teams to track expenditures, set category budgets, and prevent overspending while on the road. Integrated with live auto-converting currency exchange rates, the application allows users to split expenses across accommodation, flights, transportation, and dining. Travelers can scan physical paper receipts via OCR, view visual itinerary budget maps, and divide group trip expenses seamlessly offline and online.",
    icon: "Compass",
    banner: "/assets/projects/travel-budget.png",
    banners: [
      "/assets/projects/travel-budget.png",
      "/assets/projects/travel-budget-slide2.svg",
    ],
    mobileBanners: [],
    showWebView: true,
    showMobileView: false,
    videoType: null,
    videoUrl: null,
    videoFileUrl: null,
    pdfUrl: null,
    liveUrl: null,
    tags: ["Expense Management", "Multi-Currency", "Budgeting", "Fintech"],
    features: [
      "150+ Currency Live Auto-Conversion",
      "Visual Trip Itinerary Cost Builder",
      "OCR Receipt Image Scanning",
      "Group Expense Splitting & Settlement",
      "Category Spending Limit Alerts",
      "Offline Data Sync Enabled",
    ],
  },

  // ── 26. SCORM LMS Learning Management System (Existing preserved) ─────────
  {
    id: "scrom-lms",
    title: "SCORM LMS Learning Management System",
    category: "Business Software",
    desc: "SCORM-compliant e-learning digital academy for interactive course delivery, student tracking, and auto-certification.",
    fullDesc:
      "Our SCORM LMS is a digital learning academy portal built for educational institutions and corporate training programs. Built around SCORM 2004 standards, it seamlessly imports standardized e-learning course packages, maintaining precise logs on student module completion times, quiz scores, and learning progress metrics. Instructors can build interactive quizzes, monitor class analytics, and issue automated, verified graduation certificates upon successful course completion.",
    icon: "GraduationCap",
    banner: "/assets/projects/scrom-lms.png",
    banners: [
      "/assets/projects/scrom-lms.png",
      "/assets/projects/scrom-lms-slide2.svg",
    ],
    mobileBanners: [],
    showWebView: true,
    showMobileView: false,
    videoType: null,
    videoUrl: null,
    videoFileUrl: null,
    pdfUrl: null,
    liveUrl: null,
    tags: ["LMS", "SCORM 2004", "E-Learning", "Training Ops"],
    features: [
      "Standard SCORM 2004 Package Import",
      "Real-Time Student Completion Tracker",
      "Interactive Quiz & Exam Builders",
      "Auto Verification Certificate Issuance",
      "Instructor Class Performance Dashboards",
      "Course Access & Enrollment Controls",
    ],
  },
];

export function resolveIcon(name: string): LucideIcon {
  return iconMap[name] ?? Layout;
}
