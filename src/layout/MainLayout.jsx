import { useState, useEffect } from 'react'; // Tambahkan ini
import './MainLayout.css';
import { Outlet } from 'react-router-dom';
import StaggeredMenu from '../components/StaggeredMenu/StaggeredMenu';
import logo from '../assets/logo.png';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'Project', ariaLabel: 'brick by brick', link: '/experience' },
  { label: 'About', ariaLabel: 'Get in touch', link: '/about' }
];

function App() {
  // Logic untuk menyembunyikan header saat scroll
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      
      // Header muncul jika scroll ke atas atau berada di paling atas halaman
      const visible = prevScrollPos > currentScrollPos || currentScrollPos < 10;

      setIsVisible(visible);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <>
      {/* Menu Staggered akan ikut tersembunyi dengan class header-hidden */}
      <div className={`nav-wrapper ${!isVisible ? 'header-hidden' : ''}`}>
        <StaggeredMenu
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