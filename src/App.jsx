import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Preview from './pages/Preview';
import Press from './pages/Press';
import Contact from './pages/Contact';
import Technical from './pages/Technical';
import LiquidGlassNavbar from './components/LiquidGlassNavbar';
import { setRobotsMeta } from './utils/seo';
import './App.css';

// Component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  useEffect(() => {
    // Ensure the site is indexable by search engines
    setRobotsMeta(false);
  }, []);

  return (
    <Router>
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
