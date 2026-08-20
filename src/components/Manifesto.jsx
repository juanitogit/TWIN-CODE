import React, { useEffect, useRef } from 'react';
import { MessageSquare, Database, Rocket } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PRINCIPLES = [
  {
    icon: MessageSquare,
    title: "Comunicación directa de ingeniero a cliente",
    description: "Trabajas directamente con quien escribe el código y diseña la solución técnica, garantizando agilidad y cero pérdida de visión."
  },
  {
    icon: Database,
    title: "Modelado relacional en PostgreSQL",
    description: "Estructuras de datos diseñadas con rigor para tolerar alto volumen de tráfico, con consultas eficientes e integridad garantizada."
  },
  {
    icon: Rocket,
    title: "Despliegues continuos & iteración",
    description: "Entregas continuas en entornos de staging para que pruebes tu producto en tiempo real semana a semana."
  }
];

export default function Manifesto() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current?.children || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out'
      });

      // Principles stagger animation
      gsap.fromTo(
        itemsRef.current.filter(Boolean),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none none'
          }
        }
      );
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
        backgroundColor: '#000000'
      }}
    >
      <div className="container">
        {/* Header */}
        <div ref={headerRef} style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 64px auto' }}>
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
            color: '#86868b',
            fontWeight: 400
          }}>
            Construimos productos digitales donde cada píxel y consulta a la base de datos tiene un propósito claro. Solo ingeniería disciplinada, esquemas relacionales limpios y experiencias fluidas.
          </p>
        </div>

        {/* Principles — clean grid with icons, no cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '0'
        }}>
          {PRINCIPLES.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                ref={(el) => (itemsRef.current[index] = el)}
                style={{
                  padding: '40px 36px',
                  borderLeft: index > 0 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                  opacity: 0,
                  transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {/* Icon */}
                <div style={{ marginBottom: '24px' }}>
                  <Icon size={24} strokeWidth={1.5} style={{ color: '#86868b' }} />
                </div>

                {/* Title */}
                <h4 style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#f5f5f7',
                  marginBottom: '10px',
                  lineHeight: '1.4',
                  letterSpacing: '-0.01em'
                }}>
                  {item.title}
                </h4>

                {/* Description */}
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.65',
                  color: '#86868b',
                  fontWeight: 400
                }}>
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
