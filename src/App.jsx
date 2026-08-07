import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Eager load critical components
import LiquidGlassNavbar from './components/LiquidGlassNavbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import CookieConsent from './components/CookieConsent';

// Lazy load page components for code splitting
const Home = lazy(() => import('./pages/Home'));
const Home2 = lazy(() => import('./pages/Home2'));
const Preview = lazy(() => import('./pages/Preview'));
const Reviews = lazy(() => import('./pages/Reviews'));
const Contact = lazy(() => import('./pages/Contact'));
const Technical = lazy(() => import('./pages/Technical'));

// Import utilities
import { setRobotsMeta } from './utils/seo';
import { initAnalytics, trackPageView } from './utils/analytics';
import './App.css';

// Register GSAP plugins once
gsap.registerPlugin(ScrollTrigger);

// Prevent mobile browsers from recalculating ScrollTrigger on URL-bar show/hide
ScrollTrigger.config({
  ignoreMobileResize: true
});

// Configure GSAP defaults for better performance
gsap.defaults({
  ease: 'power2.out',
  duration: 0.3
});

// Configure ScrollTrigger defaults
ScrollTrigger.defaults({
  toggleActions: 'play none none reverse',
  markers: false
});

// Scroll restoration component
function ScrollRestoration() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Simple scroll to top on route change
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

// Route change handler for analytics/SEO
function RouteHandler() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Update page title based on route
    const titles = {
      '/': 'Epic Economics: What would you protest about today?',
      '/home2': 'Epic Economics: What would you protest about today?',
      '/preview': 'Preview - Epic Economics',
      '/reviews': 'Reviews - Epic Economics',
      '/contact': 'Contact Us - Epic Economics',
      '/technical': 'Technical - Epic Economics'
    };
    document.title = titles[pathname] || 'Epic Economics';

    // Track page view for analytics
    trackPageView(pathname);

    // Refresh ScrollTrigger on route change
    ScrollTrigger.refresh();
  }, [pathname]);

  return null;
}

function App() {
  useEffect(() => {
    // Ensure site is indexable
    setRobotsMeta(false);

    // Initialize analytics (respecting stored consent)
    initAnalytics();

    // Cleanup all ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <HelmetProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <ScrollRestoration />
        <RouteHandler />
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <LiquidGlassNavbar />

        <main id="main-content">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home2" element={<Home2 />} />
              <Route path="/preview" element={<Preview />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/technical" element={<Technical />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
        <CookieConsent />
      </Router>
    </HelmetProvider>
  );
}

export default App;
