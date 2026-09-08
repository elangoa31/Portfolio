import { journey } from '../data/experience';

export function Journey() {
  return (
    <section id="journey" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24">
          <p className="text-xs md:text-sm font-medium text-muted tracking-[0.2em] uppercase mb-4">
            06 / JOURNEY
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Milestones & experience.
          </h2>
        </div>

        <div className="max-w-3xl border-l border-white/10 ml-2 md:ml-4 space-y-16">
          {journey.map((item: any, idx: number) => (
            <div key={idx} className="relative pl-8 md:pl-12 group">
              <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#06080e] border-2 border-white/40 group-hover:border-white transition-colors" />
              <div className="flex flex-col">
                <span className="text-xs font-mono text-muted mb-2 tracking-wider">{item.year}</span>
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground">{item.title}</h3>
                {item.description && (
                  <p className="text-muted text-sm md:text-base leading-relaxed">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
