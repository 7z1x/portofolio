// src/pages/About.jsx
import { useState, useEffect } from 'react';
import './About.css';
import profilePic from '../assets/profile.jpg';
import Galaxy from '../components/Galaxy/Galaxy';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import Carousel from '../components/Carousel/Carousel';

const About = () => {
  const [carouselWidth, setCarouselWidth] = useState(600);
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 900) {
        const newWidth = Math.min(screenWidth - 60, 600);
        setCarouselWidth(newWidth > 300 ? newWidth : 300);
      } else {
        setCarouselWidth(600);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const experienceItems = [
    {
      id: 1,
      title: 'Mobile Development',
      description: 'Bangkit Academy 2023 Batch 2',
      // Nanti ganti link ini dengan import gambar lokalmu, misal: certBangkit
      certificateImage: 'src/assets/bangkit.jpg',
      detailsText: 'Mengikuti program Bangkit Academy Mobile Development (Android) dengan fokus pada pengembangan aplikasi berbasis Kotlin menggunakan komponen Android modern. Materi mencakup fundamental Kotlin, arsitektur MVVM, konsumsi API dengan Retrofit, pengelolaan data lokal menggunakan Room, penggunaan Coroutines untuk proses asynchronous, serta penerapan Material Design dalam membangun antarmuka. Program ini juga memperkuat kemampuan debugging, unit testing, dan pengembangan aplikasi secara end-to-end sesuai standar industri.',
      techStack: [
        <img src="https://img.shields.io/badge/kotlin-%237F52FF.svg?style=for-the-badge&logo=kotlin&logoColor=white" alt="Kotlin" />,
      ]
    },
    {
      id: 2,
      title: 'Java Fundamental and Programming',
      description: 'Digitalent Kominfo 2024',
      certificateImage: 'src/assets/digitalent.jpg',
      detailsText: 'Mempelajari dasar-dasar pemrograman Java, OOP (Object Oriented Programming), struktur data, dan algoritma dasar untuk pengembangan aplikasi yang efisien dan scalable.',
      techStack: [
        <img src="https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java" />
      ]
    },
    {
      id: 3,
      title: 'AI Engineer',
      description: 'Laskar AI 2025',
      certificateImage: 'src/assets/laskar.jpg',
      detailsText: 'Mengembangkan model Machine Learning untuk mendeteksi objek, melakukan preprocessing data dalam skala besar, dan mengimplementasikan model tersebut ke dalam aplikasi nyata.',
      techStack: [
        <img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54" alt="Python" />,
      ]
    },
  ];

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
        <a href="https://github.com/7z1x" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
        <a href="https://www.linkedin.com/in/zulfahmi-m-ardianto/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
        <a href="https://www.instagram.com/llzf4_/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
      </div>

      <div className="about-content-grid">
        <div className="about-top-left">
          <div className="profile-header-group">
            <img src={profilePic} alt="Profile" className="profile-avatar-new" />
            <div className="profile-text-group">
              <h3 className="profile-name-new">Zulfahmi M Ardianto</h3>
              <p className="profile-role-new">Software Engineer</p>
            </div>
          </div>
          <p className="contact-me-new">Contact me</p>
          <a href="mailto:zulfahmi.office@gmail.com" className="contact-email-new">
            zulfahmi.office@gmail.com
          </a>

          <p className="tech-stack-label">Languages and Tools:</p>

          <div className="tech-stack-container">
            {/* --- Languages & Web --- */}
            <img src="https://img.shields.io/badge/kotlin-%237F52FF.svg?style=for-the-badge&logo=kotlin&logoColor=white" alt="Kotlin" />
            <img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54" alt="Python" />
            <img src="https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java" />


            {/* --- Mobile & Tools --- */}
            <img src="https://img.shields.io/badge/Jetpack%20Compose-4285F4?style=for-the-badge&logo=jetpackcompose&logoColor=white" alt="Jetpack Compose" />
            <img src="https://img.shields.io/badge/Android%20Studio-3DDC84?style=for-the-badge&logo=android-studio&logoColor=white" alt="Android Studio" />
            <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />

            {/* --- AI / Machine Learning --- */}
            <img src="https://img.shields.io/badge/PyTorch-%23EE4C2C.svg?style=for-the-badge&logo=PyTorch&logoColor=white" alt="PyTorch" />
            <img src="https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white" alt="Scikit-learn" />
            <img src="https://img.shields.io/badge/Keras-%23D00000.svg?style=for-the-badge&logo=Keras&logoColor=white" alt="Keras" />
          </div>
        </div>

        <div className="about-top-right">
          <h2>Experience</h2>

          <div className="experience-carousel-wrapper">
            <Carousel
              items={experienceItems}
              baseWidth={carouselWidth}
              autoplay={true}
              autoplayDelay={5000}
              pauseOnHover={true}
              loop={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;