import { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Preview from './pages/Preview';
import Press from './pages/Press';
import Contact from './pages/Contact';
import Technical from './pages/Technical';
import LiquidGlassNavbar from './components/LiquidGlassNavbar';
import Footer from './components/Footer';
import { setRobotsMeta } from './utils/seo';
import { useAutoSEO } from './hooks/useSEO';
import { ReactLenis, useLenis } from 'lenis/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Component to handle auto SEO without scrolling
function AutoSEO() {
  // Automatically apply SEO based on current route
  useAutoSEO();
  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
}

function App() {
  const lenisRef = useRef();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const lenis = lenisRef.current?.lenis;
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
    }

    return () => {
      gsap.ticker.remove(update);
      if (lenis) {
        lenis.off('scroll', ScrollTrigger.update);
      }
    };
  }, []);

  useEffect(() => {
    // Ensure the site is indexable by search engines
    setRobotsMeta(false);

    // React DevTools notice for development
    if (import.meta.env.DEV) {
      console.info('💡 For better development experience, install React DevTools: https://react.dev/link/react-devtools');
    }
  }, []);

  return (
    <ReactLenis root ref={lenisRef} autoRaf={false}>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <ScrollToTop />
        <AutoSEO />
        <LiquidGlassNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/press" element={<Press />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/technical" element={<Technical />} />
        </Routes>
        <Footer />
      </Router>
    </ReactLenis>
  );
}

export default App;
