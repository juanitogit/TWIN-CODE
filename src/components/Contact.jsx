import React, { useState } from 'react';
import { Send, CheckCircle2, Mail } from 'lucide-react';
import { emailService } from '../services/emailService';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceType: 'Software a Medida & Plataformas Web',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailService.sendContactInquiry(formData);
      setSubmitted(true);
    } catch (err) {
      console.error("Error al enviar solicitud:", err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      style={{
        paddingTop: '88px',
        paddingBottom: '100px',
        borderBottom: '1px solid var(--color-border-subtle)',
        backgroundColor: '#000000'
      }}
    >
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '64px'
        }}>
          {/* Left Column: Information */}
          <div>
            <span className="apple-section-label" style={{ display: 'block', marginBottom: '12px' }}>
              Iniciar Colaboración
            </span>

            <h2 style={{
              fontSize: 'var(--text-heading-lg)',
              lineHeight: '1.1',
              color: '#f5f5f7',
              marginBottom: '20px',
              fontWeight: 500,
              letterSpacing: '-0.025em'
            }}>
              ¿Tienes un proyecto o proceso que optimizar? Hagámoslo realidad.
            </h2>

            <p style={{
              fontSize: '16px',
              lineHeight: '1.65',
              color: 'var(--color-smoke)',
              marginBottom: '32px'
            }}>
              En <strong>TWIN CODE</strong> desarrollamos software a medida, automatizaciones avanzadas y sistemas digitales robustos para potenciar las operaciones de tu empresa o negocio.
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              paddingTop: '24px',
              borderTop: '1px solid var(--color-border-subtle)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Mail size={16} style={{ color: 'var(--color-compass-gold)' }} />
                <a href="mailto:twin.code.developers@gmail.com" style={{
                  fontSize: '14px',
                  color: '#f5f5f7'
                }}>
                  twin.code.developers@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div
            style={{
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-apple-md)',
              padding: '36px',
              backgroundColor: '#0a0a0c'
            }}
          >
            {submitted ? (
              <div className="animate-fade-in-up" style={{
                textAlign: 'center',
                padding: '48px 16px'
              }}>
                <CheckCircle2 size={42} style={{ color: 'var(--color-pulse-green)', margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '20px', color: '#f5f5f7', marginBottom: '8px', fontWeight: 500 }}>
                  Solicitud Enviada con Éxito
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-smoke)', marginBottom: '24px', lineHeight: '1.6' }}>
                  Hemos recibido tu requerimiento. Se ha notificado al equipo a <strong>twin.code.developers@gmail.com</strong> y te responderemos a la brevedad.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      serviceType: 'Software a Medida & Plataformas Web',
                      message: ''
                    });
                  }}
                  className="btn-apple-secondary"
                >
                  Enviar otra solicitud
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: 'var(--color-smoke)',
                    marginBottom: '8px'
                  }}>
                    Tu nombre o empresa *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Carlos Mendoza / Logística Express"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="hyper-input"
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: 'var(--color-smoke)',
                    marginBottom: '8px'
                  }}>
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="carlos@empresa.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="hyper-input"
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: 'var(--color-smoke)',
                    marginBottom: '8px'
                  }}>
                    Solución o Servicio de Interés
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={e => setFormData({ ...formData, serviceType: e.target.value })}
                    className="hyper-select"
                  >
                    <option value="Software a Medida & Plataformas Web">Software a Medida & Plataformas Web</option>
                    <option value="Automatización de Procesos & Bots / RPA">Automatización de Procesos & Bots / RPA</option>
                    <option value="Sistemas de Gestión, ERPs & Dashboards">Sistemas de Gestión, ERPs & Dashboards</option>
                    <option value="Bases de Datos & Arquitectura PostgreSQL">Bases de Datos & Arquitectura PostgreSQL</option>
                    <option value="Integración de APIs, Webhooks & Pagos">Integración de APIs, Webhooks & Pagos</option>
                    <option value="Consultoría Tecnológica & Rendimiento">Consultoría Tecnológica & Rendimiento</option>
                    <option value="Otro requerimiento específico">Otro requerimiento específico</option>
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: 'var(--color-smoke)',
                    marginBottom: '8px'
                  }}>
                    Detalles del proyecto o requerimientos *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe los objetivos, procesos a automatizar o características del software que necesitas construir..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="hyper-textarea"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-apple-primary"
                  style={{ width: '100%', marginTop: '6px', padding: '12px 20px' }}
                >
                  <span>{loading ? 'Enviando...' : 'Enviar solicitud'}</span>
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
