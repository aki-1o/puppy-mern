import { useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Paw from './Paw';
import WhatsAppButton from './WhatsAppButton';
import { BRAND } from '../config';
import { useHeaderBehavior } from '../hooks/useHeaderBehavior';

const LINKS = [
  ['/', 'Home', true], ['/puppies', 'Puppies'], ['/happy-families', 'Happy families'],
  ['/how-it-works', 'How it works'], ['/faq', 'FAQ'], ['/contact', 'Visit & contact'],
];

export default function Header() {
  const { scrolled, hidden } = useHeaderBehavior();
  const dialog = useRef(null);
  const close = () => dialog.current?.close();

  return (
    <header className="header" data-scrolled={scrolled} data-hidden={hidden}>
      <div className="header__bar gutter">
        <Link to="/" className="header__brand" aria-label={`${BRAND} — home`}>
          <span className="header__logo" aria-hidden="true"><Paw /></span><span className="font-display">{BRAND}</span>
        </Link>
        <nav aria-label="Main" className="header__nav">
          <ul>
            {LINKS.map(([to, label, end]) => (
              <li key={to}>
                <NavLink className="navlink" to={to} end={end}><span>{label}</span><Paw className="navlink__paw" /></NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header__end">
          <WhatsAppButton className="header__wa">WhatsApp us</WhatsAppButton>
          <button type="button" className="header__menu-btn" aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}>Menu</button>
        </div>
      </div>
      <dialog ref={dialog} className="menu" aria-label="Site menu" onClick={(e) => e.target === dialog.current && close()}>
        <p className="font-hand menu__hello">where to, friend?</p>
        <button type="button" className="menu__close" onClick={close}>Close</button>
        <ul>
          {LINKS.map(([to, label]) => (
            <li key={to}><Link to={to} onClick={close} className="font-display">{label}</Link></li>
          ))}
        </ul>
        <WhatsAppButton>WhatsApp us</WhatsAppButton>
      </dialog>
    </header>
  );
}
