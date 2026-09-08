import { skills } from '../data/skills';

export function Engineering() {
  const categories = [
    { name: 'Languages', items: skills.languages },
    { name: 'Frontend', items: skills.frontend },
    { name: 'Backend', items: skills.backend },
    { name: 'Database / Data', items: skills.database },
    { name: 'Tools', items: skills.tools },
    { name: 'AI', items: skills.ai },
    { name: 'Currently Exploring', items: skills.currentlyExploring },
  ];

  return (
    <section id="engineering" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24">
          <p className="text-xs md:text-sm font-medium text-muted tracking-[0.2em] uppercase mb-4">
            03 / ENGINEERING
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Tools I build with.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">
          {categories.map((category) => (
            <div key={category.name} className="p-6 rounded-xl border border-white/5 bg-white/[0.015] hover:border-white/10 transition-colors">
              <h3 className="text-xs font-bold text-foreground tracking-[0.2em] uppercase mb-5">
                {category.name}
              </h3>
              <ul className="space-y-2.5">
                {category.items.map((item: string, idx: number) => (
                  <li key={`${item}-${idx}`} className="text-muted text-sm flex items-center">
                    <span className="w-1 h-1 rounded-full bg-white/20 mr-2.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
