import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { projects } from '../data/projects';

export function CaseStudy() {
  const { slug } = useParams();
  
  const project = projects.find(p => p.id === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <Link to="/" data-interactive="true" className="text-muted hover:text-white flex items-center text-sm">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to home
        </Link>
      </div>
    );
  }

  const { caseStudy } = project;

  return (
    <main className="pt-32 pb-24 min-h-screen relative">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        <Link 
          to="/" 
          data-interactive="true"
          className="inline-flex items-center text-xs md:text-sm font-medium text-muted hover:text-white transition-colors mb-12 uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to work
        </Link>

        <header className="mb-16">
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-xs font-mono text-muted">{project.number}</span>
            <span className="h-px w-6 bg-white/20" />
            <span className="text-xs font-medium tracking-[0.15em] uppercase text-muted">
              {project.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance leading-[1.1]">
            {project.title}
          </h1>
          <p className="text-lg md:text-xl text-muted leading-relaxed mb-10 text-balance">
            {caseStudy.summary}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-white/10">
            <div>
              <p className="text-xs font-bold text-foreground tracking-[0.2em] uppercase mb-1.5">Role</p>
              <p className="text-xs md:text-sm text-muted">{caseStudy.role}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-foreground tracking-[0.2em] uppercase mb-1.5">Timeline</p>
              <p className="text-xs md:text-sm text-muted">{caseStudy.timeline}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs font-bold text-foreground tracking-[0.2em] uppercase mb-1.5">Technology</p>
              <p className="text-xs md:text-sm text-muted">{project.technologies.join(', ')}</p>
            </div>
          </div>
        </header>

        <div className="space-y-16 text-muted leading-relaxed">
          
          <section className="p-8 border border-white/10 bg-white/[0.015] rounded-xl">
            <p className="text-xs font-bold text-foreground tracking-[0.2em] uppercase mb-3">01 / THE PROBLEM</p>
            <p className="text-base text-muted leading-relaxed">{caseStudy.problem}</p>
          </section>

          <section className="p-8 border border-white/10 bg-white/[0.015] rounded-xl">
            <p className="text-xs font-bold text-foreground tracking-[0.2em] uppercase mb-3">02 / THE APPROACH</p>
            <p className="text-base text-muted leading-relaxed">{caseStudy.approach}</p>
          </section>

          <section className="p-8 border border-white/10 bg-white/[0.015] rounded-xl">
            <p className="text-xs font-bold text-foreground tracking-[0.2em] uppercase mb-3">03 / ENGINEERING</p>
            <p className="text-base text-muted leading-relaxed">{caseStudy.engineering}</p>
          </section>

          <section className="p-8 border border-white/10 bg-white/[0.015] rounded-xl">
            <p className="text-xs font-bold text-foreground tracking-[0.2em] uppercase mb-3">04 / CHALLENGES</p>
            <p className="text-base text-muted leading-relaxed">{caseStudy.challenges}</p>
          </section>

          {caseStudy.outcome && (
            <section className="p-8 border border-white/10 bg-white/[0.015] rounded-xl">
              <p className="text-xs font-bold text-foreground tracking-[0.2em] uppercase mb-3">05 / OUTCOME</p>
              <p className="text-base text-muted leading-relaxed">{caseStudy.outcome}</p>
            </section>
          )}

          <section className="p-8 border border-white/10 bg-white/[0.015] rounded-xl">
            <p className="text-xs font-bold text-foreground tracking-[0.2em] uppercase mb-3">
              {caseStudy.outcome ? '06' : '05'} / WHAT I LEARNED
            </p>
            <p className="text-base text-muted leading-relaxed">{caseStudy.learned}</p>
          </section>

        </div>

        <div className="mt-20 pt-8 border-t border-white/10 flex justify-between items-center">
          <Link 
            to="/" 
            data-interactive="true"
            className="inline-flex items-center text-xs md:text-sm font-medium text-foreground hover:text-white transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to work
          </Link>
        </div>

      </div>
    </main>
  );
}
