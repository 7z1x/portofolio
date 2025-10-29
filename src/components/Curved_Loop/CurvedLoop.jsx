import { useEffect, useRef, useMemo, useId } from 'react';
import './CurvedLoop.css';

const CurvedLoop = ({
  marqueeText = '',
  speed = 50, // kecepatan (px per detik)
  fontSize = '3rem',
  color = '#4f7cff',
  letterSpacing = '3px',
}) => {
  const uid = useId();
  const pathId = `path-${uid}`;
  const pathD = 'M0,50 L1200,50'; // panjang jalur teks
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const measureRef = useRef(null);

  const text = useMemo(() => {
    const t = marqueeText.trimEnd();
    return `${t}  ✦  `;
  }, [marqueeText]);

  useEffect(() => {
    const spacing = measureRef.current.getComputedTextLength();
    let pos1 = 0;
    let pos2 = spacing;
    let last = performance.now();

    const animate = (now) => {
      const delta = (now - last) / 1000;
      last = now;
      const move = (speed * delta);
      pos1 -= move;
      pos2 -= move;

      if (pos1 < -spacing) pos1 = pos2 + spacing;
      if (pos2 < -spacing) pos2 = pos1 + spacing;

      textRef1.current.setAttribute('startOffset', pos1);
      textRef2.current.setAttribute('startOffset', pos2);

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [speed, text]);

  return (
    <div className="curvedloop-wrapper">
      <svg className="curvedloop-svg" viewBox="0 0 1200 100" preserveAspectRatio="xMinYMid slice">
        <defs>
          <path id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>

        {/* Measure text width once */}
        <text ref={measureRef} fontSize={fontSize} style={{ visibility: 'hidden' }}>
          {text}
        </text>

        <text fontSize={fontSize} fontWeight="600" fill={color} letterSpacing={letterSpacing}>
          <textPath ref={textRef1} href={`#${pathId}`} startOffset="0">
            {text}
          </textPath>
          <textPath ref={textRef2} href={`#${pathId}`} startOffset="0">
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default CurvedLoop;
