import { Link } from "wouter";
import { SiX, SiInstagram, SiFacebook, SiYoutube } from "react-icons/si";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import inworaStacked from "@assets/inwora-stacked.png";
import inworaStackedWhite from "@assets/inwora-stacked-white.png";

const productLinks = [
  { label: "Inwora Daily Gold (Google Play)", href: "https://play.google.com/store/apps/details?id=com.kirtheeshh.usermobile&pli=1", external: true },
  { label: "POS & KOT Software", href: "/products" },
  { label: "Unified Business ERP", href: "/products" },
  { label: "Construction Management", href: "https://construction.inwora.com", external: true },
  { label: "Factory Management", href: "/products" },
  { label: "All Products Suite", href: "/products" },
];

const serviceLinks = [
  { label: "Application Maintenance & Support", href: "/services#maintenance-support" },
  { label: "Custom Software Development", href: "/services#custom-software" },
  { label: "IT Outsourcing & Augmentation", href: "/services#it-outsourcing" },
  { label: "QA & Test Automation", href: "/services#qa-test-automation" },
  { label: "API & Database Integration", href: "/services#api-database-integration" },
  { label: "Deployment & Technical Operations", href: "/services#deployment-tech-ops" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Our Process", href: "/#process" },
  { label: "Contact Us", href: "https://wa.me/919025728998", external: true },
];

const socialLinks = [
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: SiX, label: "X", href: "#" },
  { icon: SiInstagram, label: "Instagram", href: "#" },
  { icon: SiFacebook, label: "Facebook", href: "#" },
  { icon: SiYoutube, label: "YouTube", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-[#E0EEE0] dark:border-border/70 bg-[#E0EEE0]/20 dark:bg-muted/15 pt-16 pb-10">
      <div className="container mx-auto px-4 md:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block transition-opacity hover:opacity-90 self-start" aria-label="INWORA home">
              <img
                src={inworaStacked}
                alt="INWORA Technologies"
                className="h-24 sm:h-28 w-auto object-contain dark:hidden"
              />
              <img
                src={inworaStackedWhite}
                alt="INWORA Technologies"
                className="h-24 sm:h-28 w-auto object-contain hidden dark:block"
              />
            </Link>
            <div className="inline-flex items-center gap-1.5 self-start rounded-full bg-[#E0EEE0] dark:bg-primary/20 px-3 py-1 text-[11px] font-bold tracking-wide text-[#185e18] dark:text-[#8ce68c]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#228B22]" />
              Innovate, Automate, Scale
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              A premium IT product &amp; engineering company delivering scalable mobile apps, turnkey SaaS portals, and subscription software for businesses across Tamil Nadu.
            </p>

            {/* Social Links */}
            <div className="flex gap-2.5 pt-1">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E0EEE0] dark:border-border bg-card text-muted-foreground hover:text-[#228B22] hover:border-[#228B22]/50 hover:bg-[#E0EEE0]/40 transition-all shadow-2xs"
                  data-testid={`link-social-${s.label.toLowerCase()}`}
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <div className="brand-structure-bar mb-4">
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Products</h4>
            </div>
            <ul className="space-y-3">
              {productLinks.map((l) => (
                <li key={l.label}>
                  {l.external ? (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-[#228B22] transition-colors flex items-center gap-1"
                      data-testid={`link-product-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link
                      href={l.href}
                      className="text-sm text-muted-foreground hover:text-[#228B22] transition-colors flex items-center gap-1"
                      data-testid={`link-product-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <div className="brand-structure-bar mb-4">
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Services</h4>
            </div>
            <ul className="space-y-3">
              {serviceLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground hover:text-[#228B22] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + Contact */}
          <div>
            <div className="brand-structure-bar mb-4">
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Company</h4>
            </div>
            <ul className="space-y-3 mb-7">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  {l.external ? (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-[#228B22] transition-colors"
                    >
                      {l.label}
                    </a>
                  ) : l.href.startsWith("/#") ? (
                    <a
                      href={l.href}
                      className="text-sm text-muted-foreground hover:text-[#228B22] transition-colors"
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link
                      href={l.href}
                      className="text-sm text-muted-foreground hover:text-[#228B22] transition-colors"
                    >
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div className="brand-structure-bar mb-3">
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Contact</h4>
            </div>
            <address className="not-italic">
              <ul className="space-y-2.5">
                <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#E0EEE0] dark:bg-primary/20 text-[#228B22]">
                    <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <a href="mailto:info@inwora.com" className="hover:text-[#228B22] transition-colors">info@inwora.com</a>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#E0EEE0] dark:bg-primary/20 text-[#228B22] mt-0.5">
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <a href="tel:+919025728998" className="hover:text-[#228B22] transition-colors font-medium">+91 90257 28998</a>
                    <a href="tel:+917904242107" className="hover:text-[#228B22] transition-colors font-medium">+91 79042 42107</a>
                  </div>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#E0EEE0] dark:bg-primary/20 text-[#228B22] mt-0.5">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span>Tamil Nadu, India</span>
                </li>
              </ul>
            </address>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#E0EEE0] dark:border-border/80 pt-6">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            &copy; {new Date().getFullYear()} INWORA. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
