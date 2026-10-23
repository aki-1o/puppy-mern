import { useEffect, useRef } from 'react';

/** Fades/slides an element in once it scrolls into view (sets data-in="true"). */
export function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { el.dataset.in = 'true'; return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.dataset.in = 'true'; io.disconnect(); }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}
