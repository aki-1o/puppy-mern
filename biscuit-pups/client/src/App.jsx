import { useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PawTrail from './components/PawTrail';
import Home from './pages/Home';
import Puppies from './pages/Puppies';
import PuppyDetail from './pages/PuppyDetail';
import HappyFamilies from './pages/HappyFamilies';
import HowItWorks from './pages/HowItWorks';
import Faq from './pages/Faq';
import Contact from './pages/Contact';
import Credits from './pages/Credits';
import GoneHome from './pages/GoneHome';
import { useSmoothScroll } from './hooks/useSmoothScroll';

/** Scroll to top on route change, or to #anchor when the URL has one. */
function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 60);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash, key]);
  return null;
}

export default function App() {
  useSmoothScroll();
  return (
    <>
      <PawTrail />
      <a className="skip" href="#main">Skip to content</a>
      <ScrollManager />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/puppies" element={<Puppies />} />
          <Route path="/puppies/:slug" element={<PuppyDetail />} />
          <Route path="/gone-home" element={<GoneHome />} />
          <Route path="/happy-families" element={<HappyFamilies />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="*" element={<section className="page gutter"><h1 className="font-display">Lost pup?</h1><p><Link to="/">Back home</Link></p></section>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
