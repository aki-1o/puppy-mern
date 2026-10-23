/**
 * Illustrated puppy (no photos). Colours come from the puppy record.
 * Inside a [data-pet] parent, hovering closes the eyes and speeds up the tail wag (see index.css).
 */
export default function PuppyArt({ puppy, className = '', title }) {
  const { fur = '#e9c48a', ear = '#c99556', muzzle = '#fff3dc', patch, bg = '#fbe3b4', ears = 'floppy' } = puppy || {};
  return (
    <svg className={`pup ${className}`} viewBox="0 0 200 240" role="img" aria-label={title || puppy?.alt || puppy?.name || 'Puppy'} preserveAspectRatio="xMidYMid slice">
      <rect width="200" height="240" fill={bg} />
      <circle cx="40" cy="40" r="26" fill="#fff" opacity=".35" />
      <circle cx="168" cy="70" r="14" fill="#fff" opacity=".3" />
      <ellipse cx="100" cy="232" rx="70" ry="8" fill="#2a170e" opacity=".12" />

      <g transform="translate(146 196)"><g className="pup__tail">
        <path d="M0 0c26-6 36-30 24-50" fill="none" stroke="#2a170e" strokeWidth="19" strokeLinecap="round" />
        <path d="M0 0c26-6 36-30 24-50" fill="none" stroke={fur} strokeWidth="12" strokeLinecap="round" />
      </g></g>

      <ellipse cx="100" cy="190" rx="54" ry="44" fill={fur} stroke="#2a170e" strokeWidth="3.4" />
      <ellipse cx="78" cy="228" rx="15" ry="9" fill={fur} stroke="#2a170e" strokeWidth="3.4" />
      <ellipse cx="122" cy="228" rx="15" ry="9" fill={fur} stroke="#2a170e" strokeWidth="3.4" />

      {ears === 'perky' ? (<>
        <path d="M52 78 L56 28 L90 62 Z" fill={ear} stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" />
        <path d="M148 78 L144 28 L110 62 Z" fill={ear} stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" />
      </>) : (<>
        <ellipse cx="46" cy="104" rx="20" ry="36" fill={ear} stroke="#2a170e" strokeWidth="3.4" transform="rotate(14 46 104)" />
        <ellipse cx="154" cy="104" rx="20" ry="36" fill={ear} stroke="#2a170e" strokeWidth="3.4" transform="rotate(-14 154 104)" />
      </>)}

      <ellipse cx="100" cy="108" rx="58" ry="52" fill={fur} stroke="#2a170e" strokeWidth="3.4" />
      {patch && <ellipse cx="72" cy="86" rx="24" ry="26" fill={patch} opacity=".95" />}
      <ellipse cx="100" cy="132" rx="28" ry="21" fill={muzzle} />
      <ellipse cx="100" cy="122" rx="9" ry="6.5" fill="#2a170e" />
      <path d="M100 128v7M88 140q12 9 24 0" fill="none" stroke="#2a170e" strokeWidth="2.8" strokeLinecap="round" />
      <path className="pup__tongue" d="M95 141q5 14 10 0z" fill="#f08a8a" stroke="#2a170e" strokeWidth="2" strokeLinejoin="round" />
      <ellipse cx="66" cy="124" rx="8" ry="5" fill="#f4a3a3" opacity=".5" />
      <ellipse cx="134" cy="124" rx="8" ry="5" fill="#f4a3a3" opacity=".5" />

      <g className="pup__open">
        <circle cx="79" cy="104" r="7" fill="#2a170e" /><circle cx="121" cy="104" r="7" fill="#2a170e" />
        <circle cx="81.5" cy="101.5" r="2.4" fill="#fff" /><circle cx="123.5" cy="101.5" r="2.4" fill="#fff" />
      </g>
      <g className="pup__shut" fill="none" stroke="#2a170e" strokeWidth="3.4" strokeLinecap="round">
        <path d="M71 105q8 7 16 0" /><path d="M113 105q8 7 16 0" />
      </g>
    </svg>
  );
}
