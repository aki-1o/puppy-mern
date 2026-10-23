import { Link } from 'react-router-dom';

/** "Two ways to meet your puppy": a wooden signpost with a shop on one side and a flight path on the other. */
export default function Signpost() {
  return (
    <div className="sign">
      <div className="sign__post" aria-hidden="true" />
      <div className="sign__arrows">
        <Link to="/puppies?origin=local" className="sign__arrow sign__arrow--l"><span className="font-display">Puppies nearby</span></Link>
        <Link to="/puppies?origin=imported" className="sign__arrow sign__arrow--r"><span className="font-display">Imported for you</span></Link>
      </div>
      <div className="sign__side">
        <div className="shopfront" aria-hidden="true">
          <svg viewBox="0 0 300 150" className="skyline"><path d="M0 146h300M10 146V96h26v50M44 146V70h20v76M72 146V50l12-26 12 26v96M104 146V88h30v58M142 146V100h24v46M176 146V66h18v80M202 146V104h28v42M238 146V84h22v46" fill="none" stroke="#b58a52" strokeWidth="3" strokeLinejoin="round" /></svg>
          <div className="awning" /><div className="shopfront__window"><svg viewBox="0 0 64 64" aria-hidden="true"><text y="48" fontSize="44">🧸</text></svg></div>
        </div>
        <p className="tag font-hand">In our showroom</p>
        <p>See them, love them, take them home. Come meet our locally available puppies before you decide.</p>
        <Link className="btn btn-primary" to="/puppies?origin=local">Meet local puppies</Link>
      </div>
      <div className="sign__side">
        <svg className="flight" viewBox="0 0 320 170" aria-hidden="true">
          <path d="M30 140Q110 20 170 70T300 40" fill="none" stroke="#a24a1a" strokeWidth="2.6" strokeDasharray="2 9" strokeLinecap="round" />
          <circle cx="30" cy="140" r="6" fill="#a24a1a" /><circle cx="300" cy="40" r="6" fill="#a24a1a" />
          <text x="22" y="164" fontSize="13" fontFamily="var(--font-hand)" fill="#5a3a28">Overseas</text><text x="262" y="30" fontSize="13" fontFamily="var(--font-hand)" fill="#5a3a28">Home</text>
          <g transform="translate(150 62) rotate(-12)"><path d="M-46 0c0-12 18-18 46-14l22 2c10 2 14 8 4 12L8 6c-18 6-54 6-54-6z" fill="#fffdf8" stroke="#2a170e" strokeWidth="3" /><path d="M-6-12l-10-24 16 2 12 22M-8 8l-12 24 16-2 14-20M-46 0l-12-14 14 2" fill="#c2622b" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" /><circle cx="16" cy="-4" r="7" fill="#fbe3b4" stroke="#2a170e" strokeWidth="2.4" /></g>
        </svg>
        <p className="tag font-hand">Order on request</p>
        <p>Rare teacup breeds from the world's most reputable breeders. Tell us what you'd like and we handle the import.</p>
        <Link className="btn btn-primary" to="/puppies?origin=imported">See imported puppies</Link>
      </div>
    </div>
  );
}
