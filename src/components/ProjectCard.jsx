import React from 'react';

export default function ProjectCard({ project, index = 0, totalCards = 1, onOpenDetail }) {
  const fallbackImg = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80";

  // ===== ARC / FAN rotation =====
  // Calculate rotation so cards fan out from center like a circular carousel.
  // Center card = 0°, left cards tilt left (negative), right cards tilt right (positive).
  const center = (totalCards - 1) / 2;
  const offset = index - center;
  // Max ±4° at the edges
  const maxAngle = 4;
  const rotation = totalCards > 1
    ? (offset / Math.max(center, 1)) * maxAngle
    : 0;

  // Slight vertical offset to reinforce the arc — center cards sit higher
  const yShift = Math.abs(offset) * 12;

  return (
    <article
      onClick={() => onOpenDetail(project)}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        overflow: 'hidden',
        width: '310px',
        minWidth: '310px',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08), 0 8px 40px rgba(0,0,0,0.06)',
        border: '1px solid rgba(0,0,0,0.06)',
        transform: `rotate(${rotation}deg) translateY(${yShift}px)`,
        transition: 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.4s ease',
        userSelect: 'none',
        flexShrink: 0
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'rotate(0deg) translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 16px 50px rgba(0,0,0,0.16), 0 24px 70px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = `rotate(${rotation}deg) translateY(${yShift}px)`;
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08), 0 8px 40px rgba(0,0,0,0.06)';
      }}
    >
      {/* Image — takes most of the card */}
      <div style={{
        width: '100%',
        height: '320px',
        overflow: 'hidden',
        backgroundColor: '#f0f0f2',
        flexShrink: 0
      }}>
        <img
          src={project.imageUrl || fallbackImg}
          alt={project.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
          onError={e => { e.currentTarget.src = fallbackImg; }}
        />
      </div>

      {/* Text content */}
      <div style={{
        padding: '20px 20px 24px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <h3 style={{
          fontSize: '17px',
          fontWeight: 600,
          lineHeight: '1.3',
          color: '#1a1a1a',
          letterSpacing: '-0.01em',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          margin: 0
        }}>
          {project.title}
        </h3>

        <p style={{
          fontSize: '13px',
          lineHeight: '1.5',
          color: '#5f6368',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          margin: 0
        }}>
          {project.description}
        </p>

        <div style={{ paddingTop: '8px' }}>
          <span style={{
            fontSize: '13px',
            fontWeight: 500,
            color: '#1a1a1a',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            Ver más <span style={{ fontSize: '14px' }}>→</span>
          </span>
        </div>
      </div>
    </article>
  );
}
