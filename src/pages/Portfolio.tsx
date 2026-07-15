import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { ExternalLink, Briefcase, Rocket, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { projects } from "@/lib/portfolio-data";

const cardVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] } }
};

export default function Portfolio() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-8">
          {/* Intro Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mb-20"
          >
            <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-6">
              Our Portfolio
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6" style={{ fontFamily: "var(--app-font-display)" }}>
              We Build <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">Digital Excellence</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              INWORA is dedicated to crafting high-impact software products. From scalable SaaS platforms to custom mobile solutions, our portfolio reflects our commitment to innovation and business growth.
            </p>
          </motion.div>

          {/* Philosophy Callout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10">
              <Rocket className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Innovation First</h3>
              <p className="text-sm text-muted-foreground">Always pushing the boundaries of what's possible with modern tech stacks.</p>
            </div>
            <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10">
              <Briefcase className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Business Driven</h3>
              <p className="text-sm text-muted-foreground">We don't just write code; we build competitive advantages for our partners.</p>
            </div>
            <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10">
              <Layout className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Pixel Perfect</h3>
              <p className="text-sm text-muted-foreground">Meticulous attention to detail in every interface and user interaction.</p>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="space-y-12">
            <div className="flex items-end justify-between border-b border-border pb-6">
              <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--app-font-display)" }}>Featured Projects</h2>
              <p className="text-sm text-muted-foreground font-medium">SHIPPING SUCCESS GLOBALLY</p>
            </div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {projects.map((project, i) => (
                <Link key={project.id} href={`/portfolio/${project.id}`}>
                  <motion.div
                    variants={cardVariants}
                    whileHover={{ y: -8 }}
                    className="group relative flex flex-col rounded-[2.5rem] border border-border bg-card p-2 transition-all hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 cursor-pointer"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2rem] mb-6">
                      <img 
                        src={project.banner} 
                        alt={project.title} 
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                        <span className="text-white font-bold flex items-center gap-2">
                          View Case Study <ExternalLink className="h-4 w-4" />
                        </span>
                      </div>
                    </div>

                    <div className="px-6 pb-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                          <project.icon className="h-6 w-6" />
                        </div>
                        <span className="text-[10px] font-bold text-primary tracking-widest uppercase py-1 px-3 rounded-full bg-primary/10 border border-primary/20">
                          {project.category}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors" style={{ fontFamily: "var(--app-font-display)" }}>{project.title}</h3>
                      <p className="text-muted-foreground text-sm mb-6 line-clamp-2">{project.desc}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="px-3 py-1 rounded-full bg-muted text-[10px] font-bold tracking-wider uppercase text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </div>

          {/* Final CTA */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mt-32 p-12 rounded-[2.5rem] bg-primary text-white text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 h-64 w-64 bg-white/10 blur-[80px] -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 h-64 w-64 bg-emerald-400/20 blur-[80px] -ml-32 -mb-32" />
            
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 relative z-10">Have a vision for your next project?</h2>
            <p className="text-white/80 max-w-xl mx-auto mb-10 relative z-10">
              Let's collaborate to build something extraordinary. Our team is ready to turn your ideas into market-leading digital products.
            </p>
            <Button size="lg" variant="secondary" className="rounded-full px-10 h-14 text-primary font-bold relative z-10" onClick={() => window.open("mailto:hello@inwora.com")}>
              Get In Touch
            </Button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
