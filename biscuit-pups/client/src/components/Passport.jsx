import Reveal from './Reveal';
import { BRAND } from '../config';

const ICONS = {
  heart: <path d="M12 21C4 14 2 9 5 6c2-2 5-1 7 2 2-3 5-4 7-2 3 3 1 8-7 15zM5 12h4l2-3 2 5 2-2h4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />,
  plane: <path d="M2 14l20-8-6 14-4-5-4 3-1-5zM12 15l10-9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />,
  chat: <path d="M3 5h18v11H10l-5 4v-4H3zM8 10h.01M12 10h.01M16 10h.01" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  globe: <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c-4 4-4 14 0 18M12 3c4 4 4 14 0 18" fill="none" stroke="currentColor" strokeWidth="1.6" />,
};
const TRUST = [
  ['Vet-checked & healthy', 'Every puppy is vaccinated, dewormed and comes with a health certificate.', 'heart', 'round'],
  ['Carefully imported', 'Trusted breeders, safe travel and gentle care from start to finish.', 'plane', 'rect'],
  ['Support 24/7', 'Always here to help, from choosing your puppy to life after delivery.', 'chat', 'oval'],
  ['Loved by families', 'Puppies settling happily into homes far and wide.', 'globe', 'dots'],
];

/** Open "puppy passport" book with ink stamps. */
export default function Passport() {
  return (
    <Reveal className="book">
      <div className="book__page">
        <p className="font-hand kicker">puppy passport</p>
        <h2 id="trust-title" className="font-display huge">Why families trust {BRAND}</h2>
      </div>
      <ul className="book__page stamps">
        {TRUST.map(([t, d, icon, shape], i) => (
          <li key={t} style={{ '--r': `${[-3, 2, -1.5, 3][i]}deg` }}>
            <span className={`stamp stamp--${shape}`}><svg viewBox="0 0 24 24" aria-hidden="true">{ICONS[icon]}</svg><b className="font-display">{t}</b></span><p>{d}</p>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
