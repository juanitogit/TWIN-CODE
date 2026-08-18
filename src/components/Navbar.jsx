import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

export default function Navbar() {
  const headerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    );
  }, []);

  return (
    <header
      ref={headerRef}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.92)',
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        borderBottom: '1px solid var(--color-border-subtle)',
        height: '64px',
        opacity: 1
      }}
    >
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%'
      }}>
        {/* Brand: Isotipo de rombos entrelazados con tamaño destacado y alineación óptica exacta */}
        <a
          href="#hero"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'none',
            border: 'none',
            padding: 0,
            lineHeight: 1,
            cursor: 'pointer'
          }}
        >
          {/* Symmetrical 32x32 interlocking diamonds SVG (size 28x28) */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            style={{
              display: 'block',
              flexShrink: 0
            }}
          >
            {/* Left diamond (Silver) */}
            <rect
              x="5"
              y="10.5"
              width="11"
              height="11"
              rx="2"
              transform="rotate(45 5 10.5)"
              stroke="#8e8e93"
              strokeWidth="2.4"
              fill="none"
            />
            {/* Right diamond (White) */}
            <rect
              x="15"
              y="10.5"
              width="11"
              height="11"
              rx="2"
              transform="rotate(45 15 10.5)"
              stroke="#ffffff"
              strokeWidth="2.4"
              fill="none"
            />
          </svg>

          {/* Eye-catching TWIN CODE wordmark */}
          <span style={{
            fontSize: '20px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            color: '#ffffff',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-sf)',
            display: 'inline-block',
            lineHeight: 1
          }}>
            TWIN CODE
          </span>
        </a>

        {/* Navigation Links (Desktop) */}
        <nav style={{
          display: 'none',
          alignItems: 'center',
          gap: '32px',
        }} className="desktop-nav">
          <a href="#services" style={{
            fontSize: '13px',
            color: 'var(--color-smoke)',
            fontWeight: 400,
            letterSpacing: '-0.01em'
          }} onMouseOver={e => e.currentTarget.style.color = '#ffffff'}
             onMouseOut={e => e.currentTarget.style.color = 'var(--color-smoke)'}>
            Servicios
          </a>
          <a href="#portfolio" style={{
            fontSize: '13px',
            color: 'var(--color-smoke)',
            fontWeight: 400,
            letterSpacing: '-0.01em'
          }} onMouseOver={e => e.currentTarget.style.color = '#ffffff'}
             onMouseOut={e => e.currentTarget.style.color = 'var(--color-smoke)'}>
            Portafolio
          </a>
          <a href="#team" style={{
            fontSize: '13px',
            color: 'var(--color-smoke)',
            fontWeight: 400,
            letterSpacing: '-0.01em'
          }} onMouseOver={e => e.currentTarget.style.color = '#ffffff'}
             onMouseOut={e => e.currentTarget.style.color = 'var(--color-smoke)'}>
            Equipo
          </a>
          <a href="#manifesto" style={{
            fontSize: '13px',
            color: 'var(--color-smoke)',
            fontWeight: 400,
            letterSpacing: '-0.01em'
          }} onMouseOver={e => e.currentTarget.style.color = '#ffffff'}
             onMouseOut={e => e.currentTarget.style.color = 'var(--color-smoke)'}>
            Filosofía
          </a>
          <a href="#contact" style={{
            fontSize: '13px',
            color: 'var(--color-smoke)',
            fontWeight: 400,
            letterSpacing: '-0.01em'
          }} onMouseOver={e => e.currentTarget.style.color = '#ffffff'}
             onMouseOut={e => e.currentTarget.style.color = 'var(--color-smoke)'}>
            Contacto
          </a>
        </nav>

        {/* Action Button: Hablemos */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <a href="#contact" className="btn-apple-primary" style={{ padding: '7px 16px', fontSize: '12px' }}>
            <span>Hablemos</span>
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
      <style>{`
        @media (min-width: 800px) {
          .desktop-nav {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
