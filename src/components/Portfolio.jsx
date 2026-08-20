import React, { useState, useMemo, useRef, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import ProjectDetailModal from './ProjectDetailModal';

export default function Portfolio({ projects }) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const trackRef = useRef(null);

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

  // Auto-scroll: slowly scroll the carousel to the right continuously
  useEffect(() => {
    const track = trackRef.current;
    if (!track || filteredProjects.length === 0) return;

    let rafId;
    const speed = 0.5; // pixels per frame (~30px/sec at 60fps)

    const animate = () => {
      if (!isPaused) {
        track.scrollLeft += speed;

        // Seamless loop: when we've scrolled past the original set, jump back
        const halfScroll = track.scrollWidth / 2;
        if (track.scrollLeft >= halfScroll) {
          track.scrollLeft -= halfScroll;
        }
      }
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isPaused, filteredProjects]);

  // Duplicate projects for seamless infinite loop
  const loopedProjects = useMemo(() => {
    if (filteredProjects.length === 0) return [];
    return [...filteredProjects, ...filteredProjects];
  }, [filteredProjects]);

  return (
    <section
      id="portfolio"
      style={{
        position: 'relative',
        paddingTop: '88px',
        paddingBottom: '96px',
        backgroundColor: '#f0ece4',
        overflow: 'hidden'
      }}
    >
      {/* Background color blobs */}
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

      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Header inside container */}
        <div className="container">
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
        </div>

        {/* FULL-WIDTH auto-scrolling carousel — NO container constraint */}
        {filteredProjects.length === 0 ? (
          <div className="container">
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              borderRadius: '20px',
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.08)'
            }}>
              <p style={{ color: '#5f6368' }}>No hay proyectos en esta categoría.</p>
            </div>
          </div>
        ) : (
          <div
            ref={trackRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{
              display: 'flex',
              gap: '28px',
              overflowX: 'hidden',
              paddingTop: '40px',
              paddingBottom: '60px',
              paddingLeft: '24px',
              paddingRight: '24px',
              alignItems: 'flex-start',
              width: '100%',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {loopedProjects.map((project, i) => (
              <ProjectCard
                key={`${project.id}-${i}`}
                project={project}
                containerRef={trackRef}
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
