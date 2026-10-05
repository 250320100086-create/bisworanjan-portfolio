import React, { useEffect, useState, useRef } from 'react';

export const InteractiveCursor: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorHaloRef = useRef<HTMLDivElement | null>(null);
  const posRef = useRef({ x: -100, y: -100, targetX: -100, targetY: -100 });

  useEffect(() => {
    // Only enable on fine pointer devices without reduced motion
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer || prefersReducedMotion) {
      setIsEnabled(false);
      return;
    }

    setIsEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      posRef.current.targetX = e.clientX;
      posRef.current.targetY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Check if hovering an interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive =
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('button') !== null ||
          target.closest('a') !== null ||
          target.getAttribute('role') === 'button';
        setIsHovered(isInteractive);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    let animationFrameId: number;

    const animate = () => {
      // Smooth linear interpolation for the halo
      const dx = posRef.current.targetX - posRef.current.x;
      const dy = posRef.current.targetY - posRef.current.y;
      posRef.current.x += dx * 0.22;
      posRef.current.y += dy * 0.22;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${posRef.current.targetX}px, ${posRef.current.targetY}px, 0)`;
      }

      if (cursorHaloRef.current) {
        cursorHaloRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) scale(${
          isHovered ? 1.6 : 1
        })`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, isHovered]);

  if (!isEnabled) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Outer Glow Halo */}
      <div
        ref={cursorHaloRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-fuchsia-500/40 bg-fuchsia-500/10 pointer-events-none backdrop-blur-[1px] transition-transform duration-75 ease-out shadow-[0_0_15px_rgba(217,70,239,0.25)]"
      />

      {/* Center Sharp Dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-white pointer-events-none transition-all duration-75 ${
          isHovered ? 'bg-fuchsia-400 scale-125 shadow-[0_0_8px_#d946ef]' : 'shadow-[0_0_4px_#ffffff]'
        }`}
      />
    </div>
  );
};
