import { useEffect, useState } from 'react';

/** Header gets a background after scrolling, and hides on scroll-down / returns on scroll-up. */
export function useHeaderBehavior() {
  const [state, setState] = useState({ scrolled: false, hidden: false });
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const next = { scrolled: y > 12, hidden: y > 240 && y > last + 4 ? true : y < last - 4 ? false : undefined };
      setState((s) => {
        const hidden = next.hidden ?? s.hidden;
        return s.scrolled === next.scrolled && s.hidden === hidden ? s : { scrolled: next.scrolled, hidden };
      });
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return state;
}
