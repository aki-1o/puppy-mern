/** Side-on illustrated pup. Legs swing while data-walking="true" on any ancestor (see index.css). */
export default function PupSide({ fur = '#f0be6b', ear = '#d99a45', muzzle = '#fff3dc', className = '' }) {
  const leg = (x, y, cls, fill) => (
    <g transform={`translate(${x} ${y})`}><g className={`ps__leg ${cls}`}>
      <rect x="-8" y="0" width="16" height="42" rx="8" fill={fill} stroke="#2a170e" strokeWidth="3.2" />
      <path d="M-4 36v5M4 36v5" stroke="#2a170e" strokeWidth="2.2" strokeLinecap="round" />
    </g></g>
  );
  return (
    <svg className={`pupside ${className}`} viewBox="0 0 230 160" aria-hidden="true">
      <ellipse cx="112" cy="152" rx="78" ry="6" fill="#2a170e" opacity=".14" />
      <g transform="translate(56 84)"><g className="ps__tail">
        <path d="M0 0c-20-2-32-18-26-38" fill="none" stroke="#2a170e" strokeWidth="17" strokeLinecap="round" />
        <path d="M0 0c-20-2-32-18-26-38" fill="none" stroke={fur} strokeWidth="10" strokeLinecap="round" />
      </g></g>
      {leg(76, 108, 'ps__leg--b2', ear)}{leg(148, 108, 'ps__leg--f2', ear)}
      <ellipse cx="110" cy="90" rx="60" ry="37" fill={fur} stroke="#2a170e" strokeWidth="3.4" />
      {leg(94, 110, 'ps__leg--b1', fur)}{leg(164, 110, 'ps__leg--f1', fur)}
      <path d="M146 86q22 18 46 4" fill="none" stroke="#a24a1a" strokeWidth="9" strokeLinecap="round" />
      <circle cx="170" cy="100" r="6" fill="#fbe3b4" stroke="#2a170e" strokeWidth="2.4" />
      <circle cx="172" cy="68" r="33" fill={fur} stroke="#2a170e" strokeWidth="3.4" />
      <ellipse cx="152" cy="64" rx="12" ry="25" fill={ear} stroke="#2a170e" strokeWidth="3.2" transform="rotate(16 152 64)" />
      <ellipse cx="196" cy="78" rx="18" ry="13" fill={muzzle} stroke="#2a170e" strokeWidth="3" />
      <circle cx="208" cy="72" r="5.5" fill="#2a170e" />
      <circle cx="184" cy="60" r="4.8" fill="#2a170e" /><circle cx="185.6" cy="58.4" r="1.6" fill="#fff" />
      <ellipse cx="180" cy="76" rx="6" ry="4" fill="#f4a3a3" opacity=".55" />
    </svg>
  );
}
