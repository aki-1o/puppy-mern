import { useState } from 'react';
import { api } from '../lib/api';

/** Enquiry form → POST /api/enquiries. Includes a hidden honeypot field for bots. */
export default function EnquiryForm({ puppySlug, defaultMessage = '' }) {
  const [status, setStatus] = useState({ type: 'idle', text: '' });

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const body = Object.fromEntries(new FormData(form));
    setStatus({ type: 'sending', text: '' });
    try {
      await api('/enquiries', { method: 'POST', body: JSON.stringify({ ...body, puppySlug }) });
      form.reset();
      setStatus({ type: 'ok', text: "Thank you! We'll message you very soon. 🐾" });
    } catch (err) {
      setStatus({ type: 'error', text: err.message });
    }
  }

  return (
    <form className="enquiry" onSubmit={onSubmit} noValidate>
      <label>Your name<input name="name" required maxLength={80} autoComplete="name" /></label>
      <div className="enquiry__row">
        <label>WhatsApp / phone<input name="phone" inputMode="tel" maxLength={30} autoComplete="tel" /></label>
        <label>Email<input name="email" type="email" maxLength={120} autoComplete="email" /></label>
      </div>
      <label>Message<textarea name="message" rows={3} required maxLength={1000} defaultValue={defaultMessage} /></label>
      <input name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      <button className="btn btn-primary" disabled={status.type === 'sending'}>
        {status.type === 'sending' ? 'Sending…' : 'Send enquiry'}
      </button>
      {status.text && <p className={`enquiry__msg enquiry__msg--${status.type}`} role="status">{status.text}</p>}
    </form>
  );
}
