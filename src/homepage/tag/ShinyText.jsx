// src/tag/ShinyText.jsx

import './ShinyText.css';

const ShinyText = ({ text, disabled = false, speed = 5, className = '' }) => {
  // Kita pakai 'speed' untuk mengatur durasi animasi
  const animationDuration = `${speed}s`;

  return (
    <div 
      className={`shiny-text ${disabled ? 'disabled' : ''} ${className}`} 
      // Style ini akan menimpa 'animation-duration' dari CSS
      style={{ animationDuration }} 
    >
      {text}
    </div>
  );
};

export default ShinyText;