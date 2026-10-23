import { Link } from 'react-router-dom';
import Basket from './Basket';
import { BRAND, EMAIL, PHONE_DISPLAY, LOCATION } from '../config';

export default function Footer() {
  return (
    <footer className="footer" id="contact" data-pup="hide">
      <span className="footer__moon" aria-hidden="true" />
      <span className="footer__stars" aria-hidden="true" />
      <div className="gutter footer__grid">
        <div>
          <p className="font-display footer__big">Home, at last.</p>
          <p className="footer__text">{BRAND} is a friendly miniature-puppy brand with careful, personal service and safe delivery.</p>
          <Basket />
        </div>
        <nav aria-label="Footer">
          <h2 className="font-hand">Explore</h2>
          <ul>
            <li><Link to="/puppies">Available puppies</Link></li>
            <li><Link to="/gone-home">Gone home</Link></li>
            <li><Link to="/happy-families">Happy families</Link></li>
            <li><Link to="/how-it-works">How it works</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Visit &amp; contact</Link></li>
            <li><Link to="/credits">Photo credits</Link></li>
          </ul>
        </nav>
        <div>
          <h2 className="font-hand">Say hello</h2>
          <ul>
            <li>WhatsApp {PHONE_DISPLAY}</li>
            <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            <li>{LOCATION}</li>
          </ul>
        </div>
      </div>
      <p className="footer__legal gutter">Demo project — the puppies shown are illustrations or placeholder photos (<Link to="/credits">credits</Link>), not real listings.</p>
    </footer>
  );
}
