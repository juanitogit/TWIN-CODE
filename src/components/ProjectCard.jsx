import React from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';

export default function ProjectCard({ project, onOpenDetail }) {
  const fallbackImg = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80";

  return (
    <article
      className="interactive-card"
      style={{
        border: '1px solid rgba(255, 255, 255, 0.14)',
        borderRadius: 'var(--radius-apple-md)',
        backgroundColor: '#0a0a0c',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '490px',
        position: 'relative'
      }}
    >
      {/* Project Image Preview (Fixed 200px height) */}
      <div
        onClick={() => onOpenDetail(project)}
        style={{
          position: 'relative',
          width: '100%',
          height: '200px',
          backgroundColor: '#111113',
          overflow: 'hidden',
          borderBottom: '1px solid var(--color-border-subtle)',
          cursor: 'pointer',
          flexShrink: 0
        }}
      >
        <img
          src={project.imageUrl || fallbackImg}
          alt={project.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)'
          }}
          onError={(e) => {
            e.currentTarget.src = fallbackImg;
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        />

        {/* Live URL Badge if available */}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title="Ver sitio web en vivo"
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              backgroundColor: 'rgba(0, 0, 0, 0.82)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              borderRadius: 'var(--radius-apple-sm)',
              padding: '5px 10px',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '-0.01em',
              transition: 'all 0.2s ease',
              zIndex: 5
            }}
            onMouseOver={e => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.color = '#000000';
            }}
            onMouseOut={e => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.82)';
              e.currentTarget.style.color = '#ffffff';
            }}
          >
            <span>Ver web</span>
            <ExternalLink size={11} />
          </a>
        )}
      </div>

      {/* Project Content */}
      <div style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'space-between'
      }}>
        <div>
          {/* Category & Year */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '8px'
          }}>
            <span style={{
              fontSize: '11px',
              color: 'var(--color-compass-gold)',
              fontWeight: 500
            }}>
              {project.category || "Software a Medida"}
            </span>
            {project.year && (
              <span style={{
                fontSize: '11px',
                color: 'var(--color-smoke)'
              }}>
                {project.year}
              </span>
            )}
          </div>

          {/* Project Title (Fixed 2 lines height) */}
          <h3
            onClick={() => onOpenDetail(project)}
            style={{
              fontSize: '16px',
              lineHeight: '1.3',
              color: '#ffffff',
              fontWeight: 600,
              marginBottom: '8px',
              height: '42px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              cursor: 'pointer'
            }}
            onMouseOver={e => e.currentTarget.style.color = 'var(--color-compass-gold)'}
            onMouseOut={e => e.currentTarget.style.color = '#ffffff'}
          >
            {project.title}
          </h3>

          {/* Project Description (Fixed 3 lines height) */}
          <p style={{
            fontSize: '13px',
            lineHeight: '1.5',
            color: '#b0b0b5',
            marginBottom: '12px',
            height: '58px',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {project.description}
          </p>
        </div>

        {/* Tags and Bottom Actions */}
        <div>
          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '5px',
              marginBottom: '14px',
              height: '24px',
              overflow: 'hidden'
            }}>
              {project.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '10px',
                    padding: '2px 7px',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 'var(--radius-apple-sm)',
                    color: '#e5e5ea'
                  }}
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span style={{ fontSize: '10px', color: 'var(--color-smoke)', alignSelf: 'center' }}>
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Bottom Actions: Ver más button + Live URL */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '12px',
            borderTop: '1px solid var(--color-border-subtle)'
          }}>
            {/* Ver Más Button to open Modal */}
            <button
              type="button"
              onClick={() => onOpenDetail(project)}
              className="btn-graphite-outline"
              style={{
                padding: '5px 12px',
                fontSize: '11px',
                color: '#ffffff',
                borderColor: 'rgba(255, 255, 255, 0.2)'
              }}
            >
              <span>Ver más</span>
              <ArrowRight size={12} />
            </button>

            {/* Direct Web link if exists */}
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '12px',
                  color: 'var(--color-compass-gold)',
                  fontWeight: 500
                }}
              >
                <span>Visitar</span>
                <ExternalLink size={12} />
              </a>
            ) : (
              <span style={{ fontSize: '11px', color: '#6e6e73' }}>
                Sistema Privado
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
