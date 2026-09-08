import { hackathons } from '../data/experience';

export function Hackathons() {
  return (
    <section id="hackathons" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24">
          <p className="text-xs md:text-sm font-medium text-muted tracking-[0.2em] uppercase mb-4">
            05 / HACKATHONS
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Building under pressure.
          </h2>
        </div>

        <div className="space-y-10 max-w-4xl">
          {hackathons.map((hackathon: any, idx: number) => (
            <div 
              key={idx} 
              className="p-8 md:p-10 border border-white/10 bg-white/[0.015] rounded-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-foreground/20 group-hover:bg-foreground transition-colors duration-300" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-white/5">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-1 text-foreground">{hackathon.name}</h3>
                  <p className="text-xs font-mono text-muted tracking-wider">TEAM: {hackathon.team}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-bold text-foreground tracking-[0.2em] uppercase mb-2">Problem</h4>
                  <p className="text-sm text-muted leading-relaxed">{hackathon.problem}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground tracking-[0.2em] uppercase mb-2">Solution</h4>
                  <p className="text-sm text-muted leading-relaxed">{hackathon.solution}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground tracking-[0.2em] uppercase mb-2">Technology</h4>
                  <p className="text-sm text-muted leading-relaxed">{hackathon.technologies}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground tracking-[0.2em] uppercase mb-2">Result</h4>
                  <p className="text-sm text-muted leading-relaxed">{hackathon.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
