import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { ArrowLeft, Download, ExternalLink, PlayCircle, Check, FileText } from "lucide-react";
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
        <main className="flex-1 pt-28 md:pt-36 pb-20">
          <div className="container mx-auto px-4 md:px-8 space-y-6">
            <div className="h-[38vh] w-full rounded-xl bg-muted animate-pulse" />
            <div className="h-9 w-2/3 rounded bg-muted animate-pulse" />
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
          <h1 className="text-2xl font-bold text-foreground">
            {notFound ? "Project not found" : "We couldn't load this project"}
          </h1>
          {!notFound && <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>}
          <Button onClick={() => setLocation("/portfolio")} className="mt-5 rounded-lg">
            Back to portfolio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <main className="flex-1 pt-24 md:pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-8">
          {/* Back */}
          <Button
            variant="ghost"
            className="mb-6 -ml-2 h-9 gap-2 text-muted-foreground hover:text-foreground"
            onClick={() => setLocation("/portfolio")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to portfolio
          </Button>

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {project.category}
            </span>
            <h1 className="mt-3 max-w-3xl text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-foreground">
              {project.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Banner */}
          <div className="mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-md">
            <img src={project.banner} alt={project.title} className="h-full w-full object-cover object-center" />
          </div>

          {/* Body */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
            {/* Left */}
            <div className="lg:col-span-2 space-y-12">
              <section>
                <h2 className="mb-4 text-xl font-bold tracking-tight text-foreground">Project overview</h2>
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground">{project.fullDesc}</p>
              </section>

              <section>
                <h2 className="mb-5 text-xl font-bold tracking-tight text-foreground">Key features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
                    >
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span className="text-sm text-foreground/90">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>

              {project.videoUrl && (
                <section>
                  <h2 className="mb-5 flex items-center gap-2 text-xl font-bold tracking-tight text-foreground">
                    <PlayCircle className="h-5 w-5 text-primary" />
                    Working demo
                  </h2>
                  <div className="aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted">
                    <iframe
                      className="h-full w-full"
                      src={project.videoUrl}
                      title={`${project.title} demo`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </section>
              )}
            </div>

            {/* Right */}
            <div>
              <div className="sticky top-24 space-y-4">
                {project.liveUrl && (
                  <div className="rounded-xl bg-primary p-6 text-primary-foreground">
                    <h3 className="text-base font-semibold">Experience it live</h3>
                    <p className="mt-1.5 text-sm text-primary-foreground/80">
                      See the application in action with our live deployment.
                    </p>
                    <Button
                      variant="secondary"
                      className="mt-5 w-full rounded-lg bg-white text-primary hover:bg-white/90"
                      onClick={() => window.open(project.liveUrl!, "_blank")}
                    >
                      Visit website
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}

                {project.pdfUrl && (
                  <button
                    onClick={() => window.open(project.pdfUrl!, "_blank")}
                    className="group w-full rounded-xl border border-border bg-card p-6 text-left transition-colors hover:border-primary/40"
                  >
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <FileText className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground">Project presentation</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      Download the full project deck and technical specifications.
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      Download PDF
                      <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                    </span>
                  </button>
                )}

                <div className="rounded-xl border border-border bg-muted/40 p-6">
                  <h3 className="text-base font-semibold text-foreground">Interested?</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    Let's discuss how we can build a similar solution for your business.
                  </p>
                  <Button
                    onClick={handleRequestQuote}
                    variant="outline"
                    className="mt-5 w-full rounded-lg"
                  >
                    Request a quote
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
