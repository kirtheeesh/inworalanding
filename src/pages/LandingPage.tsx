import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import TrustStrip from "@/components/landing/TrustStrip";
import ClientLogos from "@/components/landing/ClientLogos";
import Services from "@/components/landing/Services";
import Products from "@/components/landing/Products";
import Pricing from "@/components/landing/Pricing";
import WhyChoose from "@/components/landing/WhyChoose";
import Process from "@/components/landing/Process";
import Testimonials from "@/components/landing/Testimonials";
import About from "@/components/landing/About";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <ClientLogos />
        <Services />
        <Products />
        <Pricing />
        <WhyChoose />
        <Process />
        <Testimonials />
        <About />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
