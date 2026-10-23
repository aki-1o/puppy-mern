import Reveal from '../components/Reveal';
import Polaroid from '../components/Polaroid';
import { useFetch } from '../hooks/useFetch';

const TILTS = [1.6, -2.2, 0.8, 2.4, -1.2, 1.2, -0.9, -2.6];

export default function HappyFamilies() {
  const fam = useFetch('/families');
  const home = useFetch('/home');
  const items = fam.data ?? [];
  const t = home.data?.testimonial;

  return (
    <section className="page scene" data-tone="dark" style={{ '--top': '#a65a30', '--bottom': '#2f1a10' }}>
      <div className="gutter">
        <p className="font-hand kicker" style={{ color: 'var(--honey)' }}>our wall of happy endings</p>
        <h1 className="font-display huge">Happy families</h1>
        <p className="lede">Nothing makes us happier than seeing our puppies in loving homes. Here are a few moments from families who welcomed their furry friends.</p>
        <p className="font-hand status">{items.length} moments and counting</p>
        {t && (
          <Reveal as="blockquote" className="quote">
            <p>“{t.quote}”</p>
            <footer>{t.author}, {t.location}</footer>
          </Reveal>
        )}
        {fam.loading && <p className="status">Fetching moments…</p>}
        {fam.error && <p className="status status--error">{fam.error}</p>}
        <ul className="wall">
          {items.map((f, i) => (
            <Reveal as="li" key={f._id} delay={(i % 4) * 80} style={{ '--tilt': `${TILTS[i % TILTS.length]}deg` }}>
              <Polaroid family={f} />
            </Reveal>
          ))}
        </ul>
        <p className="font-hand status" style={{ marginTop: '3rem' }}>every one of them was a pup once 🐾</p>
      </div>
    </section>
  );
}
