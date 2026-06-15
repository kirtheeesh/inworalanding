import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { projects } from "@/lib/portfolio-data";
import { ArrowLeft, Download, ExternalLink, PlayCircle, CheckCircle2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function ProjectDetails() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Project Not Found</h1>
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
        <div className="relative h-[40vh] md:h-[60vh] w-full overflow-hidden">
          <img 
            src={project.banner} 
            alt={project.title} 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
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
                <span className="inline-block rounded-full bg-primary/20 backdrop-blur-sm px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-4">
                  {project.category}
                </span>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4" style={{ fontFamily: "var(--app-font-display)" }}>
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
                      onClick={() => window.open(project.liveUrl, "_blank")}
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
                    onClick={() => window.open(project.pdfUrl, "_blank")}
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
                  <Button variant="outline" className="w-full h-12 rounded-xl border-primary text-primary hover:bg-primary/5">
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
