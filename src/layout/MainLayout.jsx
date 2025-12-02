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
  return (
    <>
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

      <div className="wrapper">
        <main className="content">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
