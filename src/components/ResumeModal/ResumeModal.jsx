import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './ResumeModal.css';

export default function ResumeModal({ isOpen, onClose }) {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  // Animate open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (overlayRef.current) {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      }
      if (modalRef.current) {
        gsap.fromTo(modalRef.current,
          { y: 50, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out', delay: 0.1 }
        );
      }
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(modalRef.current, { y: 20, opacity: 0, scale: 0.95, duration: 0.2, ease: 'power2.in' });
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.3, ease: 'power2.in',
      onComplete: onClose
    });
  };

  if (!isOpen) return null;

  return (
    <div className="resume-modal-overlay" ref={overlayRef} onClick={handleClose}>
      <div className="resume-modal-container" ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <div className="resume-modal-header">
          <h2>My Resume</h2>
          <button className="resume-modal-close" onClick={handleClose} aria-label="Close modal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="resume-modal-body">
          <img
            src="/resume.webp"
            alt="Resume"
            className="resume-page-img"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
