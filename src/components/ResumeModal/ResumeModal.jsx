import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
import resumeBase64 from '../../assets/resumeData.js';
import './ResumeModal.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// Decode base64 to Uint8Array
function base64ToUint8Array(base64) {
  const raw = atob(base64);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) {
    arr[i] = raw.charCodeAt(i);
  }
  return arr;
}

// Module-level cache — survives re-renders and re-mounts
let cachedPages = null;

export default function ResumeModal({ isOpen, onClose }) {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const scrollRef = useRef(null);
  const [pages, setPages] = useState(cachedPages || []);
  const [loading, setLoading] = useState(!cachedPages);
  const [error, setError] = useState(null);

  const loadPdf = useCallback(async () => {
    // Instant re-open from cache
    if (cachedPages) {
      setPages(cachedPages);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = base64ToUint8Array(resumeBase64);
      const pdf = await pdfjsLib.getDocument({ data }).promise;

      const rendered = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        // Lower scale for mobile performance
        const isMobile = window.innerWidth <= 768;
        const scale = isMobile ? 1.5 : 2;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const ctx = canvas.getContext('2d');
        await page.render({ canvasContext: ctx, viewport }).promise;

        // Show each page progressively as it's rendered
        rendered.push(canvas.toDataURL('image/png'));
        setPages([...rendered]);
        if (i === 1) setLoading(false); // Show first page immediately
      }

      cachedPages = rendered;
    } catch (err) {
      console.error('PDF render error:', err);
      setError('Failed to load resume.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) loadPdf();
  }, [isOpen, loadPdf]);

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
        <div className="resume-modal-body" ref={scrollRef}>
          {loading && (
            <div className="resume-loading">
              <div className="resume-spinner" />
              <span>Loading Resume...</span>
            </div>
          )}
          {error && (
            <div className="resume-loading">
              <span>{error}</span>
            </div>
          )}
          {pages.map((dataUrl, i) => (
            <img
              key={i}
              src={dataUrl}
              alt={`Resume page ${i + 1}`}
              className="resume-page-img"
              draggable={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
