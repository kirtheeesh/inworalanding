import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import TrustStrip from "@/components/landing/TrustStrip";
import ClientLogos from "@/components/landing/ClientLogos";
import Products from "@/components/landing/Products";
import WhyChoose from "@/components/landing/WhyChoose";
import Process from "@/components/landing/Process";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";
import WhatsAppButton from "@/components/landing/WhatsAppButton";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <ClientLogos />
        <Products />
        <WhyChoose />
        <Process />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
