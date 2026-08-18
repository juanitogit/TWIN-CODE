import React from 'react';
import { Users, Mail, Globe } from 'lucide-react';

export default function Team({ members }) {
  return (
    <section
      id="team"
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
          gap: '24px',
          marginBottom: '48px'
        }}>
          <div>
            <span className="apple-section-label" style={{ display: 'block', marginBottom: '8px' }}>
              Equipo & Especialistas
            </span>
            <h2 style={{
              fontSize: 'var(--text-heading)',
              lineHeight: '1.15',
              color: '#f5f5f7',
              fontWeight: 500
            }}>
              Ingeniería colaborativa & desarrollo a medida.
            </h2>
          </div>
          <span style={{
            fontSize: '13px',
            color: 'var(--color-smoke)',
            letterSpacing: '-0.01em'
          }}>
            Especialistas dedicados a la excelencia de tu producto
          </span>
        </div>

        {/* Team Grid */}
        {members.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            border: '1px dashed var(--color-border-subtle)',
            borderRadius: 'var(--radius-apple-md)',
            backgroundColor: '#0d0d0f'
          }}>
            <Users size={32} style={{ color: 'var(--color-smoke)', margin: '0 auto 12px', opacity: 0.5 }} />
            <p style={{ color: 'var(--color-smoke)' }}>
              Equipo en proceso de actualización.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '28px'
            }}
          >
            {members.map((member) => {
              const hasLinks = member.whatsapp || member.email || member.website || member.github || member.linkedin;
              const cleanPhone = member.whatsapp ? member.whatsapp.replace(/[^0-9]/g, '') : null;

              return (
                <div
                  key={member.id}
                  className="interactive-card"
                  style={{
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    borderRadius: 'var(--radius-apple-md)',
                    backgroundColor: '#0d0d0f',
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    opacity: 1
                  }}
                >
                  {/* Top Photo & Info */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '20px' }}>
                    <div style={{
                      width: '74px',
                      height: '74px',
                      borderRadius: 'var(--radius-apple-sm)',
                      overflow: 'hidden',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      backgroundColor: '#161616',
                      flexShrink: 0
                    }}>
                      {member.photoUrl ? (
                        <img
                          src={member.photoUrl}
                          alt={member.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block'
                          }}
                        />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-smoke)' }}>
                          <Users size={24} />
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: 600,
                        color: '#ffffff',
                        marginBottom: '4px'
                      }}>
                        {member.name}
                      </h3>
                      <span style={{
                        fontSize: '12px',
                        color: 'var(--color-compass-gold)',
                        fontWeight: 500
                      }}>
                        Especialista Twin Code
                      </span>
                    </div>
                  </div>

                  {/* Occupations / Roles */}
                  {member.occupations && member.occupations.length > 0 && (
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px',
                      marginBottom: '18px'
                    }}>
                      {member.occupations.map((occ, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: '11px',
                            fontWeight: 500,
                            padding: '4px 9px',
                            backgroundColor: 'rgba(255, 255, 255, 0.08)',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            borderRadius: 'var(--radius-apple-sm)',
                            color: '#e5e5ea'
                          }}
                        >
                          {occ}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Bio */}
                  {member.bio && (
                    <p style={{
                      fontSize: '14px',
                      lineHeight: '1.6',
                      color: '#b0b0b5',
                      marginBottom: '20px',
                      flexGrow: 1
                    }}>
                      {member.bio}
                    </p>
                  )}

                  {/* Contact / Social links - ONLY renders if the field exists */}
                  {hasLinks && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '14px',
                      paddingTop: '16px',
                      borderTop: '1px solid var(--color-border-subtle)',
                      marginTop: 'auto'
                    }}>
                      {/* WhatsApp (Optional) */}
                      {cleanPhone && (
                        <a
                          href={`https://wa.me/${cleanPhone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="WhatsApp"
                          style={{ color: '#25d366', display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px' }}
                          onMouseOver={e => e.currentTarget.style.color = '#30d158'}
                          onMouseOut={e => e.currentTarget.style.color = '#25d366'}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                          </svg>
                          <span>WhatsApp</span>
                        </a>
                      )}

                      {/* Direct Email (Optional) */}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          title="Enviar correo"
                          style={{ color: '#d2d2d7', display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px' }}
                          onMouseOver={e => e.currentTarget.style.color = '#ffffff'}
                          onMouseOut={e => e.currentTarget.style.color = '#d2d2d7'}
                        >
                          <Mail size={14} />
                          <span>Correo</span>
                        </a>
                      )}

                      {/* Website (Optional) */}
                      {member.website && (
                        <a
                          href={member.website.startsWith('http') ? member.website : `https://${member.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Sitio Web"
                          style={{ color: '#d2d2d7', display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px' }}
                          onMouseOver={e => e.currentTarget.style.color = '#ffffff'}
                          onMouseOut={e => e.currentTarget.style.color = '#d2d2d7'}
                        >
                          <Globe size={14} />
                          <span>Web</span>
                        </a>
                      )}

                      {/* GitHub (Optional) */}
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="GitHub"
                          style={{ color: '#d2d2d7', display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px' }}
                          onMouseOver={e => e.currentTarget.style.color = '#ffffff'}
                          onMouseOut={e => e.currentTarget.style.color = '#d2d2d7'}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                          </svg>
                          <span>GitHub</span>
                        </a>
                      )}

                      {/* LinkedIn (Optional) */}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="LinkedIn"
                          style={{ color: '#d2d2d7', display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px' }}
                          onMouseOver={e => e.currentTarget.style.color = '#ffffff'}
                          onMouseOut={e => e.currentTarget.style.color = '#d2d2d7'}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect x="2" y="9" width="4" height="12"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                          </svg>
                          <span>LinkedIn</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
