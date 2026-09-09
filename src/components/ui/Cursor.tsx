import { useCustomCursor } from '../../hooks/useCustomCursor';

export function Cursor() {
  const { cursorRef, isHovering, isMobile } = useCustomCursor();

  if (isMobile) return null;

  const size = isHovering ? 22 : 11;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference will-change-transform"
      style={{
        transform: 'translate3d(-100px, -100px, 0)',
        width: `${size}px`,
        height: `${size}px`,
        opacity: 0,
        transition: 'width 0.18s cubic-bezier(0.16, 1, 0.3, 1), height 0.18s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.15s ease-out',
      }}
    >
      <div
        className="w-full h-full rounded-full bg-white transition-all duration-200"
      />
    </div>
  );
}
