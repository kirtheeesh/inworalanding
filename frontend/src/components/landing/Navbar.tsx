import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import inworaStacked from "@assets/inwora-stacked.png";
import inworaStackedWhite from "@assets/inwora-stacked-white.png";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Products", href: "/products" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBookDemo = () => {
    window.dispatchEvent(new CustomEvent("open-schedule-demo"));
  };

  const isLinkActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        isScrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md shadow-xs"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex h-18 md:h-20 items-center justify-between py-1">
          {/* Logo - Top/Bottom Stacked as uploaded */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center group transition-opacity hover:opacity-90"
            aria-label="INWORA home"
          >
            <img
              src={inworaStacked}
              alt="INWORA Technologies"
              className="h-14 sm:h-16 w-auto object-contain dark:hidden"
            />
            <img
              src={inworaStackedWhite}
              alt="INWORA Technologies"
              className="h-14 sm:h-16 w-auto object-contain hidden dark:block"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center" aria-label="Main navigation">
            <ul className="flex items-center gap-1" role="list">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={cn(
                        "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                        active
                          ? "bg-secondary text-primary font-semibold border border-primary/20 shadow-2xs"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                      )}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="ml-3 flex items-center border-l border-border pl-3">
              <Button onClick={handleBookDemo} className="brand-btn-primary rounded-full px-5 text-sm font-semibold shadow-xs">
                Book a Demo
              </Button>
            </div>
          </nav>

          {/* Mobile toggles */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="flex h-9 w-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden overflow-hidden border-b border-border bg-background/95 backdrop-blur-md"
          >
            <nav id="mobile-nav" aria-label="Mobile navigation" className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "rounded-md px-3.5 py-2.5 text-[15px] font-medium transition-colors",
                      active
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Button onClick={handleBookDemo} className="mt-3 w-full rounded-lg" size="lg">
                Book a demo
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
