import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Preview from './pages/Preview';
import Press from './pages/Press';
import Contact from './pages/Contact';
import Technical from './pages/Technical';
import LiquidGlassNavbar from './components/LiquidGlassNavbar';
import { setRobotsMeta } from './utils/seo';
import { useAutoSEO } from './hooks/useSEO';
import './App.css';

// Component to scroll to top on route change and handle auto SEO
function ScrollToTop() {
  const { pathname } = useLocation();
  
  // Automatically apply SEO based on current route
  useAutoSEO();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  useEffect(() => {
    // Ensure the site is indexable by search engines
    setRobotsMeta(false);
    
    // React DevTools notice for development
    if (import.meta.env.DEV) {
      console.info('💡 For better development experience, install React DevTools: https://react.dev/link/react-devtools');
    }
  }, []);

  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <ScrollToTop />
      <LiquidGlassNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/press" element={<Press />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/technical" element={<Technical />} />
      </Routes>
    </Router>
  );
}

export default App;
