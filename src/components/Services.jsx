import React, { useEffect, useRef } from 'react';
import { Cpu, Server, Bot, Layers, Network, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    icon: Cpu,
    title: "Software a Medida & Plataformas Web",
    description: "Desarrollo de aplicaciones y plataformas web robustas diseñadas a la medida exacta de los requerimientos de tu empresa, con interfaces fluidas y arquitecturas escalables."
  },
  {
    icon: Bot,
    title: "Automatización de Procesos & Bots / RPA",
    description: "Automatización de flujos de trabajo repetitivos, bots inteligentes, procesamiento de documentos y sincronización entre plataformas para reducir costos operativos."
  },
  {
    icon: Server,
    title: "Bases de Datos & Arquitectura PostgreSQL",
    description: "Diseño, modelado y optimización de bases de datos relacionales en PostgreSQL. Consultas de ultra alta velocidad, integridad transaccional y seguridad empresarial."
  },
  {
    icon: Layers,
    title: "Sistemas de Gestión, ERPs & Dashboards",
    description: "Paneles administrativos a medida, sistemas de inventario, cuadros de mando con métricas en tiempo real y herramientas internas de gestión para tu equipo."
  },
  {
    icon: Network,
    title: "Integraciones de APIs, Webhooks & Pagos",
    description: "Conexión integral entre tus sistemas y servicios de terceros: pasarelas de pago (Stripe, Mercado Pago), CRMs, WhatsApp API, ERPs y microservicios."
  },
  {
    icon: ShieldCheck,
    title: "Consultoría de Arquitectura & Optimización",
    description: "Auditoría de código, optimización de velocidad de carga y rendimiento de servidores, migración de infraestructura y asesoría técnica estratégica."
  }
];

export default function Services() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    if (itemsRef.current && itemsRef.current.length > 0) {
      gsap.fromTo(
        itemsRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        paddingTop: '96px',
        paddingBottom: '96px',
        borderBottom: '1px solid var(--color-border-subtle)',
        backgroundColor: '#000000'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '64px'
        }}>
          <div>
            <span style={{
              display: 'block',
              marginBottom: '10px',
              fontSize: '12px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#86868b'
            }}>
              Soluciones Tecnológicas
            </span>
            <h2 style={{
              fontSize: 'var(--text-heading)',
              lineHeight: '1.15',
              color: '#f5f5f7',
              fontWeight: 500
            }}>
              Ingeniería integral para empresas y negocios.
            </h2>
          </div>
          <span style={{
            fontSize: '13px',
            color: '#86868b',
            letterSpacing: '-0.01em'
          }}>
            Desarrollo, automatización e infraestructura digital
          </span>
        </div>

        {/* Clean list layout — no cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '0'
        }}>
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            // Grid position for border logic
            const col = index % 3;
            const row = Math.floor(index / 3);
            const isLastRow = row >= Math.floor((SERVICES.length - 1) / 3);

            return (
              <div
                key={index}
                ref={(el) => (itemsRef.current[index] = el)}
                style={{
                  padding: '40px 36px',
                  borderRight: col < 2 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                  borderBottom: !isLastRow ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                  opacity: 1,
                  transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {/* Icon */}
                <div style={{ marginBottom: '24px' }}>
                  <Icon
                    size={24}
                    strokeWidth={1.5}
                    style={{ color: '#86868b' }}
                  />
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#f5f5f7',
                  marginBottom: '12px',
                  lineHeight: '1.35',
                  letterSpacing: '-0.01em'
                }}>
                  {service.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.65',
                  color: '#86868b',
                  fontWeight: 400
                }}>
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
