import { useEffect, useRef } from 'react';
import { PAW_D } from './Paw';

/**
 * Fading paw-print trail behind the pointer (the original's <PawTrailCanvas/>).
 *  - one fixed, pointer-events:none <canvas>; paws are drawn, never added to the DOM
 *  - a paw is stamped every STEP px of travel, alternating left/right of the path and
 *    rotated to the direction of travel
 *  - the rAF loop only runs while paws are still visible
 *  - skipped for touch devices and prefers-reduced-motion
 */
const STEP = 46;      // px of pointer travel between prints
const LIFE = 1700;    // ms until a print has fully faded
const MAX = 28;       // cap on live prints
const SIDE = 9;       // px left/right offset from the path
const COLOR = '#d4893f';
const PAW = new Path2D(PAW_D);

export default function PawTrail() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches) return;
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const paws = [];
    let last = null, foot = 1, raf = 0, dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr;
    };

    const draw = (now) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (let i = paws.length - 1; i >= 0; i--) {
        const p = paws[i], t = (now - p.born) / LIFE;
        if (t >= 1) { paws.splice(i, 1); continue; }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.scale(p.size * (0.85 + 0.15 * Math.min(t * 6, 1)), p.size * (0.85 + 0.15 * Math.min(t * 6, 1)));
        ctx.translate(-32, -32);                                  // glyph centre
        ctx.globalAlpha = 0.6 * (1 - t) ** 1.6;
        ctx.fillStyle = COLOR;
        ctx.fill(PAW);
        ctx.restore();
      }
      raf = paws.length ? requestAnimationFrame(draw) : 0;
    };

    const onMove = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      if (!last) { last = { x: e.clientX, y: e.clientY }; return; }
      const dx = e.clientX - last.x, dy = e.clientY - last.y;
      if (Math.hypot(dx, dy) < STEP) return;
      const heading = Math.atan2(dy, dx);
      const nx = -Math.sin(heading), ny = Math.cos(heading);      // unit normal to the path
      paws.push({
        x: e.clientX + nx * SIDE * foot, y: e.clientY + ny * SIDE * foot,
        rot: heading + Math.PI / 2 + (Math.random() - 0.5) * 0.35,  // glyph points "up" → add 90°
        size: 0.34 + Math.random() * 0.1, born: performance.now(),
      });
      if (paws.length > MAX) paws.shift();
      foot *= -1; last = { x: e.clientX, y: e.clientY };
      if (!raf) raf = requestAnimationFrame(draw);
    };

    resize();
    addEventListener('resize', resize);
    addEventListener('pointermove', onMove, { passive: true });
    return () => {
      removeEventListener('resize', resize);
      removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} className="paw-trail" aria-hidden="true" />;
}
