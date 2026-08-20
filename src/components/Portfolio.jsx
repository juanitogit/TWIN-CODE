import React, { useState, useMemo, useRef } from 'react';
import ProjectCard from './ProjectCard';
import ProjectDetailModal from './ProjectDetailModal';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Portfolio({ projects }) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [activeProjectModal, setActiveProjectModal] = useState(null);

  const carouselRef = useRef(null);

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

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="portfolio"
      style={{
        position: 'relative',
        paddingTop: '88px',
        paddingBottom: '96px',
        borderBottom: '1px solid var(--color-border-subtle)',
        backgroundColor: '#000000',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        {/* Clean Original Section Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '24px',
          marginBottom: '32px'
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

          <span style={{
            fontSize: '13px',
            color: 'var(--color-smoke)',
            letterSpacing: '-0.01em'
          }}>
            Desliza para explorar los desarrollos
          </span>
        </div>

        {/* Category Filters */}
        {categories.length > 1 && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '40px',
            paddingBottom: '16px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
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

        {/* Google Labs Horizontal Curved Carousel */}
        {filteredProjects.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            borderRadius: 'var(--radius-apple-md)',
            backgroundColor: '#0a0a0c',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <p style={{ color: 'var(--color-smoke)' }}>No hay proyectos en esta categoría.</p>
          </div>
        ) : (
          <div>
            <div
              ref={carouselRef}
              style={{
                display: 'flex',
                gap: '28px',
                overflowX: 'auto',
                paddingTop: '20px',
                paddingBottom: '32px',
                paddingLeft: '16px',
                paddingRight: '16px',
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
              className="hide-scrollbar"
            >
              {filteredProjects.map((project, index) => (
                <div key={project.id} style={{ scrollSnapAlign: 'start' }}>
                  <ProjectCard
                    project={project}
                    index={index}
                    onOpenDetail={(p) => setActiveProjectModal(p)}
                  />
                </div>
              ))}
            </div>

            {/* Bottom Centered Carousel Navigation Controls (< >) */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginTop: '16px'
            }}>
              <button
                onClick={() => scrollCarousel('left')}
                title="Anterior"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
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
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.color = '#ffffff';
                }}
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={() => scrollCarousel('right')}
                title="Siguiente"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
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
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.color = '#ffffff';
                }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
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

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
