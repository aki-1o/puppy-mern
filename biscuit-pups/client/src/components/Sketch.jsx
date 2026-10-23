import { Link } from 'react-router-dom';
import PuppyArt from './PuppyArt';
import { BREEDS } from '../config';

const GENDER = { boy: 'boy', girl: 'girl', both: 'boy & girl' };
const WASH = ['#f6d9a0', '#cfe6f5', '#f9cfc2', '#d3ecc6', '#e3d6f3'];
const BLOBS = ['58% 42% 55% 45% / 48% 56% 44% 52%', '46% 54% 42% 58% / 56% 44% 56% 44%', '52% 48% 60% 40% / 44% 58% 42% 56%'];

/** Hand-drawn doodles scattered around each puppy. */
function Doodle({ i }) {
  const c = ['#c2622b', '#2a170e', '#d4893f'][i % 3];
  const kinds = [
    <path key="p" d="M0 0q6-10 14 0t14 0" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round" />,
    <g key="d" fill={c}><circle cx="4" cy="4" r="3.5" /><circle cx="16" cy="10" r="2.6" /><circle cx="6" cy="18" r="2" /></g>,
    <path key="s" d="M14 0l3.5 10.5L28 14l-10.5 3.5L14 28l-3.5-10.5L0 14l10.5-3.5z" fill={c} />,
    <path key="w" d="M14 14m-3 0a3 3 0 1 1 6 0a7 7 0 1 1-14 0a11 11 0 1 1 22 0" fill="none" stroke={c} strokeWidth="2.8" strokeLinecap="round" />,
    <path key="a" d="M0 4l12 6M0 14h14M0 24l12-6" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round" />,
    <path key="h" d="M14 24C-6 10 4-2 14 7 24-2 34 10 14 24z" fill="none" stroke={c} strokeWidth="2.8" strokeLinejoin="round" />,
  ];
  return <svg viewBox="-4 -4 38 36" className={`sketch__doodle sketch__doodle--${i % 4}`} aria-hidden="true">{kinds[i % kinds.length]}</svg>;
}

/** Sketchbook-style puppy card (puppies page). Hover = eyes shut + faster wag. */
export default function Sketch({ puppy, index = 0 }) {
  const gone = puppy.status === 'gone-home';
  const breeds = puppy.breeds.map((b) => BREEDS.find(([v]) => v === b)?.[1] ?? b).join(' & ');
  return (
    <Link to={`/puppies/${puppy.slug}`} className="sketch" data-pet
      aria-label={`${puppy.name}, ${breeds}, ${GENDER[puppy.gender]}, ${puppy.ageLabel}${gone ? ', gone home' : ', available'}`}
      style={{ '--tilt': `${[0.4, -0.7, 0.9, -0.5][index % 4]}deg`, '--wash': WASH[index % WASH.length], '--blob': BLOBS[index % BLOBS.length] }}>
      <span className="sketch__frame">
        <span className="sketch__wash" />
        <span className="sketch__photo">{puppy.image ? <img src={puppy.image} alt="" loading="lazy" /> : <PuppyArt puppy={puppy} />}</span>
        <Doodle i={index} /><Doodle i={index + 3} />
        <span className="sketch__sticker font-hand">{gone ? 'gone home ♥' : 'Available'}</span>
        {puppy.hasVideo && <span className="sketch__video">▶ video</span>}
      </span>
      <span className="sketch__name font-display">{puppy.name}</span>
      <span className="sketch__meta">{gone ? breeds : `${breeds} · ${GENDER[puppy.gender]} · ${puppy.ageLabel}`}</span>
    </Link>
  );
}
