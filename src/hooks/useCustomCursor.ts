import { useEffect, useState, useRef } from 'react';

export function useCustomCursor() {
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

  const cursorRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const hasMovedRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    isHoveringRef.current = isHovering;
  }, [isHovering]);

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

    // Highly responsive, low-latency RAF interpolation (~0-10ms delay, no React re-render lag)
    let isRunning = true;
    const updateCursor = () => {
      if (!isRunning) return;

      const ease = 0.75;
      posRef.current.x += (targetRef.current.x - posRef.current.x) * ease;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * ease;

      if (cursorRef.current && hasMovedRef.current) {
        const size = isHoveringRef.current ? 22 : 11;
        const offset = size / 2;
        const x = Math.round((posRef.current.x - offset) * 10) / 10;
        const y = Math.round((posRef.current.y - offset) * 10) / 10;
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      animFrameRef.current = requestAnimationFrame(updateCursor);
    };

    animFrameRef.current = requestAnimationFrame(updateCursor);

    const onMouseMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        posRef.current.x = e.clientX;
        posRef.current.y = e.clientY;
        if (cursorRef.current) {
          cursorRef.current.style.opacity = '1';
        }
      }
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

  return { cursorRef, position: posRef.current, isHovering, isOverText, isMobile };
}
