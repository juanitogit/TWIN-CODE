import React, { useRef, useEffect, useCallback } from 'react';

export default function ProjectCard({ project, onOpenDetail, containerRef }) {
  const fallbackImg = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80";
  const cardRef = useRef(null);

  const updateTransform = useCallback(() => {
    const card = cardRef.current;
    const container = containerRef?.current;
    if (!card || !container) return;

    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    const viewCenterX = containerRect.left + containerRect.width / 2;
    const cardCenterX = cardRect.left + cardRect.width / 2;

    const maxOffset = containerRect.width / 2;
    const normalizedOffset = Math.max(-1, Math.min(1, (cardCenterX - viewCenterX) / maxOffset));

    const rotation = normalizedOffset * 5;
    const yShift = normalizedOffset * normalizedOffset * 35;
    const scale = 1 - Math.abs(normalizedOffset) * 0.04;

    card.style.transform = `rotate(${rotation}deg) translateY(${yShift}px) scale(${scale})`;
  }, [containerRef]);

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    // Use MutationObserver-friendly approach: poll on animation frame
    let rafId;
    const tick = () => {
      updateTransform();
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [containerRef, updateTransform]);

  return (
    <article
      ref={cardRef}
      onClick={(e) => {
        e.stopPropagation();
        onOpenDetail(project);
      }}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        overflow: 'hidden',
        width: '340px',
        minWidth: '340px',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08), 0 8px 40px rgba(0,0,0,0.06)',
        border: '1px solid rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.3s ease',
        userSelect: 'none',
        flexShrink: 0,
        willChange: 'transform'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 16px 50px rgba(0,0,0,0.16), 0 24px 70px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08), 0 8px 40px rgba(0,0,0,0.06)';
      }}
    >
      {/* Image */}
      <div style={{
        width: '100%',
        height: '340px',
        overflow: 'hidden',
        backgroundColor: '#f0f0f2',
        flexShrink: 0
      }}>
        <img
          src={project.imageUrl || fallbackImg}
          alt={project.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
          onError={e => { e.currentTarget.src = fallbackImg; }}
        />
      </div>

      {/* Text */}
      <div style={{
        padding: '18px 18px 22px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: 600,
          lineHeight: '1.3',
          color: '#1a1a1a',
          letterSpacing: '-0.01em',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          margin: 0
        }}>
          {project.title}
        </h3>

        <p style={{
          fontSize: '13px',
          lineHeight: '1.5',
          color: '#5f6368',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          margin: 0
        }}>
          {project.description}
        </p>

        <div style={{ paddingTop: '6px' }}>
          <span style={{
            fontSize: '13px',
            fontWeight: 500,
            color: '#1a1a1a',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            Ver más <span style={{ fontSize: '14px' }}>→</span>
          </span>
        </div>
      </div>
    </article>
  );
}
