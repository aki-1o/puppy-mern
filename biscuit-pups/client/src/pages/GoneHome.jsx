import Sketch from '../components/Sketch';
import Reveal from '../components/Reveal';
import { useFetch } from '../hooks/useFetch';

export default function GoneHome() {
  const { data, loading, error } = useFetch('/puppies?status=gone-home&limit=48');
  return (
    <section className="page scene" style={{ '--top': '#fffdf8', '--bottom': '#fbe3b4' }}>
      <div className="gutter">
        <p className="font-hand kicker">happy endings</p>
        <h1 className="font-display huge">Gone home</h1>
        <p className="lede">Every one of these pups has found a family to love them.</p>
        {loading && <p className="status">Fetching pups…</p>}
        {error && <p className="status status--error">{error}</p>}
        <ul className="sketches">
          {data?.items.map((p, i) => <Reveal as="li" key={p.slug} delay={(i % 3) * 70}><Sketch puppy={p} index={i} /></Reveal>)}
        </ul>
      </div>
    </section>
  );
}
