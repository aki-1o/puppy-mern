import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

const label = (a) => (!a ? 'Library' : a.startsWith('puppy:') ? `Puppy · ${a.slice(6)}` : `Family polaroid #${Number(a.slice(7)) + 1}`);

export default function Credits() {
  const { data, loading, error } = useFetch('/credits');
  const items = data ?? [];
  return (
    <section className="page scene" style={{ '--top': '#fffdf8', '--bottom': '#fbe3b4' }}>
      <div className="gutter">
        <p className="font-hand kicker">with thanks</p>
        <h1 className="font-display huge">Photo credits</h1>
        <p className="lede">
          Placeholder photos come from <a href="https://picsum.photos" target="_blank" rel="noopener noreferrer">Picsum Photos</a>,
          which serves images from <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a> under the Unsplash License.
          Thank you to every photographer below. They are stand-ins and are not photos of our puppies. Back to <Link to="/puppies">the puppies</Link>.
        </p>
        {loading && <p className="status">Fetching credits…</p>}
        {error && <p className="status status--error">{error}</p>}
        {!loading && !error && items.length === 0 && <p className="status">No photos yet — only illustrations. Run <code>npm run seed</code> on the server.</p>}
        <ul className="credits">
          {items.map((i) => (
            <li key={i._id} className="credits__item">
              <img src={i.url} alt={i.alt || ''} loading="lazy" width="96" height="96" />
              <div>
                <strong>{label(i.assignedTo)}</strong>
                <p>
                  {i.credit?.verified && i.credit.author
                    ? <>Photo by <a href={i.credit.sourceUrl} target="_blank" rel="noopener noreferrer">{i.credit.author}</a> on Unsplash</>
                    : 'Photographer not looked up yet (re-run npm run seed while online)'}
                  {' · via Picsum Photos'}{i.grayscale ? ' · grayscale' : ''}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
