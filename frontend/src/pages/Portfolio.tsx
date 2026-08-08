import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { ArrowRight, Briefcase, Rocket, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/landing/_shared";
import { Link } from "wouter";
import { resolveIcon } from "@/lib/portfolio-data";
import { fetchProjects } from "@/lib/api";

const values = [
  { icon: Rocket, title: "Innovation first", desc: "Always pushing the boundaries of what's possible with modern tech stacks." },
  { icon: Briefcase, title: "Business driven", desc: "We don't just write code — we build competitive advantages for our partners." },
  { icon: Layout, title: "Pixel perfect", desc: "Meticulous attention to detail in every interface and user interaction." },
];

export default function Portfolio() {
  const { data: projects, isPending, isError, error } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <main className="flex-1 pt-28 md:pt-36 pb-24">
        <div className="container mx-auto px-4 md:px-8">
          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <Eyebrow>Our portfolio</Eyebrow>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight text-foreground">
              Digital products we've shipped
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              From scalable SaaS platforms to custom mobile solutions, our portfolio reflects a commitment to innovation
              and measurable business growth.
            </p>
          </motion.div>

          {/* Values */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-1.5 text-base font-semibold text-foreground">{v.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div className="mt-20">
            <div className="mb-8 flex items-end justify-between border-b border-border pb-5">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">Featured projects</h2>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Shipping globally</p>
            </div>

            {isPending && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
                    <div className="aspect-[16/9] w-full bg-muted animate-pulse" />
                    <div className="p-6 space-y-4">
                      <div className="h-10 w-10 rounded-lg bg-muted animate-pulse" />
                      <div className="h-5 w-3/4 rounded bg-muted animate-pulse" />
                      <div className="h-4 w-full rounded bg-muted animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {isError && (
              <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-10 text-center">
                <h3 className="mb-1 text-lg font-semibold text-foreground">We couldn't load the projects</h3>
                <p className="text-sm text-muted-foreground">{error.message}</p>
              </div>
            )}

            {projects && projects.length === 0 && (
              <div className="rounded-xl border border-border bg-muted/30 p-12 text-center">
                <p className="text-muted-foreground">No projects have been published yet — check back soon.</p>
              </div>
            )}

            {projects && projects.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, i) => {
                  const Icon = resolveIcon(project.icon);

                  return (
                    <Link key={project.id} href={`/portfolio/${project.id}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.45, delay: Math.min(i * 0.05, 0.3) }}
                        className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-md cursor-pointer"
                      >
                        <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                          <img
                            src={project.banner}
                            alt={project.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        <div className="flex flex-1 flex-col p-6">
                          <div className="mb-4 flex items-start justify-between gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                              <Icon className="h-5 w-5" />
                            </div>
                            <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                              {project.category}
                            </span>
                          </div>

                          <h3 className="mb-1.5 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                            {project.title}
                          </h3>
                          <p className="mb-5 line-clamp-2 text-sm text-muted-foreground">{project.desc}</p>

                          <div className="mt-auto flex flex-wrap gap-2">
                            {project.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="rounded-md bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="mt-24 rounded-2xl border border-border bg-muted/30 p-10 md:p-14 text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Have a vision for your next project?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Let's collaborate to build something extraordinary. Our team is ready to turn your ideas into
              market-leading digital products.
            </p>
            <Button
              size="lg"
              className="mt-8 rounded-lg"
              onClick={() => window.open("mailto:hello@inwora.com")}
            >
              Get in touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
