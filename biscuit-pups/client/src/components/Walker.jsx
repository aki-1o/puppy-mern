import { useEffect, useRef, useState } from 'react';
import PupSide from './PupSide';

/**
 * A pup that follows you down the page. Sections opt in with data-pup="<x% | hide>";
 * the pup walks to that x position while you scroll and sits once you stop.
 */
export default function Walker() {
  const [s, setS] = useState({ x: 86, face: -1, walking: false, hidden: false });
  const last = useRef(86);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0, timer = 0;
    const update = () => {
      raf = 0;
      let target = null;
      document.querySelectorAll('[data-pup]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= innerHeight * 0.6 && r.bottom > innerHeight * 0.4) target = el.dataset.pup;
      });
      const hidden = target === 'hide';
      const x = target && !hidden ? Number(target) : last.current;
      const face = x > last.current ? 1 : x < last.current ? -1 : undefined;
      setS((p) => ({ x, face: face ?? p.face, walking: true, hidden }));
      last.current = x;
      clearTimeout(timer);
      timer = setTimeout(() => setS((p) => ({ ...p, walking: false })), 450);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener('scroll', onScroll, { passive: true });
    return () => { removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); clearTimeout(timer); };
  }, []);

  return (
    <div className="walker" data-walking={s.walking} data-hidden={s.hidden} style={{ left: `${s.x}%` }} aria-hidden="true">
      <div style={{ transform: `scaleX(${s.face})` }}><PupSide /></div>
    </div>
  );
}
