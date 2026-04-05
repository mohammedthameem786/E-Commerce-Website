import { useEffect, useRef, useState, useCallback } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);

  const onMove = useCallback((e: MouseEvent) => {
    if (cursorRef.current) {
      cursorRef.current.style.left = e.clientX + 'px';
      cursorRef.current.style.top = e.clientY + 'px';
    }
    if (ringRef.current) {
      ringRef.current.style.left = e.clientX + 'px';
      ringRef.current.style.top = e.clientY + 'px';
    }
  }, []);

  const onOver = useCallback((e: MouseEvent) => {
    const t = e.target as HTMLElement;
    if (t.closest('a, button, .product-card, .cat-card, input, select, [role="button"]')) {
      setIsHover(true);
    }
  }, []);

  const onOut = useCallback(() => setIsHover(false), []);

  useEffect(() => {
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, [onMove, onOver, onOut]);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor fixed pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-difference transition-transform duration-75" style={{ width: isHover ? 24 : 12, height: isHover ? 24 : 12, backgroundColor: 'hsl(187, 100%, 50%)' }} />
      <div ref={ringRef} className="custom-cursor fixed pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50" style={{ width: 36, height: 36, border: '1.5px solid hsl(187, 100%, 50%)', transition: 'transform 0.15s ease', transform: isHover ? 'translate(-50%, -50%) scale(1.5)' : undefined }} />
    </>
  );
};

export default CustomCursor;
