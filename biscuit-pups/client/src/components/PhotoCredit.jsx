/** "Photo: Jane Doe on Unsplash via Picsum" — renders nothing for illustrations (no credit). */
export default function PhotoCredit({ credit, className = '' }) {
  if (!credit) return null;
  const via = credit.via || 'Picsum Photos';
  return (
    <small className={`credit ${className}`}>
      📷{' '}
      {credit.verified && credit.author
        ? <>{credit.sourceUrl ? <a href={credit.sourceUrl} target="_blank" rel="noopener noreferrer">{credit.author}</a> : credit.author} on Unsplash, via {via}</>
        : <>Placeholder photo via {via}</>}
    </small>
  );
}
