import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

export function Work() {
  return (
    <section id="work" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24">
          <p className="text-xs md:text-sm font-medium text-muted tracking-[0.2em] uppercase mb-4">
            02 / SELECTED WORK
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Things I've built.
          </h2>
        </div>

        <div className="space-y-28 md:space-y-36">
          {projects.map((project, idx) => (
            <div 
              key={project.id} 
              className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
            >
              
              {/* Project Media Visual */}
              <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'} order-2`}>
                <Link
                  to={`/projects/${project.id}`}
                  data-interactive="true"
                  className="block relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/10 aspect-[16/10] group/card transition-all duration-500 hover:border-white/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/20 via-transparent to-white/[0.02] opacity-40 group-hover/card:opacity-90 transition-opacity duration-500" />
                  
                  {/* Subtle editorial card graphic & preview */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-4 bg-white/[0.02] text-muted group-hover/card:text-white group-hover/card:scale-110 group-hover/card:border-white/30 transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono tracking-widest text-muted/60 uppercase group-hover/card:text-muted transition-colors">
                      {project.title} · Case Study
                    </span>
                  </div>

                  <motion.div 
                    className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
                  />
                </Link>
              </div>

              {/* Project Info */}
              <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'} order-1 flex flex-col justify-center`}>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-xs font-mono text-muted">{project.number}</span>
                  <span className="h-px w-6 bg-white/20" />
                  <span className="text-xs font-medium tracking-[0.15em] uppercase text-muted">
                    {project.category}
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-white transition-colors duration-300 tracking-tight">
                  <Link to={`/projects/${project.id}`} data-interactive="true" className="hover:underline underline-offset-4 decoration-white/30">
                    {project.title}
                  </Link>
                </h3>
                
                <p className="text-sm md:text-base text-muted mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.map(tech => (
                    <span key={tech} className="px-3 py-1 text-xs font-medium border border-white/10 bg-white/[0.02] rounded-none text-muted">
                      {tech}
                    </span>
                  ))}
                </div>

                <Link 
                  to={`/projects/${project.id}`}
                  data-interactive="true"
                  className="inline-flex items-center text-sm font-medium text-foreground hover:text-white transition-colors group/link w-fit"
                >
                  View case study 
                  <ArrowUpRight className="w-4 h-4 ml-2 opacity-60 group-hover/link:opacity-100 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-all" />
                </Link>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
