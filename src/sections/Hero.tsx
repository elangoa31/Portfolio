import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';

export function Hero() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [imageParallax, setImageParallax] = useState({ x: 0, y: 0 });
  const [isInteractive, setIsInteractive] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkInteractive = () => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsInteractive(!isTouch && !prefersReducedMotion);
    };

    checkInteractive();
    window.addEventListener('resize', checkInteractive);
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', checkInteractive);

    const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) {
      return () => {
        window.removeEventListener('resize', checkInteractive);
        motionQuery.removeEventListener('change', checkInteractive);
      };
    }

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;
      targetX = normX;
      targetY = normY;
    };

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      setMouseOffset({
        x: Math.round(currentX * 3.5 * 10) / 10,
        y: Math.round(currentY * 3.5 * 10) / 10,
      });
      animId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('resize', checkInteractive);
      motionQuery.removeEventListener('change', checkInteractive);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isInteractive || !imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    // Normalized offset from container center (-1 to 1)
    const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    // Subtle parallax shift toward cursor: maximum ±6px
    const clampedX = Math.max(-6, Math.min(6, normX * 6));
    const clampedY = Math.max(-6, Math.min(6, normY * 6));

    setImageParallax({
      x: Math.round(clampedX * 10) / 10,
      y: Math.round(clampedY * 10) / 10,
    });
  };

  const handleImageMouseEnter = () => {
    if (!isInteractive) return;
    setIsImageHovered(true);
  };

  const handleImageMouseLeave = () => {
    setIsImageHovered(false);
    setImageParallax({ x: 0, y: 0 });
  };

  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[92vh] flex items-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Hero Content (Strict Left Grid Alignment) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-full"
            >
              <p className="text-xs md:text-sm tracking-[0.2em] text-muted mb-6 uppercase font-medium">
                SOFTWARE DEVELOPER · AI BUILDER
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
              className="text-[clamp(2.5rem,5.5vw,4.75rem)] font-bold tracking-tight leading-[1.08] mb-8 text-foreground"
            >
              Building software<br />
              that solves real problems.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16, ease: 'easeOut' }}
              className="text-base md:text-lg lg:text-xl text-muted max-w-xl mb-10 leading-relaxed font-normal"
            >
              I build thoughtful digital products across software engineering, AI, mobile and the web.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24, ease: 'easeOut' }}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <Button onClick={scrollToWork}>
                View Selected Work
              </Button>
              <Button variant="outline" onClick={scrollToContact}>
                Get In Touch
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center text-xs md:text-sm text-muted"
            >
              <span className="relative flex h-2 w-2 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Open to internships & software opportunities
            </motion.div>
          </div>

          {/* Right Column: Profile Photo with Subtle Halo & Interactive Depth */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
              style={{
                transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="relative w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[420px] group"
            >
              {/* Understated cosmic halo sitting subtly behind the portrait */}
              <div 
                aria-hidden="true" 
                className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-blue-900/15 via-indigo-900/10 to-transparent blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
              />

              {/* Fixed-size image container with rounded corners and overflow hidden */}
              <div
                ref={imageContainerRef}
                onMouseEnter={handleImageMouseEnter}
                onMouseMove={handleImageMouseMove}
                onMouseLeave={handleImageMouseLeave}
                className="relative aspect-square rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] shadow-[0_20px_50px_rgba(0,0,0,0.6)] select-none"
              >
                <motion.img
                  src="/profile.jpeg"
                  onError={(e) => {
                    // Fallback in case profile.jpg is requested
                    const target = e.currentTarget;
                    if (!target.src.endsWith('/profile.jpg')) {
                      target.src = '/profile.jpg';
                    }
                  }}
                  alt="Elango A — Software Developer"
                  animate={{
                    scale: isInteractive && isImageHovered ? 1.07 : 1,
                    x: isInteractive && isImageHovered ? imageParallax.x : 0,
                    y: isInteractive && isImageHovered ? imageParallax.y : 0,
                  }}
                  transition={{
                    scale: {
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    },
                    x: {
                      duration: 0.25,
                      ease: 'easeOut',
                    },
                    y: {
                      duration: 0.25,
                      ease: 'easeOut',
                    },
                  }}
                  className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-[filter] duration-500 will-change-transform pointer-events-none"
                />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
