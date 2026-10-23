import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import Walker from '../components/Walker';
import DoorStage from '../components/DoorStage';
import Signpost from '../components/Signpost';
import PhoneJourney from '../components/PhoneJourney';
import Passport from '../components/Passport';
import House from '../components/House';
import PuppyArt from '../components/PuppyArt';
import Polaroid from '../components/Polaroid';
import WhatsAppButton from '../components/WhatsAppButton';
import { useFetch } from '../hooks/useFetch';


const MASCOT = { name: 'Biscuit', fur: '#f0be6b', ear: '#d99a45', muzzle: '#fff3dc', bg: 'none' };
const TILTS = [1.6, 2.4, 0.8, -2.2, 1.2, -0.9, -1.5, -2.6];

export default function Home() {
  const { data, loading, error } = useFetch('/home');
  const puppies = data?.puppies ?? [];
  const six = puppies.slice(0, 6);
  const lineup = six.length ? [...six.slice(0, 3), { mascot: true }, ...six.slice(3)] : [];

  return (
    <>
      <Walker />
      {/* HERO — morning */}
      <section className="scene hero" data-pup="90" style={{ '--top': '#fffdf8', '--bottom': '#fff1d8' }} aria-labelledby="hero-title">
        <span className="hero__sun" aria-hidden="true" />
        <div className="gutter hero__copy">
          <p className="hero__note font-hand">every puppy is family</p>
          <h1 id="hero-title" className="font-display hero__title">Premium teacup<br />puppies, delivered with love</h1>
          <p className="lede">Meet your new best friend in our showroom, or order a rare miniature breed from trusted breeders worldwide.</p>
          <div className="actions">
            <Link className="btn btn-primary" to="/puppies">View available puppies</Link>
            <WhatsAppButton>Enquire on WhatsApp</WhatsAppButton>
          </div>
        </div>
        <ul className="lineup gutter">
          {lineup.map((p, i) => (
            <li key={p.slug || 'mascot'} style={{ '--i': i }} className={p.mascot ? 'lineup__mascot' : undefined}>
              {p.mascot ? (
                <span data-pet aria-hidden="true"><PuppyArt puppy={MASCOT} className="lineup__mascot-art" /></span>
              ) : (
                <Link to={`/puppies/${p.slug}`} aria-label={`Meet ${p.name}`} data-pet>
                  {p.image ? <img src={p.image} alt={p.alt} loading="eager" /> : <PuppyArt puppy={p} className="lineup__art" />}
                  <span className="font-hand">{p.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
        {loading && <p className="status gutter">Fetching pups…</p>}
        {error && <p className="status status--error gutter">Couldn't reach the API ({error}). Is the server running?</p>}
      </section>

      {/* MEET — scroll-driven doors */}
      <DoorStage puppies={puppies} />

      {/* TWO WAYS */}
      <section className="scene" data-pup="50" style={{ '--top': '#fbe3b4', '--bottom': '#f6cd86' }} aria-labelledby="paths-title">
        <div className="gutter">
          <Reveal><h2 id="paths-title" className="font-display huge center">Two ways to meet your puppy</h2></Reveal>
          <Signpost />
        </div>
      </section>

      {/* JOURNEY */}
      <section className="scene" id="journey" data-pup="46" style={{ '--top': '#f6cd86', '--bottom': '#f0b866' }} aria-labelledby="journey-title">
        <PhoneJourney />
      </section>

      {/* TRUST — passport */}
      <section className="scene" data-pup="50" style={{ '--top': '#f0b866', '--bottom': '#a65a30' }} aria-labelledby="trust-title">
        <div className="gutter"><Passport /></div>
      </section>

      {/* FAMILIES — dusk */}
      <section className="scene" id="families" data-tone="dark" data-pup="62" style={{ '--top': '#a65a30', '--bottom': '#4d2b19' }} aria-labelledby="families-title">
        <div className="gutter">
          <div className="fam__top">
            <Reveal className="head">
              <h2 id="families-title" className="font-display huge">Happy families &amp; puppies</h2>
              <p className="lede">We love seeing our puppies become cherished members of loving families.</p>
              <Link className="btn btn-ghost" to="/happy-families">See the whole wall</Link>
            </Reveal>
            {data?.testimonial && (
              <Reveal as="blockquote" className="quote quote--bubble" delay={100}>
                <p>“{data.testimonial.quote}”</p>
                <footer>{data.testimonial.author}, {data.testimonial.location}</footer>
              </Reveal>
            )}
          </div>
          <div className="shelf"><span className="shelf__rail" aria-hidden="true" />
            <ul className="wall">
              {(data?.families ?? []).slice(0, 4).map((f, i) => (
                <Reveal as="li" key={f._id} delay={i * 80} style={{ '--tilt': `${TILTS[i % TILTS.length]}deg` }}>
                  <Polaroid family={f} />
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ — night */}
      <section className="scene" id="faq" data-tone="dark" data-pup="14" style={{ '--top': '#4d2b19', '--bottom': '#2f1a10' }} aria-labelledby="faq-title">
        <div className="gutter faq">
          <Reveal><h2 id="faq-title" className="font-display huge">Questions, answered</h2>
            <div className="actions"><Link className="btn btn-ghost" to="/faq">Read all questions</Link></div>
            <span className="faq__q font-display" aria-hidden="true">?</span></Reveal>
          <div className="faq__list">
            {(data?.faqs ?? []).map((f) => (
              <details key={f._id}><summary className="font-display">{f.question}</summary><p>{f.answer}</p></details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — welcome home */}
      <section className="scene cta" data-tone="dark" data-pup="22" style={{ '--top': '#2f1a10', '--bottom': '#24130b' }} aria-labelledby="cta-title">
        <div className="gutter cta__stack">
          <Reveal className="center">
            <h2 id="cta-title" className="font-display huge">Ready to meet your new best friend?</h2>
            <p className="lede">Bring home a healthy, happy teacup or designer puppy with expert guidance every step of the way.</p>
          </Reveal>
          {puppies[0] && <Reveal delay={120}><House puppy={puppies[0]} /></Reveal>}
          <div className="actions center">
            <WhatsAppButton>Enquire on WhatsApp</WhatsAppButton>
            <Link className="btn btn-ghost" to="/contact">Visit &amp; contact</Link>
          </div>
        </div>
      </section>
    </>
  );
}
