import { useState, lazy, Suspense } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { SiKotlin, SiPython, SiJavascript, SiDocker, SiFirebase, SiGit, SiReact, SiFlutter, SiPytorch, SiTensorflow, SiJetpackcompose, SiFigma, SiPostgresql, SiFastapi } from 'react-icons/si';
import CircularText from '../components/CircularText/CircularText';
import PillNav from '../components/PillNav/PillNav';
import DecryptedText from '../components/DecryptedText/DecryptedText';
import profileImg from '../assets/profile.jpg';
const FaultyTerminal = lazy(() => import('../components/FaultyTerminal/FaultyTerminal'));
const GlassSurface = lazy(() => import('../components/GlassSurface/GlassSurface'));
const LogoLoop = lazy(() => import('../components/LogoLoop/LogoLoop'));
const ExperienceSection = lazy(() => import('../components/ExperienceSection/ExperienceSection'));
const LazyResumeModal = lazy(() => import('../components/ResumeModal/ResumeModal'));
import './About.css';

const techLogos = [
  { node: <SiKotlin />, title: 'Kotlin' },
  { node: <SiPython />, title: 'Python' },
  { node: <SiJavascript />, title: 'JavaScript' },
  { node: <SiReact />, title: 'React' },
  { node: <SiJetpackcompose />, title: 'Jetpack Compose' },
  { node: <SiPytorch />, title: 'PyTorch' },
  { node: <SiTensorflow />, title: 'TensorFlow' },
  { node: <SiDocker />, title: 'Docker' },
  { node: <SiFirebase />, title: 'Firebase' },
  { node: <SiPostgresql />, title: 'PostgreSQL' },
  { node: <SiFastapi />, title: 'FastAPI' },
  { node: <SiGit />, title: 'Git' },
  { node: <SiFigma />, title: 'Figma' },
];

export default function About() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="about-movie-container">
      <Suspense fallback={null}>
        <LazyResumeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </Suspense>

      <Suspense fallback={<div style={{ minHeight: '100vh', background: '#000' }} />}>
        {/* First Screen: Terminal BG + Hero */}
        <div className="hero-viewport">
          <div className="terminal-bg">
            <FaultyTerminal
              scale={1.5}
              gridMul={[2, 1]}
              digitSize={1.2}
              timeScale={0.5}
              pause={isModalOpen}
              scanlineIntensity={0.5}
              glitchAmount={1}
              flickerAmount={1}
              noiseAmp={1}
              chromaticAberration={0}
              dither={0}
              curvature={0.1}
              tint="#A7EF9E"
              mouseReact
              mouseStrength={0.5}
              pageLoadAnimation
              brightness={0.6}
            />
          </div>

          <div className="about-hero-section">
            {/* Left Column: Photo & Badge */}
            <div className="hero-photo-container">
              <div
                className="hero-photo-placeholder"
                style={{
                  backgroundImage: `url(${profileImg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
              </div>
              <div className="circular-badge">
                <CircularText
                  text="LETS*TALK*LETS*TALK*"
                  onHover="speedUp"
                  spinDuration={20}
                />
                <div className="circular-arrow">
                  <FaArrowRight />
                </div>
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="hero-text-container">
              <GlassSurface
                width="100%"
                height="auto"
                borderRadius={24}
                displace={0.3}
                distortionScale={-120}
                redOffset={0}
                greenOffset={8}
                blueOffset={16}
                brightness={35}
                opacity={0.85}
                blur={8}
                backgroundOpacity={0.15}
                mixBlendMode="screen"
                className="hero-glass-bg"
              >
                <div className="hero-glass-content">
                  <h1 className="hero-title">
                    <span className="hero-title-highlight">
                      <DecryptedText text="Zulfahmi is a" animateOn="view" speed={60} sequential={true} />
                    </span>
                    <span className="hero-title-highlight" style={{ animationDelay: '0.3s' }}>
                      <DecryptedText text="A Creative Developer" animateOn="view" speed={60} sequential={true} />
                    </span>
                    <span className="hero-title-highlight" style={{ animationDelay: '0.6s' }}>
                      <DecryptedText text="& A Curious Thinker." animateOn="view" speed={60} sequential={true} />
                    </span>
                  </h1>
                </div>
              </GlassSurface>
              <div className="hero-actions-row">
                <PillNav
                  className="resume-pill-nav"
                  items={[
                    { label: 'My Resume', href: '#', onClick: () => setIsModalOpen(true) }
                  ]}
                  hoveredPillTextColor="#000000"
                  pillTextColor="#ffffffff"
                  initialLoadAnimation={false}
                />
                <div className="hero-socials">
                  <a href="https://instagram.com/llzf4_" target="_blank" rel="noreferrer" className="social-icon social-ig" aria-label="Instagram">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" /></svg>
                  </a>
                  <a href="https://github.com/7z1x" target="_blank" rel="noreferrer" className="social-icon social-gh" aria-label="GitHub">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/in/zulfahmi-m-ardianto/" target="_blank" rel="noreferrer" className="social-icon social-li" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Gradient fade at bottom of hero */}
          <div className="hero-bottom-fade"></div>
        </div>

        {/* Tech Stack Marquee Section */}
        <div className="tech-stack-section">
          <div className="tech-stack-loop">
            <LogoLoop
              logos={techLogos}
              speed={80}
              direction="left"
              logoHeight={40}
              gap={60}
              pauseOnHover={false}
              scaleOnHover
              fadeOut
              fadeOutColor="#000"
              ariaLabel="Technology stack"
            />
          </div>
        </div>

        {/* Experience Section */}
        <ExperienceSection />
      </Suspense>

    </div>
  );
}
