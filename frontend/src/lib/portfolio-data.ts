import {
  Layout, Database, Activity, Code, Compass, HardHat, Globe, GraduationCap,
  Calculator, ShoppingCart, Smartphone, Cloud, Cpu, LineChart, Users, Briefcase,
  Rocket, Boxes,
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
  banner: string;
  videoUrl?: string | null;
  pdfUrl?: string | null;
  liveUrl?: string | null;
  tags: string[];
  features: string[];
}

/** Must stay in sync with ProjectRepository::ICONS in the backend. */
export const iconMap: Record<string, LucideIcon> = {
  Layout, Database, Activity, Code, Compass, HardHat, Globe, GraduationCap,
  Calculator, ShoppingCart, Smartphone, Cloud, Cpu, LineChart, Users, Briefcase,
  Rocket, Boxes,
};

export function resolveIcon(name: string): LucideIcon {
  return iconMap[name] ?? Layout;
}
