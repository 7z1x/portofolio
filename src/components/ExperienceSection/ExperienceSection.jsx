import React, { useState } from 'react';
import ShinyText from '../ShinyText/ShinyText';
import SplitText from '../SplitText/SplitText';
import useExperiences from '../../hooks/useExperiences';

const ExperienceSection = React.memo(() => {
  const experiences = useExperiences();
  const [expandedExp, setExpandedExp] = useState(null);

  return (
    <div className="experience-section">
      <div className="experience-left">
        <span className="experience-badge">
          <ShinyText text="✦ WORK HISTORY" speed={3} className="shiny-green" />
        </span>
        <h2 className="experience-heading">
          <SplitText text="Experience" delay={0.1} />
        </h2>
        <p className="experience-sub">
          <SplitText text="I have worked with some of the most innovative industry leaders to create cutting-edge technology." delay={0.4} animationDuration={0.4} animationStagger={0.005} />
        </p>
      </div>

      <div className="experience-right">
        {experiences.map((exp, i) => (
          <div
            key={exp.id || `${exp.company}-${exp.role}`}
            className={`exp-item ${expandedExp === i ? 'exp-item--expanded' : ''}`}
            onClick={() => setExpandedExp(expandedExp === i ? null : i)}
          >
            <div className="exp-header">
              <div className="exp-icon" style={{ background: exp.color }}>{exp.icon}</div>
              <div className="exp-header-info">
                <h4 className="exp-role">{exp.role}</h4>
                <p className="exp-company">{exp.company}</p>
              </div>
              <span className="exp-date">{exp.date}</span>
              <svg
                className={`exp-chevron ${expandedExp === i ? 'exp-chevron--open' : ''}`}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>

            {expandedExp === i && (
              <div className="exp-expanded">
                <p className="exp-meta">{exp.type} · {exp.duration}</p>
                <p className="exp-location">{exp.location}</p>
                <ul className="exp-bullets">
                  {(exp.bullets || []).map((bullet, j) => (
                    <li key={j}>{bullet}</li>
                  ))}
                </ul>
                <div className="exp-skills">
                  {(exp.skills || []).map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

ExperienceSection.displayName = 'ExperienceSection';

export default ExperienceSection;
