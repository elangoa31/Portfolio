export function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          <div className="lg:col-span-5">
            <p className="text-xs md:text-sm font-medium text-muted tracking-[0.2em] uppercase mb-4">
              01 / ABOUT
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance leading-[1.15]">
              Engineer by curiosity.<br />
              Builder by habit.
            </h2>
          </div>

          <div className="lg:col-span-7">
            <div className="prose prose-invert prose-lg max-w-none text-muted leading-relaxed font-normal">
              <p className="mb-6 text-foreground text-lg md:text-xl font-medium leading-relaxed">
                I'm Elango, a software developer focused on building useful products rather than simply writing code.
              </p>
              <p className="mb-6 text-sm md:text-base leading-relaxed">
                I enjoy working across frontend, backend, mobile development and AI systems, while continuously improving my problem-solving skills through data structures, algorithms and hands-on projects.
              </p>
              <p className="mb-10 text-sm md:text-base leading-relaxed">
                I'm currently focused on becoming a stronger full-stack engineer and building products that solve practical problems.
              </p>
            </div>

            <div className="p-6 md:p-8 bg-white/[0.03] border border-white/10 rounded-2xl">
              <h3 className="text-xs font-semibold text-foreground tracking-[0.2em] uppercase mb-4">
                Currently exploring
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm text-muted">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-300/60 rounded-full mr-3" />
                  AI agents
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-300/60 rounded-full mr-3" />
                  LLM applications
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-300/60 rounded-full mr-3" />
                  System design
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-300/60 rounded-full mr-3" />
                  Scalable backend architecture
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
