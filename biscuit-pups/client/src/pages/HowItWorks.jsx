import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import Paw from '../components/Paw';

const WAYS = {
  local: {
    label: 'In our showroom', tag: 'meet in person', title: 'Meet your puppy in person',
    text: 'Step into our showroom and choose your puppy face-to-face. We work with trusted local breeders and make sure every pup is well socialised, well fed and vet-checked.',
    steps: [
      ['Explore our puppies', 'Browse the site. Each listing has photos, breed, age and health notes.'],
      ['Choose your puppy', 'Open a profile for more detail, or message us with any questions.'],
      ['Meet before you choose', 'Spend time bonding before you make your decision.'],
      ['Pick-up or delivery', 'Collect your puppy, or have them delivered to your door nearby, safely and comfortably.'],
    ],
  },
  imported: {
    label: 'Imported', tag: 'order on request', title: 'A rare breed, brought to you',
    text: 'Want a breed you cannot find locally? Tell us what you are after and we will source it from certified overseas breeders and handle the whole import.',
    steps: [
      ['Tell us what you want', 'Share the breed, size and colour you have in mind.'],
      ['See before it travels', 'We send photos, videos and health certificates first.'],
      ['We arrange the trip', 'Health checks, paperwork and cargo are all handled for you.'],
      ['Welcome home', 'Your puppy arrives rested and ready for cuddles.'],
    ],
  },
};
const PROMISE = [
  ['Hand-selected breeders', 'We only work with breeders who keep the highest ethical and health standards.'],
  ['Full transparency', 'Photos, videos and health certificates are shared before your puppy travels.'],
  ['Safe, stress-free delivery', 'We handle every detail so your puppy arrives happy, healthy and ready to love you.'],
];
const DELIVERY = [
  ['Take your puppy home the same day', 'Local puppies are ready immediately: visit, fall in love and go home together.'],
  ['Delivery nearby', 'Prefer to stay in? We bring your puppy to your door, safely and comfortably.'],
  ['Safe international cargo', 'We handle the paperwork and the travel so your puppy arrives calm.'],
  ['Worldwide delivery', 'Trusted cargo partners carry puppies safely to loving homes, whatever the distance.'],
];
const WHY = [
  ['International cargo', 'Trusted partners keep every journey comfortable and safe.'],
  ['Support 24/7', 'Our team is a message away, from choosing your puppy to life after delivery.'],
  ['Health guarantee', 'Every puppy is vaccinated, dewormed and checked by a licensed vet before joining your family.'],
  ['Unique, high-quality puppies', 'Healthy, well-bred and raised with care, so you can be confident in your choice.'],
];
const NAV = [['ways', 'Two ways home'], ['promise', 'Our promise'], ['delivery', 'Delivery & collection'], ['why', 'Why choose us']];

export default function HowItWorks() {
  const [way, setWay] = useState('local');
  const w = WAYS[way];
  return (
    <section className="page scene" style={{ '--top': '#fffdf8', '--bottom': '#fbe3b4' }}>
      <div className="gutter">
        <h1 className="font-display huge">How it works</h1>
        <p className="lede">Whether you visit us or order a premium breed from overseas, we make the experience unforgettable.</p>
        <nav className="hiw__nav" aria-label="On this page">
          {NAV.map(([id, label], i) => (
            <a key={id} className="chip" href={`#${id}`}><b>{i + 1}</b> {label}</a>
          ))}
        </nav>

        <div id="ways" className="hiw__block">
          <p className="font-hand kicker">choose your way</p>
          <h2 className="font-display huge">Two ways home</h2>
          <div className="hiw__toggle" role="tablist" aria-label="Choose a way">
            {Object.entries(WAYS).map(([k, v]) => (
              <button key={k} role="tab" type="button" aria-selected={way === k} className="chip" data-active={way === k} onClick={() => setWay(k)}>
                {v.label}<small> · {v.tag}</small>
              </button>
            ))}
          </div>
          <div className="hiw__way">
            <div><h3 className="font-display">{w.title}</h3><p className="lede">{w.text}</p>
              <div className="actions"><Link className="btn btn-primary" to={`/puppies?origin=${way}`}>See {w.label.toLowerCase()} puppies</Link></div></div>
            <ol className="steps">
              {w.steps.map(([t, d], i) => (
                <li key={t}><span className="steps__num font-display">{i + 1}</span><h3 className="font-display">{t}</h3><p>{d}</p></li>
              ))}
            </ol>
          </div>
        </div>

        <div id="promise" className="hiw__block">
          <p className="font-hand kicker">puppy passport</p>
          <h2 className="font-display huge">Our premium puppy promise</h2>
          <ul className="hiw__cards">
            {PROMISE.map(([t, d], i) => (
              <Reveal as="li" key={t} delay={i * 90}><span className="stamp"><Paw /><b className="font-display">{t}</b></span><p>{d}</p></Reveal>
            ))}
          </ul>
        </div>

        <div id="delivery" className="hiw__block">
          <h2 className="font-display huge">Delivery &amp; collection</h2>
          <p className="lede">From a same-day visit to a flight across continents, every puppy travels comfortably and arrives safely.</p>
          <ul className="hiw__cards hiw__cards--4">
            {DELIVERY.map(([t, d], i) => (
              <Reveal as="li" key={t} delay={i * 90}><h3 className="font-display">{t}</h3><p>{d}</p></Reveal>
            ))}
          </ul>
        </div>

        <div id="why" className="hiw__block">
          <h2 className="font-display huge">Why choose us</h2>
          <p className="lede">We're here to help you find a new family member and to be with you every step, from your first visit to the joyful day your puppy arrives.</p>
          <ul className="hiw__cards hiw__cards--4">
            {WHY.map(([t, d], i) => (
              <Reveal as="li" key={t} delay={i * 90}><h3 className="font-display">{t}</h3><p>{d}</p></Reveal>
            ))}
          </ul>
          <div className="actions"><Link className="btn btn-primary" to="/puppies">View available puppies</Link><Link className="btn btn-ghost" to="/contact">Visit &amp; contact</Link></div>
        </div>
      </div>
    </section>
  );
}
