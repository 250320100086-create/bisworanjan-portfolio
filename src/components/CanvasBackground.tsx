import React, { useEffect, useRef } from 'react';

const FRAME_COUNT = 240;

const getFrameUrl = (index: number) => {
  const padIndex = index.toString().padStart(5, '0');
  return `/frames/frame_${padIndex}.png`;
};

export const CanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isMounted = true;
    const images: HTMLImageElement[] = [];

    // Resize Canvas handler
    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(currentFrameRef.current);
    };

    // Render logic with aspect ratio scale (cover)
    const renderFrame = (index: number) => {
      if (!canvas || !ctx) return;
      const img = images[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scale = Math.max(
        canvas.width / img.naturalWidth,
        canvas.height / img.naturalHeight
      );

      const x = canvas.width / 2 - (img.naturalWidth / 2) * scale;
      const y = canvas.height / 2 - (img.naturalHeight / 2) * scale;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'medium';
      ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
    };

    // Preload frames
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      images.push(img);

      if (i === 0) {
        img.onload = () => {
          if (isMounted) {
            resizeCanvas();
          }
        };
      }
    }

    imagesRef.current = images;
    resizeCanvas();

    // Scroll sync
    let animId: number | null = null;
    const handleScroll = () => {
      if (animId) cancelAnimationFrame(animId);
      animId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const maxScrollTop =
          document.documentElement.scrollHeight - window.innerHeight;

        const scrollFraction =
          maxScrollTop > 0 ? Math.min(1, Math.max(0, scrollTop / maxScrollTop)) : 0;

        const frameIndex = Math.min(
          FRAME_COUNT - 1,
          Math.floor(scrollFraction * FRAME_COUNT)
        );

        currentFrameRef.current = frameIndex;
        renderFrame(frameIndex);
      });
    };

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      isMounted = false;
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
      {/* Dark gradient overlay to keep text readable */}
      <div className="absolute inset-0 bg-[#0B0C10]/75 backdrop-blur-[1px] pointer-events-none" />
    </div>
  );
};
