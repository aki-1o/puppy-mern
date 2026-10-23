import { useEffect } from 'react';
import Lenis from 'lenis';

/** Lenis smooth scrolling (the original's <SmoothScroll/>). Off for reduced-motion users. */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ lerp: 0.1 });
    let id;
    const loop = (t) => { lenis.raf(t); id = requestAnimationFrame(loop); };
    id = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);
}
