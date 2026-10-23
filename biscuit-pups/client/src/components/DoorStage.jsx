import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Door from './Door';
import Reveal from './Reveal';
import PuppyArt from './PuppyArt';
import PupSide from './PupSide';
import { DOOR_COLORS } from '../config';

const GENDER = { boy: 'boy', girl: 'girl', both: 'boy & girl' };
const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * "Meet the pups": scrolling down slides a row of doors sideways while a pup walks along the floor.
 * The door nearest the pup swings open to reveal the puppy inside. Falls back to a plain grid for reduced motion.
 */
export default function DoorStage({ puppies }) {
  const sec = useRef(null), track = useRef(null);
  const [active, setActive] = useState(0);
  const [walking, setWalking] = useState(false);
  const [simple] = useState(reduced);

  useEffect(() => {
    if (simple || !puppies.length) return;
    let raf = 0, timer = 0;
    const update = () => {
      raf = 0;
      const r = sec.current.getBoundingClientRect();
      const total = Math.max(r.height - innerHeight, 1);
      const p = Math.min(Math.max(-r.top / total, 0), 1);
      const t = track.current;
      const max = Math.max(t.scrollWidth - innerWidth, 0);
      t.style.transform = `translate3d(${-p * max}px,0,0)`;
      const mid = innerWidth * 0.46;
      let best = 0, bestD = Infinity;
      [...t.children].forEach((c, i) => {
        const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - p * max - mid);
        if (d < bestD) { bestD = d; best = i; }
      });
      setActive(best);
      setWalking(p > 0 && p < 1);
      clearTimeout(timer); timer = setTimeout(() => setWalking(false), 260);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll);
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); cancelAnimationFrame(raf); clearTimeout(timer); };
  }, [simple, puppies.length]);

  const head = (
    <div className="stage__head gutter">
      <div>
        <h2 id="meet-title" className="font-display huge">Meet the pups</h2>
        <p className="lede">Little personalities, looking for their families right now.</p>
      </div>
      <Link className="btn btn-ghost" to="/puppies">See all available puppies</Link>
    </div>
  );

  if (simple) {
    return (
      <section className="scene" data-pup="hide" style={{ '--top': '#fff1d8', '--bottom': '#fbe3b4' }} aria-labelledby="meet-title">
        <div className="gutter">
          {head}
          <ul className="doors">{puppies.map((p, i) => <Reveal as="li" key={p.slug} delay={(i % 3) * 90}><Door puppy={p} index={i} /></Reveal>)}</ul>
        </div>
      </section>
    );
  }

  return (
    <section ref={sec} className="stage" data-pup="hide" style={{ height: `${Math.max(puppies.length, 4) * 34 + 70}vh`, '--top': '#fff1d8', '--bottom': '#fbe3b4' }} aria-labelledby="meet-title">
      <div className="stage__sticky">
        {head}
        <ul className="stage__track" ref={track}>
          {puppies.map((p, i) => (
            <li key={p.slug} className="sdoor" data-open={i === active} style={{ '--door': DOOR_COLORS[(i + 1) % DOOR_COLORS.length] }}>
              <Link to={`/puppies/${p.slug}`} data-pet aria-label={`Meet ${p.name}`}>
                <span className="door__plate"><span className="door__name">{p.name}</span><span className="door__meta">{GENDER[p.gender]}, {p.ageLabel}</span></span>
                <span className="sdoor__frame">
                  <span className="sdoor__room">{p.image ? <img src={p.image} alt="" /> : <PuppyArt puppy={p} />}</span>
                  <span className="sdoor__leaf"><i className="sdoor__panel" /><i className="sdoor__knob" /><span className="sdoor__tag font-hand">Available</span></span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="stage__floor" />
        <div className="stage__pup" data-walking={walking} aria-hidden="true"><PupSide /></div>
      </div>
    </section>
  );
}
