import Galaxy from '../components/Galaxy/Galaxy';
import './Home.css';
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import ShuffleUpText from '../components/ShuffleUpText/ShuffleUpText';

const changingWords = [
  'Brands',
  'People',
  'Startups',
  'You'
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
        <a href="https://github.com/username" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
        <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
        <a href="https://instagram.com/username" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
      </div>

      <div className="main-text">
        <h1>Designing</h1>
        
        <div className="home-second-line">

          <h2 className="highlight-static">for </h2> 
          <ShuffleUpText
            words={changingWords}
            duration={2500} 
          />
        </div>

      </div>
    </div>
  );
}
