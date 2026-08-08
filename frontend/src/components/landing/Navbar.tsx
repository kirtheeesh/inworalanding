import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import inworaLogo from "@assets/inwora_logo.png";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/#services" },
  { name: "Products", href: "/#products" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Pricing", href: "/#pricing" },
  { name: "About", href: "/#about" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBookDemo = () => {
    const msg = "Hello INWORA! I would like to book a demo for your digital products and services. Please guide me on the next steps.";
    window.open(`https://wa.me/919047370027?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);

    if (href.startsWith("/#") || href === "/") {
      const hash = href.includes("#") ? href.split("#")[1] : "home";
      const isHomePage = window.location.pathname === "/";

      if (isHomePage) {
        e.preventDefault();
        const element = document.querySelector(hash === "home" ? "#home" : `#${hash}`);
        if (element) {
          const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: offsetTop, behavior: "smooth" });
        }
      }
    }
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        isScrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => handleLinkClick(e, "/")}
            className="flex items-center"
            aria-label="INWORA home"
          >
            <img
              src={inworaLogo}
              alt="INWORA"
              className="h-9 w-auto object-contain rounded-md bg-white px-1.5 py-1 ring-1 ring-black/5"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center" aria-label="Main navigation">
            <ul className="flex items-center gap-1" role="list">
              {navLinks.map((link) => {
                const cls =
                  "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted";
                return (
                  <li key={link.name}>
                    {link.href.startsWith("/#") || link.href === "/" ? (
                      <a href={link.href} onClick={(e) => handleLinkClick(e, link.href)} className={cls}>
                        {link.name}
                      </a>
                    ) : (
                      <Link href={link.href} className={cls}>
                        {link.name}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="ml-3 flex items-center gap-2 border-l border-border pl-3">
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Sun className="h-4.5 w-4.5 hidden dark:block" />
                <Moon className="h-4.5 w-4.5 block dark:hidden" />
              </button>
              <Button onClick={handleBookDemo} className="rounded-lg font-medium">
                Book a demo
              </Button>
            </div>
          </nav>

          {/* Mobile toggles */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Sun className="h-5 w-5 hidden dark:block" />
              <Moon className="h-5 w-5 block dark:hidden" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="flex h-9 w-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted"
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
            <nav id="mobile-nav" aria-label="Mobile navigation" className="container mx-auto px-4 py-4 flex flex-col">
              {navLinks.map((link) =>
                link.href.startsWith("/#") || link.href === "/" ? (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="rounded-md px-3 py-2.5 text-[15px] font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-md px-3 py-2.5 text-[15px] font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    {link.name}
                  </Link>
                )
              )}
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
