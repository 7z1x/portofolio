// src/pages/Home.jsx
import Galaxy from '../components/Galaxy/Galaxy';
import './Home.css';
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

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

      {/* Ikon sosial vertikal di sisi kiri */}
      <div className="social-icons">
        <a href="https://github.com/username" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
        <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
        <a href="https://instagram.com/username" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
      </div>

      {/* Teks utama besar */}
      <div className="main-text">
        <h1>Designing</h1>
        <h1 className="highlight">for Brands</h1>
      </div>
    </div>
  );
}
