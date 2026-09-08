import { ArrowUpRight } from 'lucide-react';
import { config } from '../data/config';

export function ProblemSolving() {
  return (
    <section id="problem-solving" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          <div className="lg:col-span-5">
            <p className="text-xs md:text-sm font-medium text-muted tracking-[0.2em] uppercase mb-4">
              04 / PROBLEM SOLVING
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance mb-6 leading-[1.15]">
              Always learning.<br />
              Always shipping.
            </h2>
            <p className="text-base md:text-lg text-muted mb-8 leading-relaxed">
              A strong foundation in data structures and algorithms, paired with consistent hands-on project development.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href={config.socials.github} 
                target="_blank" 
                rel="noreferrer"
                data-interactive="true"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium bg-foreground text-background hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all rounded-none"
              >
                View GitHub <ArrowUpRight className="w-4 h-4 ml-2" />
              </a>
              <a 
                href={config.socials.leetcode} 
                target="_blank" 
                rel="noreferrer"
                data-interactive="true"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium border border-white/20 bg-transparent hover:bg-white/5 hover:border-white/40 text-foreground transition-all rounded-none"
              >
                View LeetCode <ArrowUpRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-8 bg-white/[0.02] border border-white/10 rounded-xl flex flex-col justify-center min-h-[170px]">
                <p className="text-4xl md:text-5xl font-bold mb-2 text-foreground">{config.stats.problemsSolved}</p>
                <p className="text-xs text-muted font-medium uppercase tracking-[0.2em]">Problems Solved</p>
              </div>
              <div className="p-8 bg-white/[0.02] border border-white/10 rounded-xl flex flex-col justify-center min-h-[170px]">
                <p className="text-4xl md:text-5xl font-bold mb-2 text-foreground">{config.stats.repositories}</p>
                <p className="text-xs text-muted font-medium uppercase tracking-[0.2em]">Repositories</p>
              </div>
              <div className="sm:col-span-2 p-8 bg-white/[0.02] border border-white/10 rounded-xl flex flex-col justify-center min-h-[170px]">
                <p className="text-4xl md:text-5xl font-bold mb-2 text-foreground">{config.stats.projects}</p>
                <p className="text-xs text-muted font-medium uppercase tracking-[0.2em]">Projects Built</p>
                
                {/* Visual contribution representation */}
                <div className="mt-6 p-4 border border-white/10 rounded-lg bg-black/30 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-xs text-muted font-mono">Continuous Active Commits & Daily Practice</span>
                  </div>
                  <span className="text-xs text-muted/60 font-mono hidden sm:inline">2024–2026</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
