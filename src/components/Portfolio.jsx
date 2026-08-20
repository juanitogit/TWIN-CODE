import React, { useState, useMemo, useRef } from 'react';
import ProjectCard from './ProjectCard';
import ProjectDetailModal from './ProjectDetailModal';
import { ChevronLeft, ChevronRight, LayoutGrid, SlidersHorizontal, Sparkles } from 'lucide-react';

export default function Portfolio({ projects }) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [viewMode, setViewMode] = useState('CAROUSEL'); // 'CAROUSEL' | 'GRID'

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
      const scrollAmount = direction === 'left' ? -380 : 380;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="portfolio"
      style={{
        position: 'relative',
        paddingTop: '100px',
        paddingBottom: '120px',
        borderBottom: '1px solid var(--color-border-subtle)',
        backgroundColor: '#000000',
        overflow: 'hidden'
      }}
    >
      {/* Google Labs Ambient Glow Blobs in Background */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '5%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(48, 209, 88, 0.25) 0%, rgba(48, 209, 88, 0) 70%)',
        filter: 'blur(70px)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      <div style={{
        position: 'absolute',
        top: '40%',
        left: '-5%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 122, 255, 0.2) 0%, rgba(0, 122, 255, 0) 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      <div style={{
        position: 'absolute',
        bottom: '5%',
        right: '30%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255, 45, 85, 0.18) 0%, rgba(255, 45, 85, 0) 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Google Labs Style Main Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            borderRadius: '100px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            marginBottom: '16px'
          }}>
            <Sparkles size={13} style={{ color: '#c6a972' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#f5f5f7', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Twin Code Labs & Experiments
            </span>
          </div>

          {/* Big Bold Google Labs Headline */}
          <h2 style={{
            fontSize: 'clamp(38px, 6vw, 68px)',
            fontWeight: 700,
            lineHeight: '1.05',
            letterSpacing: '-0.04em',
            color: '#ffffff',
            marginBottom: '18px',
            fontFamily: 'var(--font-sf)'
          }}>
            Sé el primero en{' '}
            <span style={{
              background: 'linear-gradient(135deg, #30d158 0%, #007aff 50%, #ff2d55 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>
              experimentar
            </span>
          </h2>

          <p style={{
            fontSize: 'clamp(15px, 2vw, 18px)',
            lineHeight: '1.5',
            color: '#a1a1a6',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Explora las soluciones de software, sistemas interactivos y desarrollos creados con ingeniería de alto nivel.
          </p>
        </div>

        {/* Filters & View Mode Controls */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '40px',
          paddingBottom: '16px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          {/* Category Chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', overflowX: 'auto' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  padding: '7px 16px',
                  borderRadius: '100px',
                  letterSpacing: '-0.01em',
                  transition: 'all 0.25s ease',
                  backgroundColor: selectedCategory === cat ? '#ffffff' : 'rgba(255, 255, 255, 0.06)',
                  color: selectedCategory === cat ? '#000000' : '#d2d2d7',
                  border: selectedCategory === cat ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: selectedCategory === cat ? '0 4px 14px rgba(255, 255, 255, 0.2)' : 'none'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Carousel Arrows and Grid Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => setViewMode(viewMode === 'CAROUSEL' ? 'GRID' : 'CAROUSEL')}
              title={viewMode === 'CAROUSEL' ? 'Ver en cuadrícula' : 'Ver en carrusel'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                borderRadius: '100px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#f5f5f7',
                fontSize: '12px',
                fontWeight: 500
              }}
            >
              {viewMode === 'CAROUSEL' ? <LayoutGrid size={14} /> : <SlidersHorizontal size={14} />}
              <span>{viewMode === 'CAROUSEL' ? 'Ver Cuadrícula' : 'Ver Carrusel'}</span>
            </button>

            {viewMode === 'CAROUSEL' && (
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => scrollCarousel('left')}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'}
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  onClick={() => scrollCarousel('right')}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Google Labs Experiments Showcase */}
        {filteredProjects.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            borderRadius: '24px',
            backgroundColor: '#0a0a0c',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <p style={{ color: 'var(--color-smoke)' }}>No hay proyectos en esta categoría.</p>
          </div>
        ) : viewMode === 'CAROUSEL' ? (
          <div
            ref={carouselRef}
            style={{
              display: 'flex',
              gap: '32px',
              overflowX: 'auto',
              paddingTop: '24px',
              paddingBottom: '36px',
              paddingLeft: '12px',
              paddingRight: '12px',
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
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '36px',
              paddingTop: '16px'
            }}
          >
            {filteredProjects.map((project, index) => (
              <div key={project.id} style={{ display: 'flex', justifyContent: 'center' }}>
                <ProjectCard
                  project={project}
                  index={index}
                  onOpenDetail={(p) => setActiveProjectModal(p)}
                />
              </div>
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

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
