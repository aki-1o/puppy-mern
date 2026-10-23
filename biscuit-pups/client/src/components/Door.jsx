import { Link } from 'react-router-dom';
import { DOOR_COLORS } from '../config';
import PuppyArt from './PuppyArt';

const GENDER = { boy: 'boy', girl: 'girl', both: 'boy & girl' };

/** A puppy "door": nameplate on top, arched frame with the puppy inside. Hover = eyes shut, tail wags harder. */
export default function Door({ puppy, index = 0 }) {
  return (
    <Link to={`/puppies/${puppy.slug}`} className="door" data-pet style={{ '--door': DOOR_COLORS[Math.floor(index / 3) % DOOR_COLORS.length] }}>
      <span className="door__plate">
        <span className="door__name">{puppy.name}</span>
        <span className="door__meta">
          {GENDER[puppy.gender]}, {puppy.ageLabel}{puppy.hasVideo ? ', with video' : ''}
        </span>
      </span>
      <span className="door__frame">
        {puppy.image
          ? <img src={puppy.image} alt={puppy.alt || puppy.name} loading="lazy" decoding="async" />
          : <PuppyArt puppy={puppy} />}
        {puppy.status === 'available' && <span className="door__badge">Available</span>}
      </span>
    </Link>
  );
}
