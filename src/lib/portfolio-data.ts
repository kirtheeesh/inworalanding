import { Layout, Database, Code, Smartphone, Globe, FileText, PlayCircle, ArrowLeft, Download, ExternalLink } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  category: string;
  desc: string;
  fullDesc: string;
  icon: any;
  banner: string;
  videoUrl?: string;
  pdfUrl?: string;
  liveUrl?: string;
  tags: string[];
  features: string[];
}

export const projects: Project[] = [
  {
    id: "gold-poster",
    title: "Gold Poster SaaS",
    category: "Subscription Product",
    desc: "A powerful platform for jewelry brands to generate professional promotional posters instantly.",
    fullDesc: "The Gold Poster SaaS is a specialized design automation tool built for the jewelry industry. It allows owners to create high-quality marketing materials, price updates, and promotional banners without needing a graphic designer. The platform features smart templates that automatically adjust based on the current gold rate, ensuring marketing materials are always accurate and visually stunning.",
    icon: Layout,
    banner: "https://images.unsplash.com/photo-1515462277126-2dd0c162007a?auto=format&fit=crop&q=80&w=1200",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    pdfUrl: "/assets/pdf/gold-poster-presentation.pdf",
    liveUrl: "https://gold.inwora.com",
    tags: ["React", "Cloudinary", "SaaS"],
    features: [
      "Automated Gold Rate Integration",
      "Dynamic Template Engine",
      "One-click Social Media Export",
      "Bulk Poster Generation",
      "Subscription Management",
      "Brand Kit Customization"
    ]
  },
  {
    id: "nexora-pos",
    title: "Nexora POS & KOT",
    category: "Business Software",
    desc: "Real-time kitchen order ticket and point-of-sale system for modern restaurants.",
    fullDesc: "Nexora POS & KOT is a comprehensive restaurant management system designed to eliminate friction between the front-of-house and the kitchen. Built with real-time synchronization, it handles orders, billing, inventory, and table management seamlessly across multiple devices. The KOT (Kitchen Order Ticket) module ensures chefs receive orders instantly, reducing wait times and improving customer satisfaction.",
    icon: Database,
    banner: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    pdfUrl: "/assets/pdf/nexora-pos-deck.pdf",
    liveUrl: "https://kot.nexoraapp.in/",
    tags: ["Real-time", "Billing", "KOT"],
    features: [
      "Multi-device Real-time Sync",
      "Kitchen Display System (KDS)",
      "Inventory & Stock Tracking",
      "Detailed Sales Analytics",
      "Offline Mode Support",
      "Employee Performance Tracking"
    ]
  },
  {
    id: "business-automation",
    title: "Automation Suite",
    category: "Custom Solution",
    desc: "Custom-built internal tools for streamlining warehouse and inventory workflows.",
    fullDesc: "Our Business Automation Suite is a bespoke ERP-lite solution tailored for medium-scale distributors. It automates the entire supply chain workflow, from warehouse receiving to last-mile delivery tracking. By integrating barcode scanning and automated stock alerts, we've helped clients reduce manual entry errors by 90% and increase fulfillment speed by 40%.",
    icon: Code,
    banner: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
    pdfUrl: "/assets/pdf/automation-case-study.pdf",
    tags: ["Automation", "Inventory", "ERP"],
    features: [
      "Barcode/QR Integration",
      "Automated Reorder Triggers",
      "Warehouse Zone Mapping",
      "Real-time Fleet Tracking",
      "Custom Financial Reporting",
      "API First Architecture"
    ]
  },
  {
    id: "jewelry-ecommerce",
    title: "Jewelry E-commerce",
    category: "Mobile App",
    desc: "Premium shopping experience for luxury jewelry brands with virtual try-on features.",
    fullDesc: "This premium mobile application provides a luxury shopping experience for high-end jewelry brands. The highlight of the app is the AR-powered 'Virtual Try-on' feature, allowing customers to visualize rings, necklaces, and earrings using their smartphone camera. Integrated with a secure payment gateway and real-time gold price calculators, it provides a seamless transition from browsing to purchasing.",
    icon: Smartphone,
    banner: "https://images.unsplash.com/photo-1584302903446-240366f7f341?auto=format&fit=crop&q=80&w=1200",
    tags: ["Flutter", "AR", "E-commerce"],
    features: [
      "AR Virtual Try-On",
      "Live Gold Rate Integration",
      "Secure Payment Gateway",
      "Order Tracking & History",
      "Wishlist & Favorites",
      "Push Notifications"
    ]
  }
];
