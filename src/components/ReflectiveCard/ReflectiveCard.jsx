import React, { useMemo } from 'react';
import './ReflectiveCard.css';
import { FaLock, FaHeartbeat, FaFingerprint } from 'react-icons/fa';

const ReflectiveCard = ({
  blurStrength = 2,
  color = 'white',
  metalness = 1,
  roughness = 0.4,
  overlayColor = 'rgba(255, 255, 255, 0.1)',
  displacementStrength = 20,
  noiseScale = 1,
  specularConstant = 1.2,
  grayscale = 1,
  glassDistortion = 0,
  className = '',
  style = {}
}) => {
  const baseFrequency = 0.03 / Math.max(0.1, noiseScale);
  const saturation = 1 - Math.max(0, Math.min(1, grayscale));

  const cssVariables = {
    '--blur-strength': `${blurStrength}px`,
    '--metalness': metalness,
    '--roughness': roughness,
    '--overlay-color': overlayColor,
    '--text-color': color,
    '--saturation': saturation
  };

  const svgFilter = useMemo(() => (
    <svg className="reflective-svg-filters" aria-hidden="true">
      <defs>
        <filter id="metallic-displacement" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="turbulence" baseFrequency={baseFrequency} numOctaves="2" result="noise" />
          <feColorMatrix in="noise" type="luminanceToAlpha" result="noiseAlpha" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={displacementStrength}
            xChannelSelector="R"
            yChannelSelector="G"
            result="rippled"
          />
          <feSpecularLighting
            in="noiseAlpha"
            surfaceScale={displacementStrength}
            specularConstant={specularConstant}
            specularExponent="20"
            lightingColor="#ffffff"
            result="light"
          >
            <fePointLight x="0" y="0" z="300" />
          </feSpecularLighting>
          <feComposite in="light" in2="rippled" operator="in" result="light-effect" />
          <feBlend in="light-effect" in2="rippled" mode="screen" result="metallic-result" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="solidAlpha"
          />
          <feMorphology in="solidAlpha" operator="erode" radius="45" result="erodedAlpha" />
          <feGaussianBlur in="erodedAlpha" stdDeviation="10" result="blurredMap" />
          <feComponentTransfer in="blurredMap" result="glassMap">
            <feFuncA type="linear" slope="0.5" intercept="0" />
          </feComponentTransfer>
          <feDisplacementMap
            in="metallic-result"
            in2="glassMap"
            scale={glassDistortion}
            xChannelSelector="A"
            yChannelSelector="A"
            result="final"
          />
        </filter>
      </defs>
    </svg>
  ), [baseFrequency, displacementStrength, specularConstant, glassDistortion]);

  return (
    <div className={`reflective-card-container ${className}`} style={{ ...style, ...cssVariables }}>
      {svgFilter}

      {/* Replaced video with a profile placeholder */}
      <div className="reflective-video">
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#5227FF' }}>
          <span style={{ fontSize: '150px', fontWeight: 'bold', color: 'white' }}>ZF</span>
        </div>
      </div>

      <div className="reflective-noise" />
      <div className="reflective-sheen" />
      <div className="reflective-border" />

      <div className="reflective-content">
        <div className="card-header">
          <div className="security-badge">
            <FaLock size={12} className="security-icon" />
            <span>SECURE ACCESS</span>
          </div>
          <FaHeartbeat className="status-icon" size={20} />
        </div>

        <div className="card-body">
          <div className="user-info">
            <h2 className="user-name">ZULFAHMI M ARDIANTO</h2>
            <p className="user-role">SOFTWARE ENGINEER</p>
          </div>
        </div>

        <div className="card-footer">
          <div className="id-section">
            <span className="label">ID NUMBER</span>
            <span className="value">8901-2345-6789</span>
          </div>
          <div className="fingerprint-section">
            <FaFingerprint size={32} className="fingerprint-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ReflectiveCard);
