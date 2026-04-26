import React, { useState } from 'react';
import ShinyText from '../ShinyText/ShinyText';
import SplitText from '../SplitText/SplitText';

const experiences = [
  {
    icon: 'W',
    color: '#1a73e8',
    role: 'AI Engineer',
    company: '@Wesclic Technology',
    date: 'Nov 2025 — Present',
    type: 'Magang',
    duration: 'Nov 2025 - Saat ini · 6 bln',
    location: 'Yogyakarta, Indonesia · Di lokasi',
    bullets: [
      'Membangun pipeline Retrieval-Augmented Generation (RAG) untuk sistem chatbot internal perusahaan.',
      'Mengembangkan AI Agent yang mampu mengeksekusi tugas-tugas otomatis berdasarkan instruksi natural language.',
      'Mengoptimalkan model LLM untuk domain-specific use case dengan fine-tuning dan prompt engineering.',
    ],
    skills: ['RAG', 'AI Agents', 'LLM', 'Prompt Engineering', 'Python'],
  },
  {
    icon: 'L',
    color: '#8B5CF6',
    role: 'AI Engineer Cohort',
    company: '@Laskar AI',
    date: 'Feb 2025 — Jul 2025',
    type: 'Purnawaktu',
    duration: 'Feb 2025 - Jul 2025 · 6 bln',
    location: 'Yogyakarta, Indonesia · Jarak jauh',
    bullets: [
      'Mengikuti program intensif pelatihan AI Engineer dengan fokus pada Machine Learning dan Deep Learning.',
      'Menyelesaikan capstone project berbasis computer vision dan NLP.',
      'Berkolaborasi dengan tim dalam project management menggunakan metodologi Agile.',
    ],
    skills: ['Machine Learning', 'Project Management', 'Deep Learning', 'NLP', 'Computer Vision'],
  },
  {
    icon: 'D',
    color: '#0ea5e9',
    role: 'Java Fundamentals & Programming',
    company: '@Digital Talent Scholarship',
    date: 'Feb 2024 — Jun 2024',
    type: 'Purnawaktu',
    duration: 'Feb 2024 - Jun 2024 · 5 bln',
    location: 'Yogyakarta, Indonesia · Jarak jauh',
    bullets: [
      'Menguasai fundamental pemrograman Java termasuk OOP, Collections, dan Exception Handling.',
      'Membangun aplikasi berbasis Java dengan menerapkan design patterns dan best practices.',
    ],
    skills: ['Java', 'Java Fundamental'],
  },
  {
    icon: 'B',
    color: '#34d399',
    role: 'Mobile Development Cohort',
    company: '@Bangkit led by Google, Goto, and Traveloka',
    date: 'Aug 2023 — Jan 2024',
    type: 'Purnawaktu',
    duration: 'Agu 2023 - Jan 2024 · 6 bln',
    location: 'Yogyakarta, Indonesia · Jarak jauh',
    bullets: [
      'Menyelesaikan kurikulum Android Development intensif yang disponsori Google.',
      'Membangun aplikasi Android menggunakan Kotlin dan Jetpack Compose sebagai capstone project.',
      'Menerapkan prinsip UI/UX design untuk menciptakan pengalaman pengguna yang intuitif.',
      'Berkolaborasi dengan tim Machine Learning dan Cloud Computing dalam proyek akhir.',
    ],
    skills: ['Android Dev', 'UIUX', 'Kotlin', 'Jetpack Compose', 'Firebase', 'TensorFlow Lite'],
  },
];

const ExperienceSection = React.memo(() => {
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
            key={i}
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
            </div>

            {expandedExp === i && (
              <div className="exp-expanded">
                <p className="exp-meta">{exp.type} · {exp.duration}</p>
                <p className="exp-location">{exp.location}</p>
                <ul className="exp-bullets">
                  {exp.bullets.map((bullet, j) => (
                    <li key={j}>{bullet}</li>
                  ))}
                </ul>
                <div className="exp-skills">
                  {exp.skills.map((skill, j) => (
                    <span key={j}>{skill}</span>
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
