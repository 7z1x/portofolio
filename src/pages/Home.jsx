import Galaxy from '../components/Galaxy/Galaxy';
import './Home.css';
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import ShuffleUpText from '../components/ShuffleUpText/ShuffleUpText';
import GlassSurface from '../components/Glass_Surface/GlassSurface';

const changingWords = [
  'Hello',
  'Hola',
  'Konnichiwa',
  'Nǐ hǎo',
  'Bonjour'
];
export default function Home() {
  return (
    <div className="home-page-container">
      <Galaxy 
        mouseRepulsion={true}
        mouseInteraction={true}
        density={1}
        glowIntensity={0.4}
        hueShift={240}
      />
      <div className="social-icons">
        <a href="https://github.com/7z1x" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
        <a href="https://www.linkedin.com/in/zulfahmi-m-ardianto" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
        <a href="https://instagram.com/llzf4_" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
      </div>

      <div className="main-text">
                
      <div className="home-second-line">
          <h2 className="highlight-static"></h2> 
          <ShuffleUpText
            words={changingWords}
            duration={2500} 
          />
        </div>
        
        <div className="glass-wrapper">
          <GlassSurface
            className="welcome-glass"
            isplace={15}
            distortionScale={-150}
            redOffset={5}
            greenOffset={15}
            blueOffset={25}
            brightness={60}
            opacity={1}
            mixBlendMode="screen"
          >
            <h1 className="welcome-text">Welcome to My Portofolio</h1>
          </GlassSurface>
        </div>
      </div>
    </div>
  );
}
