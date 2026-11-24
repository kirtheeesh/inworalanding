import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { ThemeProvider } from "@/components/ThemeProvider";
import LandingPage from "@/pages/LandingPage";

// Secondary pages are code-split so the home page downloads less JavaScript.
const ServicesPage = lazy(() => import("@/pages/Services"));
const ProductsPage = lazy(() => import("@/pages/Products"));
const AboutPage = lazy(() => import("@/pages/About"));
const Portfolio = lazy(() => import("@/pages/Portfolio"));
const ProjectDetails = lazy(() => import("@/pages/ProjectDetails"));
import ScheduleDemoModal from "@/components/landing/ScheduleDemoModal";
import { MetaPixelRouteTracker } from "@/lib/meta-pixel";
import ConsentBanner from "@/components/ConsentBanner";

const queryClient = new QueryClient();

function Router() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" aria-busy="true" />}>
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/services" component={ServicesPage} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/portfolio/:id" component={ProjectDetails} />
      <Route component={NotFound} />
    </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="inwora-theme">
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <MetaPixelRouteTracker />
            <Router />
          </WouterRouter>
          <ScheduleDemoModal />
          <ConsentBanner />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;