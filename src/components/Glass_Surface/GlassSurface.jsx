import { useEffect, useRef, useId } from 'react';
import './GlassSurface.css';

const GlassSurface = ({
  children,
  width = "fit-content",
  height = "fit-content",
  borderRadius = 70,
  borderWidth = 0.07,
  brightness = 50,
  opacity = 0.93,
  blur = 11,
  displace = 0,
  backgroundOpacity = 0,
  saturation = 1,
  distortionScale = -180,
  redOffset = 0,
  greenOffset = 10,
  blueOffset = 20,
  xChannel = 'R',
  yChannel = 'G',
  mixBlendMode = 'difference',
  className = '',
  style = {}
}) => {
  const uniqueId = useId().replace(/:/g, '-');
  const filterId = `glass-filter-${uniqueId}`;
  const redGradId = `red-grad-${uniqueId}`;
  const blueGradId = `blue-grad-${uniqueId}`;

  const containerRef = useRef(null);
  const feImageRef = useRef(null);
  const redChannelRef = useRef(null);
  const greenChannelRef = useRef(null);
  const blueChannelRef = useRef(null);
  const gaussianBlurRef = useRef(null);

  // ----------------------
  // DISPLACEMENT / GLASS SVG
  // ----------------------
  const generateDisplacementMap = () => {
    const rect = containerRef.current?.getBoundingClientRect();
    const actualWidth = rect?.width || 400;
    const actualHeight = rect?.height || 200;
    const edgeSize = Math.min(actualWidth, actualHeight) * (borderWidth * 2);

    const svgContent = `
      <svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#ffffff08"/>
            <stop offset="100%" stop-color="#ffffff10"/>
          </linearGradient>

          <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#ffffff00"/>
            <stop offset="100%" stop-color="#ffffff08"/>
          </linearGradient>
        </defs>

        <!-- BASE GLASS -->
        <rect 
          x="0" 
          y="0" 
          width="${actualWidth}" 
          height="${actualHeight}" 
          rx="${borderRadius}" 
          fill="rgba(255,255,255,0.05)" 
        />

        <!-- TOP REFLECTION HIGHLIGHT -->
        <rect 
          x="0" 
          y="0" 
          width="${actualWidth}" 
          height="${actualHeight / 2}" 
          rx="${borderRadius}" 
          fill="url(#${redGradId})"
        />

        <!-- BOTTOM SOFT GRADIENT -->
        <rect 
          x="0" 
          y="${actualHeight / 3}" 
          width="${actualWidth}" 
          height="${actualHeight}" 
          rx="${borderRadius}" 
          fill="url(#${blueGradId})"
        />

        <!-- INNER BLUR SOFT WHITE -->
        <rect 
          x="${edgeSize}" 
          y="${edgeSize}" 
          width="${actualWidth - edgeSize * 2}" 
          height="${actualHeight - edgeSize * 2}" 
          rx="${borderRadius}" 
          fill="rgba(255,255,255,0.08)" 
          style="filter:blur(${blur}px)" 
        />
      </svg>
    `;

    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
  };

  const updateDisplacementMap = () => {
    feImageRef.current?.setAttribute('href', generateDisplacementMap());
  };

  // Apply distortion & filters
  useEffect(() => {
    updateDisplacementMap();
    [
      { ref: redChannelRef, offset: redOffset },
      { ref: greenChannelRef, offset: greenOffset },
      { ref: blueChannelRef, offset: blueOffset }
    ].forEach(({ ref, offset }) => {
      if (ref.current) {
        ref.current.setAttribute('scale', (distortionScale + offset).toString());
        ref.current.setAttribute('xChannelSelector', xChannel);
        ref.current.setAttribute('yChannelSelector', yChannel);
      }
    });

    gaussianBlurRef.current?.setAttribute('stdDeviation', displace.toString());
  }, [
    width,
    height,
    borderRadius,
    borderWidth,
    brightness,
    opacity,
    blur,
    displace,
    distortionScale,
    redOffset,
    greenOffset,
    blueOffset,
    xChannel,
    yChannel,
    mixBlendMode
  ]);

  // Observe resize
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      setTimeout(updateDisplacementMap, 0);
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Detect browser support
  const supportsSVGFilters = () => {
    const isWebkit = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    const isFirefox = /Firefox/.test(navigator.userAgent);
    if (isWebkit || isFirefox) return false;

    const div = document.createElement('div');
    div.style.backdropFilter = `url(#${filterId})`;
    return div.style.backdropFilter !== '';
  };

  const containerStyle = {
    ...style,
    width,
    height,
    borderRadius: `${borderRadius}px`,
    '--glass-frost': backgroundOpacity,
    '--glass-saturation': saturation,
    '--filter-id': `url(#${filterId})`
  };

  return (
    <div
      ref={containerRef}
      className={`glass-surface ${supportsSVGFilters() ? 'glass-surface--svg' : 'glass-surface--fallback'} ${className}`}
      style={containerStyle}
    >
      <svg className="glass-surface__filter" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id={filterId} x="0%" y="0%" width="100%" height="100%">
            <feImage ref={feImageRef} width="100%" height="100%" result="map" />
            <feDisplacementMap ref={redChannelRef} in="SourceGraphic" in2="map" />
            <feDisplacementMap ref={greenChannelRef} in="SourceGraphic" in2="map" />
            <feDisplacementMap ref={blueChannelRef} in="SourceGraphic" in2="map" />
            <feGaussianBlur ref={gaussianBlurRef} stdDeviation="0.7" />
          </filter>
        </defs>
      </svg>

      <div className="glass-surface__content">
        {children}
      </div>
    </div>
  );
};

export default GlassSurface;
