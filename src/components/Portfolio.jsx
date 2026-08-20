import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import ProjectCard from './ProjectCard';
import ProjectDetailModal from './ProjectDetailModal';

export default function Portfolio({ projects }) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);

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

  // Auto-scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track || filteredProjects.length === 0) return;

    let rafId;
    const speed = 0.5;

    const animate = () => {
      if (!isPaused && !isDragging.current) {
        track.scrollLeft += speed;
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

  // ===== DRAG / TOUCH GESTURES =====
  const handlePointerDown = useCallback((e) => {
    isDragging.current = true;
    dragStartX.current = e.clientX || e.touches?.[0]?.clientX || 0;
    scrollStartX.current = trackRef.current?.scrollLeft || 0;
    setIsPaused(true);
  }, []);

  const handlePointerMove = useCallback((e) => {
    if (!isDragging.current || !trackRef.current) return;
    const x = e.clientX || e.touches?.[0]?.clientX || 0;
    const delta = dragStartX.current - x;
    trackRef.current.scrollLeft = scrollStartX.current + delta;
  }, []);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
    // Resume auto-scroll after 2s
    setTimeout(() => {
      if (!isDragging.current) setIsPaused(false);
    }, 2000);
  }, []);

  // Duplicate for infinite loop
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
        backgroundColor: '#000000',
        overflow: 'hidden'
      }}
    >
      {/* Colorful background blobs */}
      <div style={{
        position: 'absolute',
        top: '-80px',
        right: '-60px',
        width: '500px',
        height: '500px',
        borderRadius: '40% 60% 55% 45% / 55% 40% 60% 45%',
        background: '#34a853',
        opacity: 0.55,
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
        opacity: 0.5,
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
        opacity: 0.45,
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
        opacity: 0.35,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Header */}
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
                    borderRadius: '20px',
                    letterSpacing: '-0.01em',
                    transition: 'all 0.2s ease',
                    backgroundColor: selectedCategory === cat ? '#ffffff' : 'rgba(255, 255, 255, 0.04)',
                    color: selectedCategory === cat ? '#000000' : 'var(--color-smoke)',
                    border: selectedCategory === cat ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.12)'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* FULL-WIDTH auto-scrolling + draggable carousel */}
        {filteredProjects.length === 0 ? (
          <div className="container">
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              borderRadius: '20px',
              backgroundColor: '#0a0a0c',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <p style={{ color: 'var(--color-smoke)' }}>No hay proyectos en esta categoría.</p>
            </div>
          </div>
        ) : (
          <div
            ref={trackRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => { setIsPaused(false); isDragging.current = false; }}
            onMouseDown={handlePointerDown}
            onMouseMove={handlePointerMove}
            onMouseUp={handlePointerUp}
            onTouchStart={handlePointerDown}
            onTouchMove={handlePointerMove}
            onTouchEnd={handlePointerUp}
            style={{
              display: 'flex',
              gap: '28px',
              overflowX: 'auto',
              paddingTop: '40px',
              paddingBottom: '60px',
              paddingLeft: '24px',
              paddingRight: '24px',
              alignItems: 'flex-start',
              width: '100%',
              cursor: 'grab',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              userSelect: 'none'
            }}
            className="hide-scrollbar"
          >
            {loopedProjects.map((project, i) => (
              <ProjectCard
                key={`${project.id}-${i}`}
                project={project}
                containerRef={trackRef}
                onOpenDetail={(p) => {
                  if (!isDragging.current) setActiveProjectModal(p);
                }}
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

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
