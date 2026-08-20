import React from 'react';

export default function ProjectCard({ project, index = 0, onOpenDetail }) {
  const fallbackImg = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80";

  // Symmetrical curve tilt: cards on the left tilt left, center stays flat, right tilts right
  // Pattern based on index or position in carousel
  const angles = [-3, -1.5, 0, 1.5, 3];
  const angle = angles[index % angles.length];

  return (
    <article
      onClick={() => onOpenDetail(project)}
      className="google-labs-card"
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        padding: '16px 16px 20px 16px',
        width: '320px',
        minWidth: '320px',
        height: '460px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
        transform: `rotate(${angle}deg)`,
        transition: 'transform 0.3s cubic-bezier(0.2, 0.9, 0.3, 1), box-shadow 0.3s ease',
        userSelect: 'none',
        flexShrink: 0
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'rotate(0deg) translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 20px 45px rgba(0, 0, 0, 0.4)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = `rotate(${angle}deg)`;
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.25)';
      }}
    >
      {/* Top Image (Clean Rounded Container like Google Labs) */}
      <div style={{
        width: '100%',
        height: '240px',
        borderRadius: '18px',
        overflow: 'hidden',
        backgroundColor: '#f2f2f4',
        marginBottom: '16px',
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
          onError={(e) => {
            e.currentTarget.src = fallbackImg;
          }}
        />
      </div>

      {/* Card Content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexGrow: 1
      }}>
        <div>
          {/* Title */}
          <h3 style={{
            fontSize: '18px',
            fontWeight: 600,
            lineHeight: '1.3',
            color: '#111111',
            letterSpacing: '-0.02em',
            marginBottom: '8px',
            height: '46px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontFamily: 'var(--font-sf)'
          }}>
            {project.title}
          </h3>

          {/* Description */}
          <p style={{
            fontSize: '13px',
            lineHeight: '1.5',
            color: '#555555',
            height: '40px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {project.description}
          </p>
        </div>

        {/* Action text */}
        <div style={{
          paddingTop: '12px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <span style={{
            fontSize: '12px',
            fontWeight: 500,
            color: '#111111',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span>Ver más</span>
            <span style={{ fontSize: '13px' }}>→</span>
          </span>
        </div>
      </div>
    </article>
  );
}
