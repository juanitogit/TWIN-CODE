import React, { useState, useMemo } from 'react';
import ProjectCard from './ProjectCard';
import ProjectDetailModal from './ProjectDetailModal';
import { Layers } from 'lucide-react';

export default function Portfolio({ projects }) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [activeProjectModal, setActiveProjectModal] = useState(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set(['Todos']);
    projects.forEach(p => {
      if (p.category) {
        const cat = p.category.split('&')[0].split('/')[0].trim();
        set.add(cat);
      }
    });
    return Array.from(set);
  }, [projects]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'Todos') return projects;
    return projects.filter(p => p.category && p.category.toLowerCase().includes(selectedCategory.toLowerCase()));
  }, [projects, selectedCategory]);

  return (
    <section
      id="portfolio"
      style={{
        paddingTop: '88px',
        paddingBottom: '96px',
        borderBottom: '1px solid var(--color-border-subtle)',
        backgroundColor: '#000000'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '24px',
          marginBottom: '36px'
        }}>
          <div>
            <span className="apple-section-label" style={{ display: 'block', marginBottom: '8px' }}>
              Portafolio de Soluciones ({filteredProjects.length})
            </span>
            <h2 style={{
              fontSize: 'var(--text-heading)',
              lineHeight: '1.15',
              color: '#f5f5f7',
              fontWeight: 500
            }}>
              Sistemas digitales y automatizaciones en producción.
            </h2>
          </div>
        </div>

        {/* Category Filters */}
        {categories.length > 1 && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            marginBottom: '36px',
            paddingBottom: '16px',
            borderBottom: '1px solid var(--color-border-subtle)'
          }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-apple-sm)',
                  letterSpacing: '-0.01em',
                  transition: 'all 0.2s ease',
                  backgroundColor: selectedCategory === cat ? '#ffffff' : 'rgba(255, 255, 255, 0.04)',
                  color: selectedCategory === cat ? '#000000' : 'var(--color-smoke)',
                  border: selectedCategory === cat ? '1px solid #ffffff' : '1px solid var(--color-border-subtle)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Projects Grid with Uniform Dimensions */}
        {filteredProjects.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '54px 20px',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: 'var(--radius-apple-md)',
            backgroundColor: '#0a0a0c'
          }}>
            <Layers size={28} style={{ color: 'var(--color-smoke)', margin: '0 auto 12px', opacity: 0.6 }} />
            <p style={{ color: 'var(--color-smoke)', fontSize: '14px' }}>
              Nuevos desarrollos y casos de estudio en preparación.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px'
            }}
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenDetail={(p) => setActiveProjectModal(p)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {activeProjectModal && (
        <ProjectDetailModal
          project={activeProjectModal}
          onClose={() => setActiveProjectModal(null)}
        />
      )}
    </section>
  );
}
