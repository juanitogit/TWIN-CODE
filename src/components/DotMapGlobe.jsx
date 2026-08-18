import React, { useMemo, useState, useEffect } from 'react';

/**
 * Procedural Dynamic Dot-Matrix World Graphic with ambient waves & pulses
 * Aligned with Hyperstudio's "Dot-Map World Graphic" token specification.
 */
export default function DotMapGlobe() {
  const [waveOffset, setWaveOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveOffset((prev) => (prev + 0.05) % (Math.PI * 2));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Precomputed coordinates creating continent dot distribution
  const dots = useMemo(() => {
    const list = [];
    const rows = 18;
    const cols = 50;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c / cols) * 100;
        const y = (r / rows) * 100;
        
        // Approximate continent shapes with mathematical conditions
        const isNorthAmerica = (c >= 5 && c <= 17 && r >= 3 && r <= 8);
        const isSouthAmerica = (c >= 12 && c <= 18 && r >= 9 && r <= 15);
        const isEurope = (c >= 22 && c <= 29 && r >= 3 && r <= 7);
        const isAfrica = (c >= 22 && c <= 30 && r >= 7 && r <= 14);
        const isAsia = (c >= 28 && c <= 43 && r >= 3 && r <= 10);
        const isOceania = (c >= 37 && c <= 44 && r >= 11 && r <= 15);
        
        const isLand = isNorthAmerica || isSouthAmerica || isEurope || isAfrica || isAsia || isOceania;
        const isAmbient = (r * 13 + c * 7) % 17 === 0;

        if (isLand || isAmbient) {
          const baseOpacity = isLand ? 0.28 : 0.06;
          const radius = isLand ? 1.5 : 0.9;
          list.push({ id: `${r}-${c}`, cx: `${x}%`, cy: `${y}%`, r: radius, baseOpacity, rIndex: r, cIndex: c });
        }
      }
    }
    return list;
  }, []);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '340px',
      overflow: 'hidden',
      pointerEvents: 'none',
      opacity: 0.9
    }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 340"
        preserveAspectRatio="xMidYMid slice"
        style={{ display: 'block' }}
      >
        <defs>
          <radialGradient id="fadeEdge" cx="50%" cy="50%" r="50%">
            <stop offset="55%" stopColor="#f3f3f3" stopOpacity="1" />
            <stop offset="100%" stopColor="#f3f3f3" stopOpacity="0" />
          </radialGradient>
          <mask id="mapMask">
            <rect width="1000" height="340" fill="url(#fadeEdge)" />
          </mask>
        </defs>

        <g mask="url(#mapMask)">
          {dots.map((dot) => {
            // Subtle harmonic wave motion on dot opacity
            const wave = Math.sin(dot.cIndex * 0.25 + dot.rIndex * 0.15 + waveOffset);
            const dynamicOpacity = Math.max(0.04, dot.baseOpacity + wave * 0.12);

            return (
              <circle
                key={dot.id}
                cx={dot.cx}
                cy={dot.cy}
                r={dot.r}
                fill="#f3f3f3"
                opacity={dynamicOpacity}
                style={{ transition: 'opacity 0.2s ease' }}
              />
            );
          })}

          {/* Node 1: Latam Hub Pulsing Indicator */}
          <circle cx="16%" cy="48%" r="4" fill="#6f6759" opacity="0.95" />
          <circle cx="16%" cy="48%" r="14" fill="none" stroke="#6f6759" strokeWidth="1">
            <animate attributeName="r" values="4;24" dur="3.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0" dur="3.2s" repeatCount="indefinite" />
          </circle>

          {/* Node 2: North America Hub */}
          <circle cx="12%" cy="26%" r="3.5" fill="#6f6759" opacity="0.9" />
          <circle cx="12%" cy="26%" r="12" fill="none" stroke="#6f6759" strokeWidth="1">
            <animate attributeName="r" values="3.5;20" dur="2.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;0" dur="2.8s" repeatCount="indefinite" />
          </circle>

          {/* Node 3: Europe Hub */}
          <circle cx="52%" cy="28%" r="3.5" fill="#6f6759" opacity="0.9" />
          <circle cx="52%" cy="28%" r="12" fill="none" stroke="#6f6759" strokeWidth="1">
            <animate attributeName="r" values="3.5;22" dur="3.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;0" dur="3.6s" repeatCount="indefinite" />
          </circle>

          {/* Connective subtle arc line */}
          <path
            d="M 120 88 Q 320 20 520 95"
            fill="none"
            stroke="#6f6759"
            strokeWidth="0.8"
            strokeDasharray="4 6"
            opacity="0.35"
          >
            <animate attributeName="stroke-dashoffset" values="0;20" dur="4s" repeatCount="indefinite" />
          </path>
        </g>
      </svg>

      {/* Subtle bottom blend gradient */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '90px',
        background: 'linear-gradient(to bottom, transparent, var(--color-obsidian))'
      }} />
    </div>
  );
}
