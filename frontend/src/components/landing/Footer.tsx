import { SiX, SiInstagram, SiFacebook, SiYoutube } from "react-icons/si";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import inworaLogo from "@assets/ibk_icon.png";

const productLinks = [
  { label: "Gold Poster App", href: "#products" },
  { label: "POS & KOT Software", href: "#products" },
  { label: "Mobile App Solutions", href: "#products" },
  { label: "Subscription Plans", href: "#pricing" },
];

const serviceLinks = [
  { label: "Custom Mobile Apps", href: "#services" },
  { label: "SaaS Development", href: "#services" },
  { label: "UI/UX Design", href: "#services" },
  { label: "Business Automation", href: "#services" },
  { label: "Cloud Deployment", href: "#services" },
];

const companyLinks = [
  { label: "About Us", href: "#about" },
  { label: "How We Work", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: SiX, label: "X", href: "#" },
  { icon: SiInstagram, label: "Instagram", href: "#" },
  { icon: SiFacebook, label: "Facebook", href: "#" },
  { icon: SiYoutube, label: "YouTube", href: "#" },
];

const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  const el = document.querySelector(href);
  if (el) {
    const offset = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: offset, behavior: "smooth" });
  }
};

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-muted/30 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1">
            <img src={inworaLogo} alt="INWORA Logo" className="h-14 w-14 object-contain rounded-2xl" />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              A premium IT product company building mobile apps, SaaS platforms, and subscription software for businesses worldwide.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors"
                  data-testid={`link-social-${s.label.toLowerCase()}`}
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Products</h4>
            <ul className="space-y-3">
              {productLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={(e) => scrollToSection(e, l.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    data-testid={`link-product-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={(e) => scrollToSection(e, l.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + Contact */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-3 mb-7">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={(e) => scrollToSection(e, l.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider">Contact</h4>
            <address className="not-italic">
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-3.5 w-3.5 flex-shrink-0 text-primary" aria-hidden="true" />
                  <a href="mailto:info@inwora.com" className="hover:text-primary transition-colors">info@inwora.com</a>
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-3.5 w-3.5 flex-shrink-0 text-primary" aria-hidden="true" />
                  <a href="tel:+919047370027" className="hover:text-primary transition-colors">+91 90473 70027</a>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-primary mt-0.5" aria-hidden="true" />
                  <span>India</span>
                </li>
              </ul>
            </address>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border pt-6">
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
