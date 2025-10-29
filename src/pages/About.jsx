import GlareHover from '../components/Glare_Hover/Glare_Hover';
import './About.css';
import profilePic from '../assets/profile.jpg';
import CurvedLoop from '../components/Curved_Loop/CurvedLoop';

const About = () => {
  return (
    <section className="about-section">
      <div className="about-card">
        {/* ===== TOP CONTENT ===== */}
        <div className="about-top">
          {/* LEFT SIDE */}
          <div className="about-left">
            <GlareHover
              glareColor="#ffffff"
              glareOpacity={0.25}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
              width="240px"
              height="260px"
              background="rgba(20,20,20,0.6)"
              borderColor="rgba(255,255,255,0.05)"
            >
              <img src={profilePic} alt="Profile" className="profile-img" />
            </GlareHover>
          </div>

          {/* RIGHT SIDE */}
          <div className="about-right">
            <h1 className="about-name">Zulfahmi M Ardianto</h1>
            <p className="about-role">
              is a <strong>digital product designer</strong> and <strong>photographer</strong>{' '}
              from <strong>Indonesia</strong> working with startups and founders.
            </p>

            <div className="social-icons">
              <a href="https://x.com" aria-label="Twitter">✕</a>
              <a href="https://instagram.com/llzf4_" aria-label="Instagram">📸</a>
              <a href="https://tiktok.com" aria-label="TikTok">🎵</a>
            </div>

            <CurvedLoop
              marqueeText="Photography ✦ Art Direction ✦ Web Design"
              speed={80}
              fontSize="1.8rem"
              color="#ffffff"
              letterSpacing="2px"
            />
          </div>
        </div>

        {/* ===== BOTTOM CONTENT (2 COLUMN GRID) ===== */}
        <div className="about-bottom">
          <p className="about-description">
            Based in Indonesia, Zulfahmi has spent the past six years helping early-stage startups
            bring their ideas to life through design and creative direction.
          </p>

          <div className="about-stats">
            <div className="stat-item">
              <span className="stat-number">6+</span>
              <span className="stat-label">Years of Experience</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">30+</span>
              <span className="stat-label">Projects Shipped</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">20+</span>
              <span className="stat-label">Happy Clients</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
