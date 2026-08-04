import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { ArrowLeft, Download, ExternalLink, PlayCircle, CheckCircle2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { ApiError, fetchProject } from "@/lib/api";

export default function ProjectDetails() {
  const { id } = useParams();
  const [, setLocation] = useLocation();

  const { data: project, isPending, isError, error } = useQuery({
    queryKey: ["projects", id],
    queryFn: () => fetchProject(id!),
    enabled: Boolean(id),
    // A missing project is a real answer, not a blip worth retrying.
    retry: (failureCount, err) =>
      !(err instanceof ApiError && err.status === 404) && failureCount < 2,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleRequestQuote = () => {
    if (!project) return;
    const msg = `Hello INWORA! I am interested in a custom solution similar to the "${project.title}" case study. I'd like to request a quote.`;
    window.open(`https://wa.me/919047370027?text=${encodeURIComponent(msg)}`, "_blank");
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1 pt-32 pb-20">
          <div className="container mx-auto px-4 md:px-8 space-y-8">
            <div className="h-[40vh] w-full rounded-3xl bg-muted animate-pulse" />
            <div className="h-10 w-2/3 rounded bg-muted animate-pulse" />
            <div className="h-4 w-full rounded bg-muted animate-pulse" />
            <div className="h-4 w-5/6 rounded bg-muted animate-pulse" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError) {
    const notFound = error instanceof ApiError && error.status === 404;

    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            {notFound ? "Project Not Found" : "We couldn't load this project"}
          </h1>
          {!notFound && (
            <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
          )}
          <Button onClick={() => setLocation("/portfolio")} className="mt-4">
            Back to Portfolio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        {/* Banner Section */}
        <div className="relative min-h-[50vh] md:h-[60vh] w-full flex items-end overflow-hidden py-12 md:py-16">
          <img 
            src={project.banner} 
            alt={project.title} 
            className="absolute inset-0 h-full w-full object-cover z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-black/10 z-10" />
          
          <div className="relative z-20 w-full px-4 sm:px-8 md:px-16">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Button 
                  variant="ghost" 
                  className="mb-6 -ml-4 text-primary hover:bg-primary/10"
                  onClick={() => setLocation("/portfolio")}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Portfolio
                </Button>
                <div className="mb-4">
                  <span className="inline-block rounded-full bg-primary/20 backdrop-blur-sm px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                    {project.category}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-foreground leading-tight" style={{ fontFamily: "var(--app-font-display)" }}>
                  {project.title}
                </h1>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-background/50 backdrop-blur-sm border border-border/50 text-[10px] font-bold tracking-wider uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-20">
            {/* Left Column: Description & Features */}
            <div className="lg:col-span-2 space-y-12">
              <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ fontFamily: "var(--app-font-display)" }}>
                  Project Overview
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.fullDesc}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: "var(--app-font-display)" }}>Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Video Box */}
              {project.videoUrl && (
                <section>
                  <h2 className="text-2xl font-bold mb-8 flex items-center gap-2" style={{ fontFamily: "var(--app-font-display)" }}>
                    <PlayCircle className="h-6 w-6 text-primary" />
                    Working Demo
                  </h2>
                  <div className="aspect-video w-full rounded-3xl overflow-hidden bg-muted border border-border shadow-2xl">
                    <iframe 
                      className="h-full w-full"
                      src={project.videoUrl} 
                      title={`${project.title} Demo`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                </section>
              )}
            </div>

            {/* Right Column: Actions & Downloads */}
            <div className="space-y-8">
              <div className="sticky top-32 space-y-6">
                {/* Live Link Card */}
                {project.liveUrl && (
                  <div className="p-8 rounded-[2.5rem] bg-primary text-white space-y-6 shadow-xl shadow-primary/20">
                    <h3 className="text-xl font-bold">Experience it Live</h3>
                    <p className="text-white/80 text-sm">See the application in action with our live deployment.</p>
                    <Button 
                      className="w-full h-14 rounded-2xl bg-white text-primary hover:bg-white/90 font-bold text-lg"
                      onClick={() => window.open(project.liveUrl!, "_blank")}
                    >
                      Visit Website
                      <ExternalLink className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                )}

                {/* Presentation PDF Container */}
                {project.pdfUrl && (
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="group p-8 rounded-[2.5rem] border-2 border-primary/20 bg-card cursor-pointer transition-all hover:border-primary/50"
                    onClick={() => window.open(project.pdfUrl!, "_blank")}
                  >
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                      <FileText className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Project Presentation</h3>
                    <p className="text-sm text-muted-foreground mb-6">Download the full project deck and technical specifications.</p>
                    <div className="flex items-center text-primary font-bold gap-2 group-hover:gap-4 transition-all">
                      Download PDF
                      <Download className="h-5 w-5" />
                    </div>
                  </motion.div>
                )}
                
                <div className="p-8 rounded-[2.5rem] bg-muted/50 border border-border">
                  <h3 className="text-lg font-bold mb-4">Interested?</h3>
                  <p className="text-sm text-muted-foreground mb-6">Let's discuss how we can build a similar solution for your business.</p>
                  <Button onClick={handleRequestQuote} variant="outline" className="w-full h-12 rounded-xl border-primary text-primary hover:bg-primary/5">
                    Request a Quote
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
