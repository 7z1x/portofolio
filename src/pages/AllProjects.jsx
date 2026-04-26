import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import ShinyText from '../components/ShinyText/ShinyText';
import SplitText from '../components/SplitText/SplitText';
import { PROJECT_DATA } from '../data/projects';
import './AllProjects.css';

const FILTERS = ['All', 'Development', 'Design'];

export default function AllProjects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = PROJECT_DATA.filter(p => {
    const matchFilter = activeFilter === 'All' || p.category.includes(activeFilter);
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="projects-page">
      {/* Header */}
      <div className="projects-hero">
        <span className="projects-badge">
          <ShinyText text="✦ MY WORK" speed={3} className="shiny-green" />
        </span>
        <h1 className="projects-heading">
          <SplitText text="Creating next level digital" delay={0.3} />
        </h1>
      </div>

      {/* Toolbar */}
      <div className="projects-toolbar">
        <div className="projects-search">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="projects-filters">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`filter-btn ${activeFilter === f ? 'filter-btn--active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="projects-grid">
        {filtered.map((p) => (
          <Link to={`/project/${p.id}`} key={p.id} className="project-card-link">
            <div className="project-card">
              <div className="project-card-image" style={{ background: p.bgColor }}>
                <img src={p.coverImage} alt={p.name} />
              </div>
              <div className="project-card-info">
                <h3 className="project-card-name">{p.name}</h3>
                <div className="project-card-meta">
                  <div className="project-card-tags">
                    {p.category.map(c => (
                      <span key={c} className="project-tag">{c}</span>
                    ))}
                  </div>
                  <span className="project-year">{p.year}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
