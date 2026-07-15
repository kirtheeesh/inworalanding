import { Layout, Database, Activity, Code, Compass, HardHat, Globe, GraduationCap, Calculator } from "lucide-react";

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
    title: "Automated Gold Poster Application",
    category: "SaaS Product",
    desc: "Automated promotional poster generator for jewelry retailers with live gold rate integrations.",
    fullDesc: "The Automated Gold Poster Application is a specialized SaaS marketing tool designed for the jewelry industry. It enables jewelry retailers to automatically generate stunning, high-resolution promotional banners and social media posters. The application features live integrations with market gold rates, updating product pricing dynamically on posters to eliminate manual design efforts and ensure real-time accuracy.",
    icon: Layout,
    banner: "https://images.unsplash.com/photo-1515462277126-2dd0c162007a?auto=format&fit=crop&q=80&w=1200",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    pdfUrl: "/assets/pdf/gold-poster-presentation.pdf",
    liveUrl: "https://gold.inwora.com",
    tags: ["React", "SaaS", "Jewelry Tech", "Marketing Automation"],
    features: [
      "Real-time Gold Rate Integration",
      "Automated Image Generator",
      "One-click Social Media Export",
      "Bulk Poster Generation",
      "Subscription Management",
      "Brand Kit Customization"
    ]
  },
  {
    id: "pos-kot",
    title: "POS & KOT for restaurants",
    category: "Business Software",
    desc: "Integrated Point-of-Sale billing and live Kitchen Order Ticket workflows for modern dining outlets.",
    fullDesc: "POS & KOT for Restaurants is an enterprise-grade restaurant management application designed to bridge the gap between order booking counters and the kitchen. With real-time sync across devices, waitstaff can enter orders directly from tables, which immediately display on kitchen screens (KOT). It features bill generation, multi-register support, and analytics dashboards for operators.",
    icon: Database,
    banner: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    pdfUrl: "/assets/pdf/nexora-pos-deck.pdf",
    liveUrl: "https://kot.nexoraapp.in/",
    tags: ["Real-time Sync", "POS Billing", "KOT System", "Analytics"],
    features: [
      "Real-time Kitchen Display",
      "Thermal Billing Print Support",
      "Table & Captain Management",
      "Offline Billing Recovery",
      "Daily Reconciliation Reports",
      "Recipe & Inventory Tracking"
    ]
  },
  {
    id: "hospital-management",
    title: "Hospital Management application",
    category: "Healthcare System",
    desc: "Comprehensive healthcare portal to streamline patient workflows, clinical records, and billing.",
    fullDesc: "Our Hospital Management Application is a secure, HIPAA-compliant digital platform designed to optimize healthcare administration. It manages patient registration, schedules appointments, stores Electronic Health Records (EHR), manages laboratory requests, and automates billing cycles. It empowers doctors and administrative staff to deliver coordinated, error-free care.",
    icon: Activity,
    banner: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200",
    tags: ["EHR System", "HIPAA Compliant", "React", "Node.js"],
    features: [
      "Electronic Health Records (EHR)",
      "Doctor Appointment Scheduler",
      "Ward & Bed Management",
      "Lab Test Report Automation",
      "Medical Billing & Insurance",
      "Secure Staff Communications"
    ]
  },
  {
    id: "factory-automation",
    title: "Automated Factory Application",
    category: "Industrial Solutions",
    desc: "Smart factory floor control system with real-time machinery monitoring and quality checks.",
    fullDesc: "The Automated Factory Application is a custom IoT-enabled industrial dashboard developed for medium-to-large manufacturing plants. It monitors machine status, tracks assemblies, captures production counts, and triggers predictive maintenance alerts. By connecting machinery sensors with management dashboards, it reduces assembly downtime and manual logs by 90%.",
    icon: Code,
    banner: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
    tags: ["IoT", "Factory Floor", "Automation", "MQTT"],
    features: [
      "Real-time Machinery Status",
      "Predictive Alerts & Alarms",
      "Shift Output Tracking",
      "Quality Control Checkpoints",
      "Barcode Label Scanner",
      "PLC & Sensor Integration"
    ]
  },
  {
    id: "travel-budget",
    title: "Travel Budget Application",
    category: "Financial Tool",
    desc: "Intuitive expense tracker, itinerary planner, and cost estimator for corporate and leisure travel.",
    fullDesc: "Travel Budget Application helps users and corporate teams manage their travel expenditures, set budgets, and log multi-currency expenses. Integrated with dynamic currency conversion rates, the app allows travelers to divide budgets across accommodation, transport, and dining, tracking their real-time costs alongside their visual itinerary.",
    icon: Compass,
    banner: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=1200",
    tags: ["Fintech", "Expense Tracker", "Multi-Currency", "Mobile App"],
    features: [
      "Multi-Currency Auto Conversion",
      "Visual Itinerary Builder",
      "Receipt Image Scanning",
      "Expense Split & Sharing",
      "Budget Limit Alerts",
      "Offline Mode Enabled"
    ]
  },
  {
    id: "construction-crm",
    title: "Construction CRM",
    category: "SaaS Product",
    desc: "Dedicated CRM for construction groups to track client bids, materials, and active work site milestones.",
    fullDesc: "Construction CRM is a tailored CRM platform built to handle the unique workflows of general contractors, builders, and architectural groups. It tracks the progress of construction bids, stores contractor directories, manages material supply updates, and hosts client communication boards. Site managers can upload daily site pictures to update clients on build milestones.",
    icon: HardHat,
    banner: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200",
    tags: ["Contractor Tool", "CRM", "Bid Tracker", "Civil Eng"],
    features: [
      "Bid & Estimate Builder",
      "Material Procurement Tracker",
      "Site Photos & Updates",
      "Subcontractor Database",
      "Milestone Progress Billing",
      "Weather Sync & Logs"
    ]
  },
  {
    id: "lead-management",
    title: "Lead Management system",
    category: "SaaS Product",
    desc: "Strategic pipeline to capture, rank, and convert business leads from digital channels.",
    fullDesc: "The Lead Management System is a growth-centric pipeline application designed to track business leads from point-of-entry through final conversion. Incorporating smart lead routing and scoring, the system ranks leads based on engagement levels, assigning them to appropriate sales reps. It tracks call histories, mail threads, and follow-up activities.",
    icon: Globe,
    banner: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    tags: ["Lead Nurturing", "Sales Funnel", "Automation", "CRM Integrations"],
    features: [
      "Lead Capture Automation",
      "Lead Scoring Algorithm",
      "SLA Follow-up Alerts",
      "Email Campaign Tracking",
      "Interactive Kanban Pipeline",
      "Detailed Sales Analytics"
    ]
  },
  {
    id: "scrom-lms",
    title: "SCROM LMS Learning Management system",
    category: "EdTech Portal",
    desc: "SCORM-compliant digital academy built for interactive courses and certified student metrics.",
    fullDesc: "Our SCORM LMS is a powerful learning portal optimized for school districts and corporate training setups. Built around SCORM standards, it seamlessly imports standardized course packages, maintaining precise logs on student progress, quiz results, and overall module times. It automates certification issuance upon successful course completion.",
    icon: GraduationCap,
    banner: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200",
    tags: ["SCORM Compliant", "LMS", "E-Learning", "Certification"],
    features: [
      "Standard SCORM Import",
      "Student Progress Tracking",
      "Interactive Quiz Builders",
      "Auto Certificate Issuance",
      "Instructor Dashboards",
      "Course Enrollment Controls"
    ]
  },
  {
    id: "accounts-management",
    title: "Accounts management system",
    category: "Financial Tool",
    desc: "Double-entry accounting, ledger tracking, invoice dispatch, and tax reconciliation software.",
    fullDesc: "The Accounts Management System is a secure, double-entry accounting software designed for small-to-medium businesses. It automates financial ledger updates, logs operating expenses, generates and dispatches invoices to clients, and compiles financial statements. It streamlines tax period computations, saving administrative times by 70%.",
    icon: Calculator,
    banner: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200",
    tags: ["Accounting", "Invoicing", "Tax Prep", "Double-Entry"],
    features: [
      "Automated Invoicing",
      "Double-Entry Ledger",
      "Bank Statement Sync",
      "P&L Statement Generator",
      "Tax Category Mapping",
      "Secure Accountant Access"
    ]
  }
];
