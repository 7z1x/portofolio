import './App.css';
import Galaxy from './homepage/background/Galaxy'; 
import ShinyText from './homepage/tag/ShinyText';
import StaggeredMenu from './homepage/menu/StaggeredMenu'; 
import TextType from './homepage/texttype/TextType';

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
        accentColor="#4E61D3"
        onMenuOpen={() => console.log('Menu opened')}
        onMenuClose={() => console.log('Menu closed')}
      />
      <main className="app-container">       
        <div className="galaxy-background-wrapper">
          <Galaxy 
            mouseRepulsion={true}
            mouseInteraction={true}
            density={1}
            glowIntensity={0.4}
            hueShift={240}
          />
        </div>
        <div className="top-left-text-wrapper">
          <TextType 
            text={["I’m Zulfahmi M. Ardianto", "a dreamer", "a coder", "and a litle bit handsome.",
              "Welcome to my portfolio", "let’s build something amazing together!"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            loop={false}
          />
        </div>
        <div className="content"></div>
        <footer className="footer">
          <ShinyText 
            text="©2025|Zfma" 
            speed={3} 
          />
        </footer>
      </main>
    </>
  )
}

export default App