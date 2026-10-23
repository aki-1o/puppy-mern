import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import PuppyArt from './PuppyArt';
import WhatsAppButton from './WhatsAppButton';
import { PAW_D } from './Paw';
import { BREEDS, BRAND } from '../config';

const STEPS = [
  ['Choose your breed', "Pick a breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle."],
  ['Get photos & details', 'Our team shares photos, health details and everything you need to know, right in your chat.'],
  ['Secure & safe delivery', 'Once confirmed, we take care of the rest so your puppy arrives safe, calm and ready to cuddle.'],
];
const SAMPLE = { fur: '#f0be6b', ear: '#d99a45', muzzle: '#fff3dc', bg: '#fbe3b4' };
const SAMPLE2 = { fur: '#e8b878', ear: '#c98f4f', muzzle: '#fff0d6', bg: '#f9cfc2' };

/** "Your puppy journey": the phone chat on the right changes as each step scrolls into view. */
export default function PhoneJourney() {
  const [step, setStep] = useState(0);
  const items = useRef([]);
  const pattern = useMemo(() => `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='76' height='76' viewBox='0 0 76 76'><path transform='translate(12 10) scale(.42)' fill='%23c2622b' fill-opacity='.14' d='${PAW_D}'/></svg>`)}")`, []);

  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setStep(Number(e.target.dataset.i))), { rootMargin: '-42% 0px -42% 0px' });
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="gutter journey">
      <div>
        <Reveal><h2 id="journey-title" className="font-display huge">Your puppy journey</h2>
          <p className="lede">A step-by-step concierge experience. We make adoption simple, secure and purely joyful.</p></Reveal>
        <ol className="steps steps--tall">
          {STEPS.map(([t, d], i) => (
            <li key={t} data-i={i} data-on={step === i} ref={(el) => (items.current[i] = el)}>
              <span className="steps__num font-display">{i + 1}</span><h3 className="font-display">{t}</h3><p>{d}</p>
            </li>
          ))}
        </ol>
        <Link className="btn btn-ghost" to="/how-it-works">How it works</Link>
      </div>
      <div className="phone" style={{ '--paws': pattern }}>
        <p className="phone__top"><span className="phone__badge">🧸</span><span><b>{BRAND}</b><small>online</small></span></p>
        <div className="phone__body" key={step}>
          {step === 0 && <>
            <p className="bubble bubble--me">Hi {BRAND}! I'd love to know more about your puppies.</p>
            <div className="bubble"><p>Pick your preferred breed, or tell us what you're looking for.</p>
              <ul className="chips">{BREEDS.map(([slug, label]) => <li key={slug}><Link to={`/puppies?breed=${slug}`}>{label}</Link></li>)}</ul></div>
          </>}
          {step === 1 && <>
            <div className="phone__photos"><PuppyArt puppy={SAMPLE} /><PuppyArt puppy={SAMPLE2} /></div>
            <div className="phone__video"><PuppyArt puppy={SAMPLE} /><span className="phone__play" aria-hidden="true">▶</span></div>
            <p className="bubble">Our team shares photos, health details and everything you need, right here in the chat.</p>
          </>}
          {step === 2 && <>
            <p className="bubble">Our team shares photos, health details and everything you need, right here in the chat.</p>
            <div className="bubble"><p>Once confirmed, we take care of everything so your puppy arrives safe and stress-free.</p>
              <svg viewBox="0 0 260 70" className="phone__route" aria-hidden="true"><path d="M12 52Q70 12 130 40T238 28" fill="none" stroke="#a24a1a" strokeWidth="2.4" strokeDasharray="2 8" strokeLinecap="round" /><circle cx="12" cy="52" r="5" fill="#a24a1a" /><path d="M226 30l12-12 12 12v16h-24z" fill="#f0be6b" stroke="#2a170e" strokeWidth="2.6" strokeLinejoin="round" /></svg></div>
          </>}
        </div>
        <WhatsAppButton className="phone__send">Say hello on WhatsApp</WhatsAppButton>
      </div>
    </div>
  );
}
