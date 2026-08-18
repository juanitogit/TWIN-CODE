import React, { useEffect } from 'react';
import { X, ExternalLink, Calendar, Layers, CheckCircle2 } from 'lucide-react';

export default function ProjectDetailModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="animate-fade-in-up"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          backgroundColor: '#0a0a0c',
          border: '1px solid rgba(255, 255, 255, 0.16)',
          borderRadius: 'var(--radius-apple-md)',
          width: '100%',
          maxWidth: '720px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.95)',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#f5f5f7',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={e => {
            e.currentTarget.style.backgroundColor = '#ffffff';
            e.currentTarget.style.color = '#000000';
          }}
          onMouseOut={e => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
            e.currentTarget.style.color = '#f5f5f7';
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Scrollable Body */}
        <div style={{ overflowY: 'auto', flexGrow: 1 }}>
          {/* Hero Image */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '280px',
            backgroundColor: '#121214',
            borderBottom: '1px solid var(--color-border-subtle)'
          }}>
            <img
              src={project.imageUrl}
              alt={project.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80";
              }}
            />
          </div>

          {/* Details Content */}
          <div style={{ padding: '32px' }}>
            {/* Meta Tags Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
              <span style={{
                fontSize: '12px',
                fontWeight: 500,
                color: 'var(--color-compass-gold)',
                backgroundColor: 'rgba(198, 169, 114, 0.1)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-apple-sm)',
                border: '1px solid rgba(198, 169, 114, 0.2)'
              }}>
                {project.category || 'Software a Medida'}
              </span>

              {project.year && (
                <span style={{
                  fontSize: '12px',
                  color: 'var(--color-smoke)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Calendar size={13} />
                  {project.year}
                </span>
              )}

              {project.client && (
                <span style={{ fontSize: '12px', color: 'var(--color-smoke)' }}>
                  • Cliente: <strong style={{ color: '#ffffff' }}>{project.client}</strong>
                </span>
              )}
            </div>

            {/* Project Title */}
            <h2 style={{
              fontSize: '24px',
              fontWeight: 600,
              color: '#ffffff',
              lineHeight: '1.25',
              marginBottom: '18px'
            }}>
              {project.title}
            </h2>

            {/* Description */}
            <div style={{ marginBottom: '28px' }}>
              <h4 style={{ fontSize: '12px', color: 'var(--color-smoke)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>
                Descripción del Proyecto
              </h4>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.7',
                color: '#d2d2d7',
                whiteSpace: 'pre-wrap'
              }}>
                {project.description}
              </p>
            </div>

            {/* Technologies */}
            {project.tags && project.tags.length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h4 style={{ fontSize: '12px', color: 'var(--color-smoke)', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.05em' }}>
                  Tecnologías & Arquitectura
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '12px',
                        padding: '4px 10px',
                        backgroundColor: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: 'var(--radius-apple-sm)',
                        color: '#e5e5ea'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Live Web Link CTA */}
            {project.liveUrl ? (
              <div style={{
                paddingTop: '20px',
                borderTop: '1px solid var(--color-border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px'
              }}>
                <span style={{ fontSize: '13px', color: 'var(--color-smoke)' }}>
                  Proyecto desplegado y operativo en producción
                </span>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-apple-primary"
                  style={{ padding: '10px 22px', fontSize: '13px' }}
                >
                  <span>Visitar Web Oficial</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            ) : (
              <div style={{
                paddingTop: '16px',
                borderTop: '1px solid var(--color-border-subtle)',
                fontSize: '13px',
                color: 'var(--color-smoke)'
              }}>
                Este proyecto corresponde a un desarrollo interno o prototipo de hardware.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
