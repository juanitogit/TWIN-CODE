import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#000000',
      paddingTop: '80px',
      paddingBottom: '60px',
      borderTop: '1px solid var(--color-border-subtle)'
    }}>
      <div className="container">
        {/* Main Footer Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '64px'
        }}>
          {/* Brand Column */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px',
              lineHeight: 1
            }}>
              {/* Perfectly centered 32x32 interlocking diamonds SVG */}
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" style={{ display: 'block', flexShrink: 0 }}>
                {/* Left diamond (Silver) */}
                <rect x="5" y="10.5" width="11" height="11" rx="2" transform="rotate(45 5 10.5)" stroke="#8e8e93" strokeWidth="2.2" fill="none" />
                {/* Right diamond (White) */}
                <rect x="15" y="10.5" width="11" height="11" rx="2" transform="rotate(45 15 10.5)" stroke="#ffffff" strokeWidth="2.2" fill="none" />
              </svg>

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
            </div>

            <p style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: 'var(--color-smoke)',
              maxWidth: '280px',
              marginBottom: '0px'
            }}>
              Ingeniería de software, automatizaciones empresariales y sistemas digitales escalables de alto rendimiento.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#ffffff',
              marginBottom: '16px',
              fontWeight: 500
            }}>
              Navegación
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <a href="#services" style={{ fontSize: '13px', color: 'var(--color-smoke)' }}
                   onMouseOver={e => e.currentTarget.style.color = '#ffffff'}
                   onMouseOut={e => e.currentTarget.style.color = 'var(--color-smoke)'}>
                  Servicios de Ingeniería
                </a>
              </li>
              <li>
                <a href="#portfolio" style={{ fontSize: '13px', color: 'var(--color-smoke)' }}
                   onMouseOver={e => e.currentTarget.style.color = '#ffffff'}
                   onMouseOut={e => e.currentTarget.style.color = 'var(--color-smoke)'}>
                  Portafolio & Casos de Estudio
                </a>
              </li>
              <li>
                <a href="#team" style={{ fontSize: '13px', color: 'var(--color-smoke)' }}
                   onMouseOver={e => e.currentTarget.style.color = '#ffffff'}
                   onMouseOut={e => e.currentTarget.style.color = 'var(--color-smoke)'}>
                  Equipo de Desarrollo
                </a>
              </li>
              <li>
                <a href="#manifesto" style={{ fontSize: '13px', color: 'var(--color-smoke)' }}
                   onMouseOver={e => e.currentTarget.style.color = '#ffffff'}
                   onMouseOut={e => e.currentTarget.style.color = 'var(--color-smoke)'}>
                  Filosofía & Estándares
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#ffffff',
              marginBottom: '16px',
              fontWeight: 500
            }}>
              Contacto Oficial
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href="mailto:twin.code.developers@gmail.com"
                style={{
                  fontSize: '13px',
                  color: 'var(--color-compass-gold)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>twin.code.developers@gmail.com</span>
                <ArrowUpRight size={13} />
              </a>

              <span style={{ fontSize: '12px', color: 'var(--color-smoke)' }}>
                Disponible para proyectos y consultoría de software
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '32px',
          borderTop: '1px solid var(--color-border-subtle)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          fontSize: '12px',
          color: 'var(--color-ash)'
        }}>
          <div>
            © {new Date().getFullYear()} Twin Code Studio. Todos los derechos reservados.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <span>Términos de Servicio</span>
            <span>Privacidad de Datos</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
