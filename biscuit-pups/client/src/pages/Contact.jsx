import { useState } from 'react';
import { api } from '../lib/api';
import { useFetch } from '../hooks/useFetch';
import WhatsAppButton from '../components/WhatsAppButton';
import { BRAND, EMAIL, PHONE_DISPLAY, PHONE_TEL, LOCATION } from '../config';

const GENDER = { boy: 'boy', girl: 'girl', both: 'boy & girl' };

export default function Contact() {
  const { data } = useFetch('/puppies?limit=48');
  const [status, setStatus] = useState({ type: 'idle', text: '' });

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const b = Object.fromEntries(new FormData(form));
    const message = b.message?.trim() || `Hi ${BRAND}, I'd like to know more${b.puppySlug ? ' about a puppy' : ''}.`;
    setStatus({ type: 'sending', text: '' });
    try {
      await api('/enquiries', { method: 'POST', body: JSON.stringify({ ...b, message, puppySlug: b.puppySlug || undefined }) });
      form.reset();
      setStatus({ type: 'ok', text: "Your letter is in the post! We'll be in touch very soon. 🐾" });
    } catch (err) { setStatus({ type: 'error', text: err.message }); }
  }

  return (
    <section className="page scene" style={{ '--top': '#fffdf8', '--bottom': '#fbe3b4' }}>
      <div className="gutter contact">
        <div>
          <h1 className="font-display huge">Get in touch with us</h1>
          <p className="lede">Have questions about our puppies or how adoption works? Write us a letter and our team will get back to you promptly. Ready to adopt or just curious, we'd love to hear from you.</p>
          <form className="letter enquiry" onSubmit={onSubmit} noValidate>
            <p className="font-display">Dear {BRAND},</p>
            <p>my name is <input name="name" required maxLength={80} aria-label="Your name" autoComplete="name" placeholder="your name" />, and you can reach me on <input name="phone" inputMode="tel" maxLength={30} aria-label="Phone" autoComplete="tel" placeholder="phone" /> or by email at <input name="email" type="email" maxLength={120} aria-label="Email" autoComplete="email" placeholder="email" />.</p>
            <p>I live in <input name="city" maxLength={60} aria-label="City" autoComplete="address-level2" placeholder="your city" />, and I'm curious about{' '}
              <select name="puppySlug" aria-label="Puppy you're interested in (optional)" defaultValue="">
                <option value="">any puppy (not sure yet)</option>
                {(data?.items ?? []).map((p) => <option key={p.slug} value={p.slug}>{p.name} ({GENDER[p.gender]})</option>)}
              </select>.</p>
            <label>Your message (optional)<textarea name="message" rows={4} maxLength={1000} /></label>
            <input name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
            <p className="font-hand">with love, a future puppy parent</p>
            <button className="btn btn-primary" disabled={status.type === 'sending'}>{status.type === 'sending' ? 'Posting…' : 'Post my letter'}</button>
            {status.text && <p className={`enquiry__msg enquiry__msg--${status.type}`} role="status">{status.text}</p>}
          </form>
        </div>
        <aside className="contact__side">
          <div className="path">
            <h2 className="font-display">Say hello</h2>
            <WhatsAppButton>WhatsApp {PHONE_DISPLAY}</WhatsAppButton>
            <p><b>call us</b><br /><a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a></p>
            <p><b>email</b><br /><a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
          </div>
          <div className="path">
            <h2 className="font-display">Visit us</h2>
            <p>Step into our showroom and choose your puppy face-to-face. Please message ahead so we can have your favourites ready.</p>
            <p className="tag font-hand">{LOCATION}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
