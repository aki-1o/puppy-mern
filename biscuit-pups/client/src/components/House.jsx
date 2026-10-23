import PuppyArt from './PuppyArt';

/** "Welcome home": a lit doorway with the door ajar, plants and a lamp. */
export default function House({ puppy }) {
  return (
    <div className="house">
      <span className="house__lamp" aria-hidden="true" />
      <span className="house__plant house__plant--l" aria-hidden="true" /><span className="house__plant house__plant--r" aria-hidden="true" />
      <div className="house__arch" data-pet>
        <div className="house__leaf" aria-hidden="true"><i /></div>
        <div className="house__room">{puppy.image ? <img src={puppy.image} alt="" /> : <PuppyArt puppy={puppy} title={`${puppy.name}, waiting inside`} />}</div>
        <span className="house__sign font-hand">welcome home</span>
      </div>
      <span className="house__step" aria-hidden="true" />
    </div>
  );
}
