// src/pages/About.jsx
import './About.css';
import profilePic from '../assets/profile.jpg'; 
import Galaxy from '../components/Galaxy/Galaxy'; 
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const About = () => {
  return (
    <div className="about-container-new">
      <Galaxy
        mouseRepulsion={false}
        mouseInteraction={false}
        density={1}
        glowIntensity={0.4}
        hueShift={240}
        className="about-galaxy-bg" 
      />
      <div className="social-sidebar-new">
        <a href="https://github.com/7z1x" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/zulfahmi-m-ardianto/"
          target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a href="https://www.instagram.com/llzf4_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FaInstagram />
        </a>
      </div>

      <div className="about-content-grid">
        <div className="about-top-left">
          <div className="profile-header-group">
            <img
              src={profilePic}
              alt="Profile"
              className="profile-avatar-new"
            />
            <div className="profile-text-group">
              <h3 className="profile-name-new">Zulfahmi M Ardianto</h3>
              <p className="profile-role-new">Digital Product Designer</p>
            </div>
          </div>
          <p className="contact-me-new">Contact me</p>
          <a href="mailto:zulfahmi@example.com" className="contact-email-new">
            zulfahmi@example.com
          </a>
        </div>
        {/* KANAN ATAS: HEADLINE */}
        <div className="about-top-right">
          <h1>
            Get in touch and let's turn concepts into stunning websites
          </h1>
          <p>Transforming ideas into reality</p>
        </div>

        {/* BAWAH: TULISAN BESAR */}
        <div className="about-bottom-text">Let's talk</div>
      </div>
    </div>
  );
};

export default About;