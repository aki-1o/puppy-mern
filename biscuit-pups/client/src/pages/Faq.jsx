import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import WhatsAppButton from '../components/WhatsAppButton';

export default function Faq() {
  const { data, loading, error } = useFetch('/faqs');
  const [q, setQ] = useState('');
  const shown = useMemo(() => {
    const t = q.trim().toLowerCase();
    return (data ?? []).filter((f) => !t || `${f.question} ${f.answer}`.toLowerCase().includes(t));
  }, [data, q]);

  return (
    <section className="page scene" data-tone="dark" style={{ '--top': '#4d2b19', '--bottom': '#2f1a10' }}>
      <div className="gutter">
        <h1 className="font-display huge">Questions &amp; answers</h1>
        <p className="lede">Can't find what you're looking for? Message us on WhatsApp — our team is available 24/7.</p>
        <label className="faqsearch font-hand">sniff out a question
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="vaccinated, delivery, import…" />
        </label>
        <p className="font-hand status" aria-live="polite">{data ? `${shown.length} note${shown.length === 1 ? '' : 's'} on the board` : ''}</p>
        {loading && <p className="status">Fetching questions…</p>}
        {error && <p className="status status--error">{error}</p>}
        <div className="faqboard">
          {shown.map((f) => (
            <details key={f._id} className="faqnote"><summary className="font-display">{f.question}</summary><p>{f.answer}</p></details>
          ))}
        </div>
        {data && !shown.length && <p className="status">Nothing matches — <button type="button" className="linklike" onClick={() => setQ('')}>clear the search</button>.</p>}
        <div className="actions">
          <WhatsAppButton>Ask your own question</WhatsAppButton>
          <Link className="btn btn-ghost" to="/contact">Write us a letter</Link>
        </div>
      </div>
    </section>
  );
}
