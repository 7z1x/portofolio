// src/pages/Home.jsx
import Galaxy from '../components/Galaxy/Galaxy';
import TextType from '../components/TextType/TextType';
import './Home.css'; // CSS khusus untuk Halaman Home

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
    </div>
  );
}
