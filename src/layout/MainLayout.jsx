import { useLocation, useOutlet, NavLink } from 'react-router-dom';
import { GoHome, GoHomeFill } from 'react-icons/go';
import { HiOutlineViewGrid, HiViewGrid } from 'react-icons/hi';
import React, { useState, useEffect, useRef } from 'react';
import PillNav from '../components/PillNav/PillNav';
import Footer from '../components/Footer/Footer';
import { motion, AnimatePresence } from 'motion/react';
import './MainLayout.css';

export default function MainLayout() {
  const location = useLocation();
  const outletElement = useOutlet();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Project', href: '/project' }
  ];


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
