import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const [expanded, setExpanded] = useState(false);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 35,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      style={{
        paddingTop: '96px',
        paddingBottom: '96px',
        borderBottom: '1px solid var(--color-border-subtle)',
        textAlign: 'center',
        backgroundColor: '#000000'
      }}
    >
      <div ref={contentRef} className="container" style={{ maxWidth: '760px' }}>
        <h2 style={{
          fontSize: 'var(--text-heading-sm)',
          lineHeight: '1.25',
          color: '#f5f5f7',
          marginBottom: '24px',
          fontWeight: 500,
          letterSpacing: '-0.02em'
        }}>
          El código es arquitectura. La interfaz es intuición. El rendimiento es respeto por el usuario.
        </h2>

        <p style={{
          fontSize: '16px',
          lineHeight: '1.7',
          color: 'var(--color-smoke)',
          marginBottom: '28px',
          fontWeight: 400
        }}>
          Construimos productos digitales donde cada píxel y consulta a la base de datos tiene un propósito claro. Sin plantillas sobrecargadas ni dependencias innecesarias. Solo ingeniería disciplinada, esquemas relacionales limpios en PostgreSQL y experiencias fluidas con acabados de alta fidelidad.
        </p>

        {expanded && (
          <div
            className="animate-fade-in-up"
            style={{
              marginTop: '28px',
              marginBottom: '28px',
              paddingTop: '24px',
              borderTop: '1px solid var(--color-border-subtle)',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            <div style={{ padding: '18px 20px', backgroundColor: '#0d0d0f', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-apple-sm)' }}>
              <h4 style={{ color: '#f5f5f7', fontSize: '14px', marginBottom: '6px', fontWeight: 500 }}>
                Comunicación directa de ingeniero a cliente
              </h4>
              <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--color-smoke)' }}>
                Trabajas directamente con quien escribe el código y diseña la solución técnica, garantizando agilidad y cero pérdida de visión.
              </p>
            </div>

            <div style={{ padding: '18px 20px', backgroundColor: '#0d0d0f', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-apple-sm)' }}>
              <h4 style={{ color: '#f5f5f7', fontSize: '14px', marginBottom: '6px', fontWeight: 500 }}>
                Modelado relacional en PostgreSQL
              </h4>
              <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--color-smoke)' }}>
                Estructuras de datos diseñadas con rigor para tolerar alto volumen de tráfico, con consultas eficientes e integridad garantizada.
              </p>
            </div>

            <div style={{ padding: '18px 20px', backgroundColor: '#0d0d0f', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-apple-sm)' }}>
              <h4 style={{ color: '#f5f5f7', fontSize: '14px', marginBottom: '6px', fontWeight: 500 }}>
                Despliegues continuos & iteración
              </h4>
              <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--color-smoke)' }}>
                Entregas continuas en entornos de staging para que pruebes tu producto en tiempo real semana a semana.
              </p>
            </div>
          </div>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className="btn-apple-secondary"
          style={{ marginTop: '8px' }}
        >
          <span>{expanded ? "Ocultar detalles" : "Leer principios completos"}</span>
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>
    </section>
  );
}
