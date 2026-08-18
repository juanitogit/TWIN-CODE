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
  const cardsRef = useRef([]);

  useEffect(() => {
    if (cardsRef.current && cardsRef.current.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
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
          marginBottom: '54px'
        }}>
          <div>
            <span className="apple-section-label" style={{ display: 'block', marginBottom: '8px' }}>
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
            color: 'var(--color-smoke)',
            letterSpacing: '-0.01em'
          }}>
            Desarrollo, automatización e infraestructura digital
          </span>
        </div>

        {/* 3x2 Service Grid with GSAP Stagger */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px'
        }}>
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="interactive-card"
                style={{
                  padding: '36px 32px',
                  backgroundColor: '#0d0d0f',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  borderRadius: 'var(--radius-apple-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  opacity: 1
                }}
              >
                {/* Icon Row */}
                <div style={{ marginBottom: '20px' }}>
                  <Icon
                    size={26}
                    strokeWidth={1.6}
                    style={{ color: 'var(--color-compass-gold)' }}
                  />
                </div>

                {/* Service Heading */}
                <h3 style={{
                  fontSize: '17px',
                  fontWeight: 600,
                  color: '#ffffff',
                  marginBottom: '12px',
                  lineHeight: '1.35',
                  letterSpacing: '-0.01em'
                }}>
                  {service.title}
                </h3>

                {/* Service Description */}
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: '#b0b0b5',
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
