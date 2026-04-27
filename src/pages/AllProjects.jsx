import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaGithub, FaStar, FaCodeBranch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ShinyText from '../components/ShinyText/ShinyText';
import SplitText from '../components/SplitText/SplitText';
import useGitHubRepos from '../hooks/useGitHubRepos';
import './AllProjects.css';

const FILTERS = ['All', 'AI Engineer', 'Mobile Development', 'Machine Learning', 'Others'];
const ITEMS_PER_PAGE = 6;

// Language color mapping (GitHub-style)
const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Kotlin: '#A97BFF',
  Java: '#b07219',
  'C#': '#178600',
  GDScript: '#355570',
  'Jupyter Notebook': '#DA5B0B',
  Processing: '#0096D8',
  HTML: '#e34c26',
  CSS: '#563d7c',
};

export default function AllProjects() {
  const { projects, loading, error } = useGitHubRepos();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when filter/search changes
  const handleFilterChange = (f) => {
    setActiveFilter(f);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Filter projects
  const filtered = useMemo(() => {
    return projects.filter(p => {
      const matchFilter = activeFilter === 'All' || p.category.includes(activeFilter);
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [projects, activeFilter, searchQuery]);

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first page
      pages.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        end = Math.min(4, totalPages - 1);
      }
      if (currentPage >= totalPages - 2) {
        start = Math.max(totalPages - 3, 2);
      }

      if (start > 2) pages.push('...');
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push('...');

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    // Scroll to top of grid
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

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
        <p className="projects-subtitle">
          Fetched live from GitHub · Always up-to-date
        </p>
      </div>

      {/* Toolbar */}
      <div className="projects-toolbar">
        <div className="projects-search">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="projects-filters">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`filter-btn ${activeFilter === f ? 'filter-btn--active' : ''}`}
              onClick={() => handleFilterChange(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="projects-grid">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="project-card-link">
              <div className="project-card project-card--skeleton">
                <div className="project-card-image skeleton-image" />
                <div className="project-card-info">
                  <div className="skeleton-line skeleton-title" />
                  <div className="skeleton-line skeleton-meta" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="projects-error">
          <p>⚠ Failed to load projects from GitHub</p>
          <span>{error}</span>
        </div>
      )}

      {/* Grid */}
      {!loading && !error && (
        <>
          {/* Project count */}
          <div className="projects-count">
            Showing {startIdx + 1}–{Math.min(startIdx + ITEMS_PER_PAGE, filtered.length)} of {filtered.length} projects
          </div>

          <div className="projects-grid">
            {paginatedProjects.map((p) => (
              <Link to={`/project/${p.id}`} key={p.id} className="project-card-link">
                <div className="project-card">
                  <div className="project-card-image" style={{ background: p.bgColor }}>
                    {p.coverImage ? (
                      <img src={p.coverImage} alt={p.name} />
                    ) : (
                      <div className="project-card-placeholder">
                        <FaGithub className="placeholder-icon" />
                        <span className="placeholder-name">{p.name}</span>
                      </div>
                    )}
                  </div>
                  <div className="project-card-info">
                    <h3 className="project-card-name">{p.name}</h3>
                    <p className="project-card-desc">{p.tagline}</p>
                    <div className="project-card-meta">
                      <div className="project-card-tags">
                        {p.language && (
                          <span className="project-lang">
                            <span
                              className="lang-dot"
                              style={{ background: LANG_COLORS[p.language] || '#ccc' }}
                            />
                            {p.language}
                          </span>
                        )}
                        {p.stars > 0 && (
                          <span className="project-stat">
                            <FaStar /> {p.stars}
                          </span>
                        )}
                        {p.forks > 0 && (
                          <span className="project-stat">
                            <FaCodeBranch /> {p.forks}
                          </span>
                        )}
                      </div>
                      <span className="project-year">{p.year}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn pagination-arrow"
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
              >
                <FaChevronLeft />
              </button>

              {getPageNumbers().map((page, i) =>
                page === '...' ? (
                  <span key={`dots-${i}`} className="pagination-dots">...</span>
                ) : (
                  <button
                    key={page}
                    className={`pagination-btn ${currentPage === page ? 'pagination-btn--active' : ''}`}
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                className="pagination-btn pagination-arrow"
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </>
      )}

      {/* Empty State */}
      {!loading && !error && filtered.length === 0 && (
        <div className="projects-empty">
          <p>No projects found matching "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
}
