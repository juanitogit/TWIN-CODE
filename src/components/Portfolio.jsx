import React, { useState, useMemo, useRef } from 'react';
import ProjectCard from './ProjectCard';
import ProjectDetailModal from './ProjectDetailModal';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Portfolio({ projects }) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [activeProjectModal, setActiveProjectModal] = useState(null);

  const carouselRef = useRef(null);

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

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'Todos') return projects;
    return projects.filter(p => p.category && p.category.toLowerCase().includes(selectedCategory.toLowerCase()));
  }, [projects, selectedCategory]);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
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
        /* Light warm background like Google Labs */
        backgroundColor: '#f0ece4',
        overflow: 'hidden'
      }}
    >
      {/* ===== COLORFUL BLOB SHAPES (Google Labs background) ===== */}
      {/* Large green blob top-right */}
      <div style={{
        position: 'absolute',
        top: '-80px',
        right: '-60px',
        width: '500px',
        height: '500px',
        borderRadius: '40% 60% 55% 45% / 55% 40% 60% 45%',
        background: '#34a853',
        opacity: 0.75,
        pointerEvents: 'none',
        zIndex: 1
      }} />

      {/* Blue geometric shape bottom-left */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '-40px',
        width: '220px',
        height: '300px',
        background: '#4285f4',
        opacity: 0.7,
        transform: 'rotate(-15deg)',
        borderRadius: '8px',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      {/* Pink/red accent top-left */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '25%',
        width: '180px',
        height: '60px',
        background: '#ea4335',
        opacity: 0.65,
        borderRadius: '30px',
        transform: 'rotate(-8deg)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      {/* Small yellow accent */}
      <div style={{
        position: 'absolute',
        bottom: '120px',
        right: '15%',
        width: '120px',
        height: '120px',
        background: '#fbbc04',
        opacity: 0.5,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '24px',
          marginBottom: '32px'
        }}>
          <div>
            <span style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#5f6368'
            }}>
              Portafolio de Soluciones ({filteredProjects.length})
            </span>
            <h2 style={{
              fontSize: 'var(--text-heading)',
              lineHeight: '1.15',
              color: '#1a1a1a',
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
            gap: '8px',
            marginBottom: '40px',
            paddingBottom: '16px',
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
          }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  padding: '6px 14px',
                  borderRadius: '20px',
                  letterSpacing: '-0.01em',
                  transition: 'all 0.2s ease',
                  backgroundColor: selectedCategory === cat ? '#1a1a1a' : 'rgba(0, 0, 0, 0.04)',
                  color: selectedCategory === cat ? '#ffffff' : '#5f6368',
                  border: selectedCategory === cat ? '1px solid #1a1a1a' : '1px solid rgba(0, 0, 0, 0.12)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Horizontal Scrolling Cards */}
        {filteredProjects.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            borderRadius: '20px',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0, 0, 0, 0.08)'
          }}>
            <p style={{ color: '#5f6368' }}>No hay proyectos en esta categoría.</p>
          </div>
        ) : (
          <div>
            <div
              ref={carouselRef}
              style={{
                display: 'flex',
                gap: '28px',
                overflowX: 'auto',
                paddingTop: '40px',
                paddingBottom: '60px',
                paddingLeft: '16px',
                paddingRight: '16px',
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                alignItems: 'flex-start'
              }}
              className="hide-scrollbar"
            >
              {filteredProjects.map((project) => (
                <div key={project.id} style={{ scrollSnapAlign: 'start' }}>
                  <ProjectCard
                    project={project}
                    containerRef={carouselRef}
                    onOpenDetail={(p) => setActiveProjectModal(p)}
                  />
                </div>
              ))}
            </div>

            {/* Bottom centered arrows like Google Labs */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginTop: '24px'
            }}>
              <button
                onClick={() => scrollCarousel('left')}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  color: '#1a1a1a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                }}
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={() => scrollCarousel('right')}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  color: '#1a1a1a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
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
