import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { useTitleHeroVisibility } from '../hooks/useTitleHeroVisibility';
import './LiquidGlassNavbar.css';

function LiquidGlassNavbar() {
  const [isVisible, setIsVisible] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  // Check if TitleHero element is scrolled into view
  const isTitleHeroVisible = useTitleHeroVisibility(100);
  
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('up');
  const tickingRef = useRef(false);

  // Optimized scroll handler
  const handleScroll = useCallback(() => {
    if (!tickingRef.current) {
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const direction = currentScrollY > lastScrollY ? 'down' : 'up';
        
        // Only show navbar when scrolling up OR when TitleHero is visible and scrolling down
        if (isHomePage) {
          // On home page: show when scrolling up or after TitleHero is visible
          setIsVisible(direction === 'up' || isTitleHeroVisible);
        } else {
          // On other pages: always show
          setIsVisible(true);
        }
        
        setScrollDirection(direction);
        setLastScrollY(currentScrollY);
        tickingRef.current = false;
      });
      tickingRef.current = true;
    }
  }, [lastScrollY, isTitleHeroVisible, isHomePage]);

  // Set up scroll event listener
  useEffect(() => {
    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Update visibility based on TitleHero visibility when on home page
  useEffect(() => {
    if (isHomePage) {
      setIsVisible(scrollDirection === 'up' || isTitleHeroVisible);
    }
  }, [isTitleHeroVisible, scrollDirection, isHomePage]);

  // Animate navbar visibility with optimized GSAP animation
  useEffect(() => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
        duration: 0.4, // Slightly faster for better UX
        ease: "power2.out",
        overwrite: "auto" // Prevent animation conflicts
      });
    }
  }, [isVisible]);

  // Handle route changes - reset visibility state
  useEffect(() => {
    if (!isHomePage) {
      setIsVisible(true);
    } else {
      // When returning to home, determine visibility based on current state
      setIsVisible(scrollDirection === 'up' || isTitleHeroVisible);
    }
  }, [location.pathname, isHomePage, scrollDirection, isTitleHeroVisible]);

  return (
    <nav ref={navRef} className="liquid-glass-navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" aria-label="Epic Economics - Home">
            <img src="/favicon-32x32.png" alt="Epic Economics" className="navbar-logo" />
            <span className="navbar-title">Epic Economics</span>
          </Link>
        </div>
        
        <div className="navbar-menu" role="menubar">
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'active' : ''}
            role="menuitem"
            aria-current={location.pathname === '/' ? 'page' : undefined}
          >
            Home
          </Link>
          <Link 
            to="/press" 
            className={location.pathname === '/press' ? 'active' : ''}
            role="menuitem"
            aria-current={location.pathname === '/press' ? 'page' : undefined}
          >
            Press
          </Link>
          <Link 
            to="/technical" 
            className={location.pathname === '/technical' ? 'active' : ''}
            role="menuitem"
            aria-current={location.pathname === '/technical' ? 'page' : undefined}
          >
            Technical
          </Link>
          <Link 
            to="/contact" 
            className={location.pathname === '/contact' ? 'active' : ''}
            role="menuitem"
            aria-current={location.pathname === '/contact' ? 'page' : undefined}
          >
            Contact
          </Link>
        </div>

        {/* Liquid effect background elements */}
        <div className="liquid-bg" aria-hidden="true">
          <div className="liquid-blob blob-1"></div>
          <div className="liquid-blob blob-2"></div>
          <div className="liquid-blob blob-3"></div>
        </div>
      </div>
    </nav>
  );
}

export default LiquidGlassNavbar;