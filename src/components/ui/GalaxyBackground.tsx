import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  vx: number;
  vy: number;
}

interface DustParticle {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  color: string;
  vx: number;
  vy: number;
  angle: number;
  orbitalRadius: number;
  orbitalSpeed: number;
}

interface GlowParticle {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  glowRadius: number;
  color: string;
  vx: number;
  vy: number;
}

export function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animId: number | null = null;
    let width = 0;
    let height = 0;

    // Check device & motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;

    // Mouse tracking for parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouch || prefersReducedMotion) return;
      const normX = (e.clientX / window.innerWidth) * 2 - 1; // -1 to 1
      const normY = (e.clientY / window.innerHeight) * 2 - 1; // -1 to 1
      targetMouseX = normX;
      targetMouseY = normY;
    };

    const handleMouseLeave = () => {
      targetMouseX = 0;
      targetMouseY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Resize handling
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Initialize Layers
    const starCount = isTouch ? 60 : 160;
    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 0.75 + 0.35, // 0.35px - 1.1px
        baseAlpha: Math.random() * 0.5 + 0.25,
        twinkleSpeed: (Math.random() * 0.02 + 0.008) * (Math.random() > 0.5 ? 1 : -1),
        twinklePhase: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.04, // extremely slow drift
        vy: (Math.random() - 0.5) * 0.04,
      });
    }

    const dustCount = isTouch ? 25 : 65;
    const dustParticles: DustParticle[] = [];
    const dustColors = [
      'rgba(180, 210, 255, ',
      'rgba(140, 180, 240, ',
      'rgba(220, 235, 255, ',
      'rgba(120, 150, 210, ',
    ];

    for (let i = 0; i < dustCount; i++) {
      dustParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 0.9 + 0.4,
        baseAlpha: Math.random() * 0.35 + 0.1,
        color: dustColors[Math.floor(Math.random() * dustColors.length)],
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        angle: Math.random() * Math.PI * 2,
        orbitalRadius: Math.random() * 200 + 100,
        orbitalSpeed: (Math.random() * 0.0003 + 0.0001) * (Math.random() > 0.5 ? 1 : -1),
      });
    }

    const glowCount = isTouch ? 8 : 20;
    const glowParticles: GlowParticle[] = [];
    const glowColors = [
      'rgba(200, 225, 255, ',
      'rgba(165, 200, 255, ',
      'rgba(240, 248, 255, ',
    ];

    for (let i = 0; i < glowCount; i++) {
      glowParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.0 + 1.0,
        alpha: Math.random() * 0.4 + 0.25,
        glowRadius: Math.random() * 6 + 4,
        color: glowColors[Math.floor(Math.random() * glowColors.length)],
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
      });
    }

    // Orbital curves angle
    let orbitAngle = 0;

    // Track scroll for dynamic section intensity (Req 15)
    let scrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Calculate section-based intensity multiplier
    const getIntensity = () => {
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        window.innerHeight * 4
      );
      const progress = scrollY / (docHeight - window.innerHeight || 1);

      // Hero (top): 1.0
      // About (~0.15): 0.4
      // Projects (~0.35): 0.25
      // Engineering (~0.6): 0.45
      // Journey (~0.8): 0.35
      // Contact (bottom ~1.0): 0.85
      if (progress < 0.15) {
        return 1.0 - progress * 4.0; // 1.0 down to ~0.4
      } else if (progress < 0.45) {
        return 0.3 + (0.45 - progress) * 0.3; // ~0.25-0.35
      } else if (progress < 0.75) {
        return 0.4;
      } else {
        return 0.4 + (progress - 0.75) * 1.8; // scales up to ~0.85 near contact
      }
    };

    let isPaused = false;
    const handleVisibilityChange = () => {
      isPaused = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Render loop
    const render = () => {
      if (!isPaused) {
        // Smooth mouse parallax lerp
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;

        const intensity = Math.max(0.2, Math.min(1.0, getIntensity()));

        // Base near-black background
        ctx.fillStyle = '#06080e';
        ctx.fillRect(0, 0, width, height);

        // Faint deep navy nebula gradient
        const nebulaGrad = ctx.createRadialGradient(
          width * 0.75 + currentMouseX * 10,
          height * 0.3 + currentMouseY * 10,
          20,
          width * 0.75,
          height * 0.3,
          Math.max(width, height) * 0.7
        );
        nebulaGrad.addColorStop(0, `rgba(18, 30, 58, ${0.18 * intensity})`);
        nebulaGrad.addColorStop(0.5, `rgba(10, 18, 36, ${0.08 * intensity})`);
        nebulaGrad.addColorStop(1, 'rgba(6, 8, 14, 0)');

        ctx.fillStyle = nebulaGrad;
        ctx.fillRect(0, 0, width, height);

        // Secondary subtle nebula glow at bottom left (enhances contact and scroll depth)
        const nebulaGrad2 = ctx.createRadialGradient(
          width * 0.2 - currentMouseX * 8,
          height * 0.75 - currentMouseY * 8,
          10,
          width * 0.2,
          height * 0.75,
          Math.max(width, height) * 0.5
        );
        nebulaGrad2.addColorStop(0, `rgba(16, 26, 48, ${0.12 * intensity})`);
        nebulaGrad2.addColorStop(1, 'rgba(6, 8, 14, 0)');
        ctx.fillStyle = nebulaGrad2;
        ctx.fillRect(0, 0, width, height);

        // Layer: Extremely Thin Orbital Curves (Req 1 & 2)
        if (!prefersReducedMotion) {
          orbitAngle += 0.00015;
        }

        ctx.save();
        ctx.translate(
          width * 0.65 + currentMouseX * 4,
          height * 0.4 + currentMouseY * 4
        );
        ctx.rotate(orbitAngle);

        ctx.strokeStyle = `rgba(180, 210, 255, ${0.035 * intensity})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.ellipse(0, 0, Math.min(width, height) * 0.45, Math.min(width, height) * 0.22, Math.PI / 6, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = `rgba(140, 180, 240, ${0.02 * intensity})`;
        ctx.beginPath();
        ctx.ellipse(0, 0, Math.min(width, height) * 0.65, Math.min(width, height) * 0.32, -Math.PI / 8, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Parallax offsets (Req 3: stars 1-3px, dust 3-8px, foreground 5-12px)
        const starOffsetX = currentMouseX * 2.0;
        const starOffsetY = currentMouseY * 2.0;

        const dustOffsetX = currentMouseX * 5.5;
        const dustOffsetY = currentMouseY * 5.5;

        const glowOffsetX = currentMouseX * 9.0;
        const glowOffsetY = currentMouseY * 9.0;

        // Layer 1: Background Stars
        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];

          if (!prefersReducedMotion) {
            s.twinklePhase += s.twinkleSpeed;
            s.x += s.vx;
            s.y += s.vy;

            if (s.x < 0) s.x = width;
            if (s.x > width) s.x = 0;
            if (s.y < 0) s.y = height;
            if (s.y > height) s.y = 0;
          }

          const twinkle = Math.sin(s.twinklePhase) * 0.25 + 0.75;
          const alpha = s.baseAlpha * twinkle * Math.min(1.0, intensity * 1.2);

          ctx.fillStyle = `rgba(240, 246, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(s.x + starOffsetX, s.y + starOffsetY, s.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Layer 2: Galaxy Dust Particles
        for (let i = 0; i < dustParticles.length; i++) {
          const d = dustParticles[i];

          if (!prefersReducedMotion) {
            d.x += d.vx;
            d.y += d.vy;

            if (d.x < 0) d.x = width;
            if (d.x > width) d.x = 0;
            if (d.y < 0) d.y = height;
            if (d.y > height) d.y = 0;
          }

          const alpha = d.baseAlpha * intensity;
          ctx.fillStyle = `${d.color}${alpha})`;
          ctx.beginPath();
          ctx.arc(d.x + dustOffsetX, d.y + dustOffsetY, d.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Layer 3: Foreground Glowing Particles
        for (let i = 0; i < glowParticles.length; i++) {
          const g = glowParticles[i];

          if (!prefersReducedMotion) {
            g.x += g.vx;
            g.y += g.vy;

            if (g.x < 0) g.x = width;
            if (g.x > width) g.x = 0;
            if (g.y < 0) g.y = height;
            if (g.y > height) g.y = 0;
          }

          const alpha = g.alpha * intensity;

          // Soft subtle halo
          const glow = ctx.createRadialGradient(
            g.x + glowOffsetX,
            g.y + glowOffsetY,
            0,
            g.x + glowOffsetX,
            g.y + glowOffsetY,
            g.glowRadius
          );
          glow.addColorStop(0, `${g.color}${alpha * 0.8})`);
          glow.addColorStop(0.5, `${g.color}${alpha * 0.2})`);
          glow.addColorStop(1, `${g.color}0)`);

          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(g.x + glowOffsetX, g.y + glowOffsetY, g.glowRadius, 0, Math.PI * 2);
          ctx.fill();

          // Core point
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
          ctx.beginPath();
          ctx.arc(g.x + glowOffsetX, g.y + glowOffsetY, g.radius * 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      style={{ background: '#06080e' }}
    />
  );
}
