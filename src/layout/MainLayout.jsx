import { useState, useEffect } from 'react';
import './MainLayout.css';
import { Outlet } from 'react-router-dom';
import StaggeredMenu from '../components/StaggeredMenu/StaggeredMenu';
import logo from '../assets/logo.png';


const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'Project', ariaLabel: 'brick by brick', link: '/experience' },
  //{ label: 'Project', ariaLabel: 'View my project', link: '/project' },
  { label: 'About', ariaLabel: 'Get in touch', link: '/about' }
];

function App() {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide header when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <StaggeredMenu
        className={isHidden ? 'menu-hidden' : ''}
        isFixed={true}
        position="right"
        items={menuItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#fff"
        openMenuButtonColor="#000"
        changeMenuColorOnOpen={true}
        colors={['#B19EEF', '#5227FF']}
        logoUrl=""
        accentColor="#1bbdf8"
      />

      <div className={`header-container ${isHidden ? 'header-hidden' : ''}`}>
        <div className="top-left-text-wrapper">
          <img src={logo} alt="Logo" className="site-logo" />
        </div>
      </div>

      <div className="wrapper">
        <main className="content">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
