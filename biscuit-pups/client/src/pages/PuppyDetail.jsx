import { Link, useParams } from 'react-router-dom';
import EnquiryForm from '../components/EnquiryForm';
import PuppyArt from '../components/PuppyArt';
import PhotoCredit from '../components/PhotoCredit';
import WhatsAppButton from '../components/WhatsAppButton';
import { useFetch } from '../hooks/useFetch';
import { BREEDS, BRAND } from '../config';

const GENDER = { boy: 'Boy', girl: 'Girl', both: 'Boy & girl' };

export default function PuppyDetail() {
  const { slug } = useParams();
  const { data: p, loading, error } = useFetch(`/puppies/${slug}`);

  if (loading) return <section className="page gutter"><p className="status">Fetching pup…</p></section>;
  if (error) return <section className="page gutter"><h1 className="font-display">Pup not found</h1><p><Link to="/puppies">See all puppies</Link></p></section>;

  const breeds = p.breeds.map((b) => BREEDS.find(([v]) => v === b)?.[1] ?? b).join(' × ');
  const msg = `Hi ${BRAND}! I'd love to know more about ${p.name} (${GENDER[p.gender].toLowerCase()}, ${p.ageLabel}).`;

  return (
    <section className="page scene" style={{ '--top': '#fffdf8', '--bottom': '#fbe3b4' }}>
      <div className="gutter detail">
        <div className="polaroid detail__photo" data-pet><span className="tape" />
          {p.image ? <img src={p.image} alt={p.alt || p.name} /> : <PuppyArt puppy={p} className="detail__art" title={p.alt || p.name} />}
          {p.image && <PhotoCredit credit={p.credit} />}
        </div>
        <div>
          <Link to="/puppies" className="back">← All puppies</Link>
          <h1 className="font-display huge">{p.name}</h1>
          <ul className="chips">
            <li><span className="chip">{breeds}</span></li>
            <li><span className="chip">{GENDER[p.gender]}</span></li>
            <li><span className="chip">{p.ageLabel}</span></li>
            <li><span className="chip">{p.origin === 'imported' ? 'Imported' : 'In our showroom'}</span></li>
            {p.hasVideo && <li><span className="chip">Video on request</span></li>}
          </ul>
          <WhatsAppButton>Ask about {p.name} on WhatsApp</WhatsAppButton>
          <h2 className="font-hand">…or leave an enquiry</h2>
          <EnquiryForm puppySlug={p.slug} defaultMessage={msg} />
        </div>
      </div>
    </section>
  );
}
