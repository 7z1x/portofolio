import './MainLayout.css';
import { Outlet } from 'react-router-dom';
import Galaxy from '../components/Galaxy/Galaxy'; 
import StaggeredMenu from '../components/StaggeredMenu/StaggeredMenu'; 
import ShinyText from '../components/ShinyText/ShinyText'; 

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'Experience', ariaLabel: 'brick by brick', link: '/experience' },
  { label: 'Project', ariaLabel: 'View my project', link: '/project' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
];

const socialItems = [
  { label: 'GitHub', link: 'https://github.com/7z1x' },
  { label: 'Instagram', link: 'https://www.instagram.com/llzf4_/' },
  { label: 'LinkedIn', link: 'https://www.linkedin.com/in/zulfahmi-m-ardianto/' }
];

function App() {
  return (
    <>
      <StaggeredMenu
        isFixed={true} 
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#fff"
        openMenuButtonColor="#000" 
        changeMenuColorOnOpen={true}
        colors={['#B19EEF', '#5227FF']}
        logoUrl="" 
        accentColor="#1bbdf8"
      />

      <div className="wrapper">
        <main className="content">
          <Outlet />
        </main>

        <footer className="footer">
          <ShinyText text="©2025|Zfma" speed={3} />
        </footer>
      </div>
    </>
  );
}

export default App;
