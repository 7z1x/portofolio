import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { FaHome, FaChevronRight, FaGithub, FaTwitter, FaLinkedin, FaEnvelope, FaShareAlt, FaExternalLinkAlt } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import useGitHubRepos from '../hooks/useGitHubRepos';
import { fetchReadme, fetchLanguages } from '../services/github';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { id } = useParams();
  const { projects, loading: reposLoading } = useGitHubRepos();
  const project = projects.find(p => p.id === id);

  const [activeSection, setActiveSection] = useState('overview');
  const [readme, setReadme] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(true);

  const overviewRef = useRef(null);
  const designRef = useRef(null);
  const techRef = useRef(null);
  const featuresRef = useRef(null);
  const readmeRef = useRef(null);

  useEffect(() => {
    if (!project) return;

    let cancelled = false;

    async function loadDetails() {
      const [readmeData, langData] = await Promise.all([
        fetchReadme(id),
        fetchLanguages(id),
      ]);

      if (!cancelled) {
        setReadme(readmeData);
        setLanguages(langData);
        setLoadingDetail(false);
      }
    }

    loadDetails();
    return () => { cancelled = true; };
  }, [project, id]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'overview', ref: overviewRef },
        { id: 'design-screens', ref: designRef },
        { id: 'tech-stack', ref: techRef },
        { id: 'features', ref: featuresRef },
        { id: 'readme', ref: readmeRef },
      ];

      for (const section of sections.reverse()) {
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (reposLoading) {
    return (
      <div className="pd-page">
        <div className="pd-loading">
          <div className="pd-loading-spinner" />
          <p>Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pd-not-found">
        <h2>Project not found</h2>
        <Link to="/project">← Back to Projects</Link>
      </div>
    );
  }

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const currentIndex = projects.findIndex(p => p.id === id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const techStack = project.techStack && project.techStack.length > 1
    ? project.techStack
    : languages
      ? Object.keys(languages)
      : project.techStack || [];

  const totalBytes = languages ? Object.values(languages).reduce((a, b) => a + b, 0) : 0;

  return (
    <div className="pd-page">
      <div className="pd-breadcrumb">
        <div className="pd-breadcrumb-left">
          <Link to="/"><FaHome /></Link>
          <FaChevronRight className="pd-breadcrumb-sep" />
          <Link to="/project">Projects</Link>
          <FaChevronRight className="pd-breadcrumb-sep" />
          <span>{project.name}</span>
        </div>
        <span className="pd-year-badge">{project.year}</span>
      </div>

      <div className="pd-hero" style={{ background: project.bgColor }}>
        {project.coverImage ? (
          <img src={project.coverImage} alt={project.name} />
        ) : (
          <div className="pd-hero-placeholder">
            <FaGithub className="pd-hero-icon" />
            <h2>{project.name}</h2>
          </div>
        )}
      </div>

      <div className="pd-info">
        <div className="pd-info-left">
          <h1 className="pd-title">{project.name}</h1>
          <p className="pd-description">{project.description}</p>
          <div className="pd-tags">
            {techStack.slice(0, 3).map(t => (
              <span key={t} className="pd-tag">{t}</span>
            ))}
            {techStack.length > 3 && (
              <span className="pd-tag pd-tag--more">+{techStack.length - 3}</span>
            )}
          </div>
        </div>
        <div className="pd-info-right">
          <div className="pd-action-buttons">
            <a href={project.github} target="_blank" rel="noreferrer" className="pd-checkout-btn">
              <FaGithub /> View Source
            </a>
            {project.homepage && (
              <a href={project.homepage} target="_blank" rel="noreferrer" className="pd-checkout-btn pd-checkout-btn--live">
                <FaExternalLinkAlt /> Live Demo
              </a>
            )}
          </div>
          <div className="pd-meta">
            <div className="pd-meta-row">
              <span className="pd-meta-label">Roles:</span>
              <span className="pd-meta-value">{project.roles}</span>
            </div>
            <div className="pd-meta-row">
              <span className="pd-meta-label">Client:</span>
              <span className="pd-meta-value">{project.client}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pd-content-wrapper">
        <div className="pd-content">
          <section ref={overviewRef} id="overview" className="pd-section">
            <h2 className="pd-section-title">Overview</h2>
            <p className="pd-section-text">
              {project.overview || project.description}
            </p>
          </section>

          {project.designScreens && project.designScreens.length > 0 && (
            <section ref={designRef} id="design-screens" className="pd-section">
              <h2 className="pd-section-title">Design Screens</h2>
              <div className="pd-screens-grid">
                {project.designScreens.map((screen, i) => (
                  <div key={i} className="pd-screen-item">
                    <img src={screen.src} alt={screen.label} />
                    <span className="pd-screen-label">{screen.label}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section ref={techRef} id="tech-stack" className="pd-section">
            <h2 className="pd-section-title">Tech Stack</h2>
            <ul className="pd-tech-list">
              {techStack.map(t => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>

          {project.features && project.features.length > 0 && (
            <section ref={featuresRef} id="features" className="pd-section">
              <h2 className="pd-section-title">Features</h2>
              <ul className="pd-features-list">
                {project.features.map((f, i) => (
                  <li key={i}>
                    <strong>{f.title}:</strong> {f.desc}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {readme && (
            <section ref={readmeRef} id="readme" className="pd-section">
              <h2 className="pd-section-title">📄 README</h2>
              <div className="pd-readme">
                <div className="pd-readme-content">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                  >
                    {readme}
                  </ReactMarkdown>
                </div>
              </div>
            </section>
          )}
        </div>

        <aside className="pd-sidebar">
          <div className="pd-sidebar-nav">
            <h4 className="pd-sidebar-heading">≡ On this page</h4>
            <button
              className={`pd-nav-link ${activeSection === 'overview' ? 'pd-nav-link--active' : ''}`}
              onClick={() => scrollTo(overviewRef)}
            >
              Overview
            </button>
            {project.designScreens?.length > 0 && (
              <button
                className={`pd-nav-link ${activeSection === 'design-screens' ? 'pd-nav-link--active' : ''}`}
                onClick={() => scrollTo(designRef)}
              >
                Design Screens
              </button>
            )}
            <button
              className={`pd-nav-link ${activeSection === 'tech-stack' ? 'pd-nav-link--active' : ''}`}
              onClick={() => scrollTo(techRef)}
            >
              Tech Stack
            </button>
            {project.features?.length > 0 && (
              <button
                className={`pd-nav-link ${activeSection === 'features' ? 'pd-nav-link--active' : ''}`}
                onClick={() => scrollTo(featuresRef)}
              >
                Features
              </button>
            )}
            {readme && (
              <button
                className={`pd-nav-link ${activeSection === 'readme' ? 'pd-nav-link--active' : ''}`}
                onClick={() => scrollTo(readmeRef)}
              >
                README
              </button>
            )}
          </div>

          <div className="pd-share">
            <h4 className="pd-share-heading">Share this project</h4>
            <div className="pd-share-icons">
              <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer"><FaTwitter /></a>
              <a href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer"><FaLinkedin /></a>
              <a href={`mailto:?subject=${project.name}&body=${window.location.href}`}><FaEnvelope /></a>
              <button onClick={() => navigator.clipboard.writeText(window.location.href)}><FaShareAlt /></button>
            </div>
          </div>
        </aside>
      </div>

      <div className="pd-share-mobile">
        <h4 className="pd-share-heading">Share this project</h4>
        <div className="pd-share-icons">
          <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer"><FaTwitter /></a>
          <a href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer"><FaLinkedin /></a>
          <a href={`mailto:?subject=${project.name}&body=${window.location.href}`}><FaEnvelope /></a>
          <button onClick={() => navigator.clipboard.writeText(window.location.href)}><FaShareAlt /></button>
        </div>
      </div>

      {nextProject && (
        <Link to={`/project/${nextProject.id}`} className="pd-next">
          <div className="pd-next-inner">
            <span className="pd-next-label">Next Page ›</span>
            <span className="pd-next-name">{nextProject.name}</span>
          </div>
        </Link>
      )}
    </div>
  );
}
