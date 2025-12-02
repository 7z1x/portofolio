import { useState } from "react";
import "./Experience.css";
import Galaxy from "../components/Galaxy/Galaxy.jsx";


import {
  FiEye,
  FiChevronLeft,
  FiChevronRight,
  FiLink,
  FiShield, // Placeholder logo
  FiAnchor, // Placeholder logo
  FiDatabase, // Placeholder logo
  FiAward, // Placeholder logo
  FiCpu, // Placeholder logo
  FiCoffee // Placeholder logo
} from "react-icons/fi";

// --- DATA PROYEK BARU ---
// Kita butuh data baru agar sesuai dengan layout (logo + warna bg)
const projectsData = [
  {
    title: "Gulu-gulu",
    logo: <FiCoffee />,
    bgColor: "linear-gradient(145deg, #2E7D32, #4CAF50)",
    link: "https://github.com/7z1x/Gulugulu",
  },
  {
    title: "Fed-Egg Detector",
    logo: <FiCoffee />,
    bgColor: "linear-gradient(145deg, #0D47A1, #2196F3)",
    link: "https://github.com/Bangkit-TheFedProject",
  },
  {
    title: "BiSpeak",
    logo: <FiCoffee />, // Ganti dengan logo Anda nanti
    bgColor: "linear-gradient(145deg, #CFD8DC, #90A4AE)",
    link: "https://github.com/LaskarAI-BISpeak",
  },

];
// ------------------------------

// --- LOGIKA PAGINASI ---
const ITEMS_PER_PAGE = 6;
// -------------------------

export default function Experience() {
  // State untuk melacak halaman saat ini
  const [currentPage, setCurrentPage] = useState(1);

  // Menghitung total halaman
  const totalPages = Math.ceil(projectsData.length / ITEMS_PER_PAGE);

  // Menghitung proyek mana yang akan ditampilkan
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProjects = projectsData.slice(startIndex, endIndex);

  // Fungsi untuk ganti halaman
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  // ------------------------------

  return (
    <main className="experience-page">
      {/* --- Latar Belakang Galaxy --- */}
      <Galaxy
        mouseRepulsion={false}
        mouseInteraction={false}
        density={1}
        glowIntensity={0.4}
        hueShift={240}
        className="experience-galaxy-bg"
      />

      {/* ===== HEADER BARU ===== */}
      <section className="experience-header">
        <h1 className="title">
          Explore My <span>Projects</span>
        </h1>
      </section>

      {/* ===== PROJECTS BARU ===== */}
      <section className="projects-section">
        {currentProjects.map((p, i) => (
          <a
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="new-project-card" // Class CSS baru
            key={p.title + i}
          >
            {/* --- Header Kartu (Title + View) --- */}
            <div className="card-header">
              <span className="card-title">
                <FiLink size={14} /> {/* Ikon Link */}
                {p.title}
              </span>
              <span className="card-view-btn">
                <FiEye size={14} />
                View
              </span>
            </div>

            {/* --- Area Gambar Kartu (Logo + BG Warna) --- */}
            <div
              className="card-image-area"
              style={{ background: p.bgColor }}
            >
              <div className="card-logo">
                {p.logo}
              </div>
            </div>
            {/* --- Struktur HTML lama (overlay, info) dihapus --- */}
          </a>
        ))}
      </section>

      {/* ===== PAGINASI BARU ===== */}
      <section className="pagination-controls">
        <div className="pagination-info">
          Showing {startIndex + 1} to {Math.min(endIndex, projectsData.length)} of {projectsData.length} results
        </div>
        <div className="pagination-buttons">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FiChevronLeft />
          </button>

          {/* Membuat tombol angka... */}
          {[...Array(totalPages)].map((_, pageIndex) => (
            <button
              key={pageIndex + 1}
              onClick={() => goToPage(pageIndex + 1)}
              className={currentPage === (pageIndex + 1) ? 'active' : ''}
            >
              {pageIndex + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FiChevronRight />
          </button>
        </div>
      </section>

    </main>
  );
}