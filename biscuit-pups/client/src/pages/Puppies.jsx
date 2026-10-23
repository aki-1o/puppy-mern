import { Link, useSearchParams } from 'react-router-dom';
import Sketch from '../components/Sketch';
import PuppyArt from '../components/PuppyArt';
import Reveal from '../components/Reveal';
import { useFetch } from '../hooks/useFetch';
import { BREEDS } from '../config';

const SELF = { name: 'Biscuit', fur: '#f0be6b', ear: '#d99a45', muzzle: '#fff3dc', bg: '#fbe3b4' };

export default function Puppies() {
  const [params, setParams] = useSearchParams();
  const breed = params.get('breed') || '';
  const origin = params.get('origin') || '';
  const gender = params.get('gender') || '';
  const qs = new URLSearchParams({ ...(breed && { breed }), ...(origin && { origin }), ...(gender && { gender }) }).toString();
  const { data, loading, error } = useFetch(`/puppies${qs ? `?${qs}` : ''}`);
  const gone = useFetch('/puppies?status=gone-home&limit=5');

  const set = (key, value) => {
    const next = new URLSearchParams(params);
    value ? next.set(key, value) : next.delete(key);
    setParams(next, { replace: true });
  };
  const chip = (k, v, label, active) => (
    <button key={`${k}-${v}`} type="button" className="chip" data-active={active} aria-pressed={active} onClick={() => set(k, active && v ? '' : v)}>{label}</button>
  );

  return (
    <>
      <section className="page scene" style={{ '--top': '#fffdf8', '--bottom': '#fdf2dc' }}>
        <div className="gutter">
          <div className="sketchhead">
            <div>
              <p className="font-hand kicker">from Biscuit's sketchbook</p>
              <h1 className="font-display giant">Available puppies
                <svg className="underline" viewBox="0 0 400 24" preserveAspectRatio="none" aria-hidden="true"><path d="M4 15c40-9 70 5 112-2s70-9 112 0 74 8 116-1 38-4 52 1" /></svg>
              </h1>
              <p className="lede">Open a profile to meet each pup, then ask us about them on WhatsApp.</p>
            </div>
            <figure className="selfie" data-pet><div><PuppyArt puppy={SELF} title="Biscuit, our mascot" /></div><figcaption className="font-hand">self-portrait</figcaption></figure>
          </div>
          <div className="filterpanel" role="group" aria-label="Filters">
            <div className="frow"><span className="font-hand">where</span><div>
              {chip('origin', '', 'Everywhere', origin === '')}
              {chip('origin', 'local', 'In our showroom', origin === 'local')}
              {chip('origin', 'imported', 'Imported', origin === 'imported')}</div></div>
            <div className="frow"><span className="font-hand">breed</span><div>{BREEDS.map(([v, label]) => chip('breed', v, label, breed === v))}</div></div>
            <div className="frow"><span className="font-hand">boy or girl</span><div>
              {chip('gender', 'boy', 'Boys', gender === 'boy')}
              {chip('gender', 'girl', 'Girls', gender === 'girl')}</div></div>
          </div>
          {loading && <p className="status">Fetching pups…</p>}
          {error && <p className="status status--error">{error}</p>}
          {data && <p className="status font-hand" aria-live="polite">{data.total} {data.total === 1 ? 'puppy' : 'puppies'} looking for a home</p>}
          {data && !data.items.length && <p className="status">No pups match that right now — <Link to="/puppies">clear filters</Link>.</p>}
          <ul className="sketches">
            {data?.items.map((p, i) => <Reveal as="li" key={p.slug} delay={(i % 3) * 70}><Sketch puppy={p} index={i} /></Reveal>)}
          </ul>
        </div>
      </section>

      {gone.data?.items?.length > 0 && (
        <section className="scene gonehome" style={{ '--top': '#fdf2dc', '--bottom': '#fbe3b4' }}>
          <div className="gutter gonehome__grid">
            <div>
              <h2 className="font-display huge">Already gone home</h2>
              <p className="lede">These puppies have found their families.</p>
              <div className="actions"><Link className="btn btn-primary" to="/gone-home">See the puppies who've gone home</Link></div>
            </div>
            <ul className="sketches sketches--row">
              {gone.data.items.map((p, i) => <li key={p.slug}><Sketch puppy={p} index={i + 2} /></li>)}
            </ul>
          </div>
          <svg className="wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40C240 100 420 0 720 30s520 60 720 0v60H0z" fill="#24130b" /></svg>
        </section>
      )}
    </>
  );
}
