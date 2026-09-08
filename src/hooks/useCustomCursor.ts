import { useEffect, useState, useRef } from 'react';

export function useCustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isOverText, setIsOverText] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return true;
    return (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.innerWidth < 768
    );
  });

  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsMobile(isTouch || reducedMotion);
    };

    window.addEventListener('resize', checkMobile);
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', checkMobile);

    if (isMobile) {
      document.documentElement.classList.remove('custom-cursor-active');
      return () => {
        window.removeEventListener('resize', checkMobile);
        motionQuery.removeEventListener('change', checkMobile);
      };
    }

    document.documentElement.classList.add('custom-cursor-active');

    // Smooth & responsive RAF interpolation
    let isRunning = true;
    const updateCursor = () => {
      if (!isRunning) return;

      const ease = 0.45;
      posRef.current.x += (targetRef.current.x - posRef.current.x) * ease;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * ease;

      setPosition({
        x: Math.round(posRef.current.x * 10) / 10,
        y: Math.round(posRef.current.y * 10) / 10,
      });

      animFrameRef.current = requestAnimationFrame(updateCursor);
    };

    animFrameRef.current = requestAnimationFrame(updateCursor);

    const onMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) {
        setIsHovering(false);
        setIsOverText(false);
        return;
      }
      
      const isInteractive = Boolean(
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'input' ||
        target.tagName.toLowerCase() === 'textarea' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('[data-interactive="true"]')
      );

      const isText = Boolean(
        target.closest('h1, h2, h3, h4, h5, h6, p, span, li, label, blockquote, code, strong, em, dt, dd')
      );
      
      setIsHovering(isInteractive);
      setIsOverText(isText && !isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      isRunning = false;
      document.documentElement.classList.remove('custom-cursor-active');
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('resize', checkMobile);
      motionQuery.removeEventListener('change', checkMobile);
    };
  }, [isMobile]);

  return { position, isHovering, isOverText, isMobile };
}
