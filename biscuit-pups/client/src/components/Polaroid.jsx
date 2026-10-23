import PuppyArt from './PuppyArt';
import PhotoCredit from './PhotoCredit';

/** One "happy family" polaroid: real photo if the record has one, otherwise the illustration. */
export default function Polaroid({ family: f }) {
  return (
    <figure className="polaroid" data-pet><span className="tape" />
      {f.image
        ? <img src={f.image} alt={f.alt || "A happy family's new puppy"} loading="lazy" decoding="async" />
        : <PuppyArt puppy={f} className="polaroid__art" title="A happy family's new puppy" />}
      <figcaption className="font-hand">{f.caption}</figcaption>
      <PhotoCredit credit={f.credit} />
    </figure>
  );
}
