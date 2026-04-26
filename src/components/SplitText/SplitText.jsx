import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const SplitText = ({ text, className = '', delay = 0 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const chars = containerRef.current.querySelectorAll('.char');
    gsap.fromTo(chars, 
      { opacity: 0, y: 50, rotateX: -90, filter: 'blur(10px)' },
      { 
        opacity: 1, 
        y: 0, 
        rotateX: 0, 
        filter: 'blur(0px)',
        duration: 1.2, 
        stagger: 0.05, 
        ease: 'back.out(2)',
        delay: delay
      }
    );
  }, [text, delay]);

  return (
    <span ref={containerRef} className={className} style={{ display: 'inline-block', perspective: '1000px' }}>
      {text.split('').map((char, index) => (
        <span 
          key={index} 
          className="char" 
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};
export default SplitText;
