/** A pup curled up in a wicker basket (footer). */
export default function Basket({ className = '' }) {
  return (
    <svg className={`basket ${className}`} viewBox="0 0 220 230" aria-hidden="true">
      <ellipse cx="46" cy="64" rx="22" ry="34" fill="#d99a45" stroke="#2a170e" strokeWidth="3.4" transform="rotate(14 46 64)" />
      <ellipse cx="174" cy="64" rx="22" ry="34" fill="#d99a45" stroke="#2a170e" strokeWidth="3.4" transform="rotate(-14 174 64)" />
      <circle cx="110" cy="78" r="58" fill="#f0be6b" stroke="#2a170e" strokeWidth="3.4" />
      <ellipse cx="110" cy="100" rx="27" ry="20" fill="#fff3dc" />
      <ellipse cx="110" cy="91" rx="9" ry="6.5" fill="#2a170e" />
      <path d="M110 97v7M98 108q12 9 24 0" fill="none" stroke="#2a170e" strokeWidth="2.8" strokeLinecap="round" />
      <circle cx="88" cy="74" r="7" fill="#2a170e" /><circle cx="132" cy="74" r="7" fill="#2a170e" />
      <circle cx="90.5" cy="71.5" r="2.4" fill="#fff" /><circle cx="134.5" cy="71.5" r="2.4" fill="#fff" />
      <ellipse cx="76" cy="94" rx="8" ry="5" fill="#f4a3a3" opacity=".5" /><ellipse cx="144" cy="94" rx="8" ry="5" fill="#f4a3a3" opacity=".5" />
      <ellipse cx="82" cy="140" rx="16" ry="10" fill="#f0be6b" stroke="#2a170e" strokeWidth="3.2" />
      <ellipse cx="138" cy="140" rx="16" ry="10" fill="#f0be6b" stroke="#2a170e" strokeWidth="3.2" />
      <path d="M22 134h176l-16 84q-2 8-10 8H48q-8 0-10-8z" fill="#dca464" stroke="#2a170e" strokeWidth="3.6" strokeLinejoin="round" />
      <ellipse cx="110" cy="134" rx="88" ry="10" fill="#b9793a" stroke="#2a170e" strokeWidth="3.6" />
      <path d="M32 158h156M38 184h144M44 208h132M70 140l-4 82M110 142v84M150 140l4 82" fill="none" stroke="#2a170e" strokeWidth="2.2" opacity=".5" />
    </svg>
  );
}
