import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Preview from './pages/Preview';
import Press from './pages/Press';
import Contact from './pages/Contact';
import Technical from './pages/Technical';
import { setRobotsMeta } from './utils/seo';
import './App.css';

// Handle __NO_INDEX__ variable that may not be defined
// eslint-disable-next-line no-undef
const NO_INDEX = typeof __NO_INDEX__ !== 'undefined' ? __NO_INDEX__ : false;

function App() {
  useEffect(() => {
    // Set robots meta tag to prevent indexing during development
    setRobotsMeta(NO_INDEX);
  }, []);

  return (
    <Router>
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
