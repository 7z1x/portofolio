import { useEffect, useRef, useMemo, memo } from 'react';
import { gsap } from 'gsap';

const SplitText = memo(function SplitText({ text, className = '', delay = 0, animationDuration = 1.2, animationStagger = 0.05 }) {
  const containerRef = useRef(null);
  const tweenRef = useRef(null);

  const words = useMemo(() => text.split(' '), [text]);

  useEffect(() => {
    const chars = containerRef.current?.querySelectorAll('.char');
    if (!chars?.length) return;

    // Kill previous tween before creating new one
    tweenRef.current?.kill();

    tweenRef.current = gsap.fromTo(chars,
      { opacity: 0, y: 50, rotateX: -90, filter: 'blur(10px)' },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: 'blur(0px)',
        duration: animationDuration,
        stagger: animationStagger,
        ease: 'back.out(2)',
        delay: delay
      }
    );

    return () => {
      tweenRef.current?.kill();
      tweenRef.current = null;
    };
  }, [text, delay, animationDuration, animationStagger]);

  return (
    <span ref={containerRef} className={className} style={{ display: 'inline', perspective: '1000px' }}>
      {words.map((word, wIdx) => (
        <span key={wIdx} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map((char, cIdx) => (
            <span
              key={cIdx}
              className="char"
              style={{ display: 'inline-block' }}
            >
              {char}
            </span>
          ))}
          {wIdx < words.length - 1 && (
            <span className="char" style={{ display: 'inline-block', whiteSpace: 'pre' }}> </span>
          )}
        </span>
      ))}
    </span>
  );
});

export default SplitText;
