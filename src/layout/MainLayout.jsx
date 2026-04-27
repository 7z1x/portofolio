import { useLocation, useOutlet, NavLink } from 'react-router-dom';
import { GoHome, GoHomeFill } from 'react-icons/go';
import { HiOutlineViewGrid, HiViewGrid } from 'react-icons/hi';
import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import PillNav from '../components/PillNav/PillNav';
import Footer from '../components/Footer/Footer';
import { motion, AnimatePresence } from 'motion/react';
import './MainLayout.css';

const GridScan = lazy(() => import('../components/GridScan/GridScan'));

export default function MainLayout() {
  const location = useLocation();
  const outletElement = useOutlet();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Project', href: '/project' }
  ];

  const [showSplash, setShowSplash] = useState(true);
  const [fadeSplash, setFadeSplash] = useState(false);

  useEffect(() => {
    // Fade out after 2.5s, remove entirely after 3s
    const timer1 = setTimeout(() => {
      setFadeSplash(true);
    }, 1500);
    const timer2 = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  // Hide navbar on scroll down, show on scroll up
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (currentY < 50) {
        setHeaderVisible(true);
      } else if (delta > 5) {
        // scrolling down
        setHeaderVisible(false);
      } else if (delta < -5) {
        // scrolling up
        setHeaderVisible(true);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {showSplash && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          zIndex: 9999, backgroundColor: '#000',
          opacity: fadeSplash ? 0 : 1, transition: 'opacity 0.5s ease',
          pointerEvents: 'none'
        }}>
          <Suspense fallback={null}>
            <GridScan
              sensitivity={0.55}
              lineThickness={1}
              linesColor="#2F293A"
              gridScale={0.1}
              scanColor="#6abf5b"
              scanOpacity={0.4}
              enablePost={typeof window !== 'undefined' && window.innerWidth > 768}
              bloomIntensity={0.6}
              chromaticAberration={0.002}
              noiseIntensity={0.01}
            />
          </Suspense>
        </div>
      )}
      <div className="tv-app-container">
        <header className={`tv-header ${headerVisible ? '' : 'tv-header--hidden'}`}>
          <PillNav
            logo="/logo.png"
            logoAlt="Zulfahmi Logo"
            logoHref="/"
            items={navItems}
            activeHref={location.pathname}
            ease="power2.easeOut"
            baseColor="#ffffff"
            pillColor="rgba(0, 0, 0, 0.6)"
            hoveredPillTextColor="#000000"
            pillTextColor="#e5e5e5"
            initialLoadAnimation={true}
          />
        </header>

        {/* Bottom Nav — mobile only */}
        <nav className="bottom-nav">
          <div className="bottom-nav-inner">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
            >
              {({ isActive }) => (
                <>
                  {isActive ? <GoHomeFill /> : <GoHome />}
                  <span>Home</span>
                </>
              )}
            </NavLink>
            <NavLink
              to="/project"
              className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
            >
              {({ isActive }) => (
                <>
                  {isActive ? <HiViewGrid /> : <HiOutlineViewGrid />}
                  <span>Project</span>
                </>
              )}
            </NavLink>
          </div>
        </nav>

        <main className="tv-main-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.1, ease: 'easeOut' }}
            >
              {outletElement && React.cloneElement(outletElement, { key: location.pathname })}
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </>
  );
}
