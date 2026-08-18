import React from 'react';
import { Edit2, Trash2, ExternalLink, Plus, RefreshCw, Eye } from 'lucide-react';

export default function ProjectList({ projects, onNewProject, onEditProject, onDeleteProject, onResetDefaults }) {
  return (
    <div>
      {/* Header of Project List */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div>
          <h4 style={{
            fontSize: '16px',
            color: 'var(--color-chalk)',
            fontWeight: 400
          }}>
            Proyectos Publicados ({projects.length})
          </h4>
          <span style={{
            fontSize: '12px',
            fontFamily: 'var(--font-input)',
            color: 'var(--color-smoke)'
          }}>
            Gestiona los enlaces, capturas y descripciones mostradas en la web.
          </span>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={onResetDefaults}
            title="Restablecer proyectos demo iniciales"
            className="btn-graphite-outline"
            style={{ padding: '8px 12px', fontSize: '12px' }}
          >
            <RefreshCw size={13} />
            <span>Reset Demos</span>
          </button>

          <button
            onClick={onNewProject}
            className="btn-primary-pill"
            style={{ padding: '8px 18px', fontSize: '13px' }}
          >
            <Plus size={14} />
            <span>Nuevo Proyecto</span>
          </button>
        </div>
      </div>

      {/* Projects Table / Cards List */}
      {projects.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '48px 16px',
          border: '1px dashed var(--color-graphite)',
          borderRadius: 'var(--radius-cards)'
        }}>
          <p style={{ color: 'var(--color-smoke)', marginBottom: '16px' }}>
            No hay proyectos registrados todavía.
          </p>
          <button onClick={onNewProject} className="btn-primary-pill">
            Crear el primer proyecto
          </button>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {projects.map((project) => (
            <div
              key={project.id}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                padding: '16px 20px',
                backgroundColor: 'var(--color-carbon)',
                border: '1px solid var(--color-graphite)',
                borderRadius: 'var(--radius-cards)',
                transition: 'border-color 0.2s ease'
              }}
              onMouseOver={e => e.currentTarget.style.borderColor = 'var(--color-iron)'}
              onMouseOut={e => e.currentTarget.style.borderColor = 'var(--color-graphite)'}
            >
              {/* Left thumbnail & Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '240px', flex: '1 1 300px' }}>
                {project.imageUrl && (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    style={{
                      width: '64px',
                      height: '48px',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-tags)',
                      border: '1px solid var(--color-graphite)',
                      flexShrink: 0
                    }}
                  />
                )}
                <div>
                  <h5 style={{ fontSize: '15px', color: 'var(--color-chalk)', fontWeight: 400, marginBottom: '2px' }}>
                    {project.title}
                  </h5>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontFamily: 'var(--font-input)', color: 'var(--color-smoke)' }}>
                    <span>{project.category}</span>
                    <span>•</span>
                    <span>{project.client || "Self"}</span>
                  </div>
                </div>
              </div>

              {/* Live Link */}
              <div style={{ flex: '0 1 200px' }}>
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
                      fontFamily: 'var(--font-input)',
                      color: 'var(--color-ash)',
                      textDecoration: 'underline',
                      textUnderlineOffset: '3px'
                    }}
                  >
                    <span style={{
                      maxWidth: '160px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {project.liveUrl.replace(/^https?:\/\//, '')}
                    </span>
                    <ExternalLink size={11} />
                  </a>
                ) : (
                  <span style={{ fontSize: '12px', color: 'var(--color-iron)' }}>Sin URL</span>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => onEditProject(project)}
                  title="Editar Proyecto"
                  style={{
                    padding: '8px',
                    borderRadius: 'var(--radius-tags)',
                    border: '1px solid var(--color-graphite)',
                    color: 'var(--color-chalk)',
                    backgroundColor: 'transparent'
                  }}
                  onMouseOver={e => e.currentTarget.style.borderColor = 'var(--color-iron)'}
                  onMouseOut={e => e.currentTarget.style.borderColor = 'var(--color-graphite)'}
                >
                  <Edit2 size={14} />
                </button>

                <button
                  onClick={() => {
                    if (window.confirm(`¿Estás seguro de eliminar el proyecto "${project.title}"?`)) {
                      onDeleteProject(project.id);
                    }
                  }}
                  title="Eliminar Proyecto"
                  style={{
                    padding: '8px',
                    borderRadius: 'var(--radius-tags)',
                    border: '1px solid var(--color-graphite)',
                    color: '#ff6b6b',
                    backgroundColor: 'transparent'
                  }}
                  onMouseOver={e => e.currentTarget.style.borderColor = '#ff6b6b'}
                  onMouseOut={e => e.currentTarget.style.borderColor = 'var(--color-graphite)'}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
