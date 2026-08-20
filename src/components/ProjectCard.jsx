import React, { useState } from 'react';
import { ExternalLink, ArrowUpRight, Sparkles } from 'lucide-react';

const ROTATIONS = ['-2.5deg', '1.8deg', '-1.5deg', '2.5deg', '-3deg', '2deg', '0deg', '-2deg'];

export default function ProjectCard({ project, index = 0, onOpenDetail }) {
  const [isHovered, setIsHovered] = useState(false);
  const fallbackImg = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80";

  // Deterministic tilt angle based on index
  const defaultRotation = ROTATIONS[index % ROTATIONS.length];

  return (
    <div
      onClick={() => onOpenDetail(project)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'rotate(0deg) scale(1.03) translateY(-10px)' : `rotate(${defaultRotation})`,
        transition: 'transform 0.4s cubic-bezier(0.2, 0.9, 0.3, 1.2), box-shadow 0.4s ease, border-color 0.4s ease',
        cursor: 'pointer',
        backgroundColor: '#ffffff',
        borderRadius: '30px',
        padding: '16px 16px 22px 16px',
        boxShadow: isHovered
          ? '0 28px 60px rgba(0, 0, 0, 0.45), 0 0 24px rgba(255, 255, 255, 0.2)'
          : '0 12px 32px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.8)',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minWidth: '290px',
        maxWidth: '360px',
        height: '470px',
        position: 'relative',
        userSelect: 'none',
        flexShrink: 0
      }}
    >
      {/* Framed Image (Google Labs Rounded Container) */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '260px',
        borderRadius: '22px',
        overflow: 'hidden',
        backgroundColor: '#f0f0f2',
        marginBottom: '16px',
        boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.06)'
      }}>
        <img
          src={project.imageUrl || fallbackImg}
          alt={project.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
            transform: isHovered ? 'scale(1.06)' : 'scale(1)'
          }}
          onError={(e) => {
            e.currentTarget.src = fallbackImg;
          }}
        />

        {/* Top Badges (Google Labs experiment pill) */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          borderRadius: '100px',
          padding: '4px 10px',
          fontSize: '11px',
          fontWeight: 600,
          color: '#1d1d1f',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <Sparkles size={11} style={{ color: '#c6a972' }} />
          <span>{project.year || '2026'}</span>
        </div>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title="Abrir web en vivo"
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              backgroundColor: '#000000',
              color: '#ffffff',
              borderRadius: '100px',
              padding: '5px 11px',
              fontSize: '11px',
              fontWeight: 500,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
              transition: 'transform 0.2s ease, background-color 0.2s ease'
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#1d1d1f'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#000000'}
          >
            <span>Web</span>
            <ExternalLink size={11} />
          </a>
        )}
      </div>

      {/* Card Body with Clean Editorial Typography */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexGrow: 1
      }}>
        <div>
          {/* Category Pill */}
          <span style={{
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#86868b',
            display: 'block',
            marginBottom: '6px'
          }}>
            {project.category || 'Experimento Digital'}
          </span>

          {/* Project Title (Bold Google Labs Look) */}
          <h3 style={{
            fontSize: '19px',
            fontWeight: 700,
            lineHeight: '1.25',
            color: '#111111',
            letterSpacing: '-0.02em',
            marginBottom: '8px',
            height: '48px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontFamily: 'var(--font-sf)'
          }}>
            {project.title}
          </h3>

          {/* Description snippet */}
          <p style={{
            fontSize: '13px',
            lineHeight: '1.45',
            color: '#515154',
            height: '38px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {project.description}
          </p>
        </div>

        {/* Footer Actions */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '12px',
          borderTop: '1px solid rgba(0, 0, 0, 0.08)',
          marginTop: '8px'
        }}>
          <span style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#111111',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span>Ver detalles</span>
            <ArrowUpRight size={13} style={{ transform: isHovered ? 'translate(2px, -2px)' : 'none', transition: 'transform 0.2s ease' }} />
          </span>

          {project.tags && project.tags.length > 0 && (
            <span style={{
              fontSize: '11px',
              padding: '3px 9px',
              borderRadius: '100px',
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              color: '#424245',
              fontWeight: 500
            }}>
              {project.tags[0]}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
