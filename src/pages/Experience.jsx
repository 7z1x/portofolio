import { useEffect } from "react";
import "./Experience.css";
import project1 from "../assets/project1.png"; // pastikan nama & path ini benar

export default function Experience() {
  useEffect(() => {
    const cards = document.querySelectorAll(".project-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show");
        });
      },
      { threshold: 0.2 }
    );
    cards.forEach((card) => observer.observe(card));
  }, []);

  const projects = [
    {
      title: "Aerolink",
      desc: "Mobile app that helps users discover, book, and manage flights with real-time updates and seamless UX.",
      category: "UX & UI Design",
      img: project1,
      link: "https://aerolink-demo.com",
    },
  ];

  return (
    <main className="experience-page">
      {/* ===== HEADER ===== */}
      <section className="experience-header">
        <div className="header-left">
          <p className="year">(2016–25©)</p>
          <h1 className="title">Projects</h1>
        </div>
        <div className="header-right">
          <div className="dot" />
          <p>
            From motion branding to title sequences, to dynamic 3D and crafted
            2D animation, this selection reflects my broad range of projects.
          </p>
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section className="projects-section">
        {projects.map((p, i) => (
          <a
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card"
            key={i}
          >
            <div
              className="project-image"
              style={{ backgroundImage: `url(${p.img})` }}
            >
              <div className="overlay">
                <span className="view">VIEW</span>
                <h3>{p.title}</h3>
              </div>
            </div>
            <div className="project-info">
              <p className="desc">{p.desc}</p>
              <div className="divider" />
              <p className="category">{p.category}</p>
            </div>
          </a>
        ))}
      </section>
    </main>
  );
}
