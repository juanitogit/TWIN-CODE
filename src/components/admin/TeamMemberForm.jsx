import React, { useState, useEffect, useRef } from 'react';
import { Upload, Plus, Trash2, Check, MessageSquare, Mail, Globe } from 'lucide-react';

export default function TeamMemberForm({ member, onSave, onCancel }) {
  const [name, setName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [occupations, setOccupations] = useState(['Principal Fullstack Engineer']);
  const [bio, setBio] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');

  const photoFileInputRef = useRef(null);

  useEffect(() => {
    if (member) {
      setName(member.name || '');
      setPhotoUrl(member.photoUrl || '');
      setOccupations(member.occupations && member.occupations.length > 0 ? member.occupations : ['Fullstack Engineer']);
      setBio(member.bio || '');
      setWhatsapp(member.whatsapp || '');
      setEmail(member.email || '');
      setWebsite(member.website || '');
      setGithub(member.github || '');
      setLinkedin(member.linkedin || '');
    }
  }, [member]);

  // Handle local photo file upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        alert("El archivo es demasiado grande. Selecciona una imagen menor a 8MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddOccupation = () => {
    setOccupations([...occupations, '']);
  };

  const handleOccupationChange = (index, value) => {
    const next = [...occupations];
    next[index] = value;
    setOccupations(next);
  };

  const handleRemoveOccupation = (index) => {
    if (occupations.length === 1) {
      setOccupations(['']);
      return;
    }
    setOccupations(occupations.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanOccupations = occupations
      .map(o => o.trim())
      .filter(Boolean);

    onSave({
      name,
      photoUrl,
      occupations: cleanOccupations.length > 0 ? cleanOccupations : ['Ingeniero de Software'],
      bio,
      whatsapp: whatsapp.trim() || null,
      email: email.trim() || null,
      website: website.trim() || null,
      github: github.trim() || null,
      linkedin: linkedin.trim() || null
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Name */}
      <div>
        <label style={{
          display: 'block',
          fontSize: '12px',
          color: 'var(--color-smoke)',
          marginBottom: '8px',
          textTransform: 'uppercase'
        }}>
          Nombre Completo *
        </label>
        <input
          type="text"
          required
          placeholder="Ej. Alexandre Torres"
          value={name}
          onChange={e => setName(e.target.value)}
          className="hyper-input"
        />
      </div>

      {/* Photo File Upload */}
      <div>
        <label style={{
          display: 'block',
          fontSize: '12px',
          color: 'var(--color-smoke)',
          marginBottom: '8px',
          textTransform: 'uppercase'
        }}>
          Foto del Integrante (Subir Archivo) *
        </label>

        <input
          type="file"
          ref={photoFileInputRef}
          accept="image/*"
          onChange={handlePhotoChange}
          style={{ display: 'none' }}
        />

        {photoUrl ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: 'var(--radius-apple-sm)',
              overflow: 'hidden',
              border: '1px solid var(--color-border-subtle)',
              backgroundColor: '#141416'
            }}>
              <img
                src={photoUrl}
                alt="Avatar preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => photoFileInputRef.current?.click()}
                className="btn-graphite-outline"
                style={{ fontSize: '11px', padding: '6px 12px' }}
              >
                Cambiar Foto
              </button>
              <button
                type="button"
                onClick={() => setPhotoUrl('')}
                className="btn-graphite-outline"
                style={{ fontSize: '11px', padding: '6px 10px', color: '#ff6b6b' }}
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => photoFileInputRef.current?.click()}
            style={{
              border: '2px dashed var(--color-border-subtle)',
              borderRadius: 'var(--radius-apple-sm)',
              padding: '24px 20px',
              textAlign: 'center',
              backgroundColor: '#0c0c0e',
              cursor: 'pointer',
              transition: 'border-color 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = '#ffffff'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--color-border-subtle)'}
          >
            <Upload size={22} style={{ color: 'var(--color-compass-gold)', margin: '0 auto 8px' }} />
            <p style={{ fontSize: '12px', color: '#f5f5f7', fontWeight: 500, marginBottom: '2px' }}>
              Haz clic para subir foto del desarrollador
            </p>
            <span style={{ fontSize: '10px', color: 'var(--color-smoke)' }}>
              PNG, JPG o WebP
            </span>
          </div>
        )}
      </div>

      {/* Dynamic Occupations List */}
      <div style={{
        border: '1px solid var(--color-border-subtle)',
        borderRadius: 'var(--radius-apple-sm)',
        padding: '16px',
        backgroundColor: '#0c0c0e'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '12px'
        }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: 500,
              color: '#f5f5f7',
              textTransform: 'uppercase'
            }}>
              Ocupaciones & Roles
            </label>
            <span style={{ fontSize: '11px', color: 'var(--color-smoke)' }}>
              Añade tantas ocupaciones como desees con el botón [+]
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddOccupation}
            className="btn-graphite-outline"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              fontSize: '11px',
              color: '#f5f5f7',
              borderColor: 'var(--color-compass-gold)'
            }}
          >
            <Plus size={13} style={{ color: 'var(--color-compass-gold)' }} />
            <span>+ Añadir Ocupación</span>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {occupations.map((occ, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--color-smoke)',
                width: '24px'
              }}>
                #{idx + 1}
              </span>

              <input
                type="text"
                placeholder={idx === 0 ? "Ej. Principal Fullstack Engineer" : idx === 1 ? "Ej. Automatizaciones & RPA" : "Escribe otra ocupación..."}
                value={occ}
                onChange={e => handleOccupationChange(idx, e.target.value)}
                className="hyper-input"
                style={{ padding: '8px 12px', fontSize: '13px' }}
              />

              <button
                type="button"
                onClick={() => handleRemoveOccupation(idx)}
                title="Eliminar esta ocupación"
                style={{
                  padding: '8px',
                  color: 'var(--color-smoke)',
                  borderRadius: 'var(--radius-apple-sm)',
                  border: '1px solid var(--color-border-subtle)',
                  backgroundColor: 'transparent'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.borderColor = '#ff6b6b';
                  e.currentTarget.style.color = '#ff6b6b';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.borderColor = 'var(--color-border-subtle)';
                  e.currentTarget.style.color = 'var(--color-smoke)';
                }}
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bio */}
      <div>
        <label style={{
          display: 'block',
          fontSize: '12px',
          color: 'var(--color-smoke)',
          marginBottom: '8px',
          textTransform: 'uppercase'
        }}>
          Biografía / Resumen
        </label>
        <textarea
          rows={3}
          placeholder="Especialista en software a medida, automatizaciones empresariales y pipelines de datos..."
          value={bio}
          onChange={e => setBio(e.target.value)}
          className="hyper-textarea"
        />
      </div>

      {/* Optional Contact and Social Fields */}
      <div style={{
        border: '1px solid var(--color-border-subtle)',
        borderRadius: 'var(--radius-apple-sm)',
        padding: '16px',
        backgroundColor: '#0c0c0e',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
      }}>
        <span style={{ fontSize: '12px', fontWeight: 500, color: '#f5f5f7', textTransform: 'uppercase' }}>
          Canales de Contacto & Redes (Todos Opcionales)
        </span>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '14px'
        }}>
          {/* WhatsApp */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: 'var(--color-smoke)', marginBottom: '6px' }}>
              WhatsApp (Opcional)
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="+5491123456789"
                value={whatsapp}
                onChange={e => setWhatsapp(e.target.value)}
                className="hyper-input"
                style={{ paddingLeft: '34px', fontSize: '13px' }}
              />
              <MessageSquare size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#25d366' }} />
            </div>
          </div>

          {/* Email */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: 'var(--color-smoke)', marginBottom: '6px' }}>
              Correo Directo (Opcional)
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                placeholder="dev@empresa.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="hyper-input"
                style={{ paddingLeft: '34px', fontSize: '13px' }}
              />
              <Mail size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-smoke)' }} />
            </div>
          </div>

          {/* Website */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: 'var(--color-smoke)', marginBottom: '6px' }}>
              Página Web / Portafolio (Opcional)
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="url"
                placeholder="https://portfolio.dev"
                value={website}
                onChange={e => setWebsite(e.target.value)}
                className="hyper-input"
                style={{ paddingLeft: '34px', fontSize: '13px' }}
              />
              <Globe size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-smoke)' }} />
            </div>
          </div>

          {/* GitHub */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: 'var(--color-smoke)', marginBottom: '6px' }}>
              GitHub (Opcional)
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="url"
                placeholder="https://github.com/usuario"
                value={github}
                onChange={e => setGithub(e.target.value)}
                className="hyper-input"
                style={{ paddingLeft: '34px', fontSize: '13px' }}
              />
              <div style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-smoke)', display: 'flex' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* LinkedIn */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: 'var(--color-smoke)', marginBottom: '6px' }}>
              LinkedIn (Opcional)
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="url"
                placeholder="https://linkedin.com/in/usuario"
                value={linkedin}
                onChange={e => setLinkedin(e.target.value)}
                className="hyper-input"
                style={{ paddingLeft: '34px', fontSize: '13px' }}
              />
              <div style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-smoke)', display: 'flex' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '12px',
        marginTop: '12px',
        paddingTop: '20px',
        borderTop: '1px solid var(--color-border-subtle)'
      }}>
        <button
          type="button"
          onClick={onCancel}
          className="btn-graphite-outline"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="btn-apple-primary"
          style={{ padding: '9px 20px' }}
        >
          <Check size={14} />
          <span>{member ? 'Guardar Cambios' : 'Añadir Integrante'}</span>
        </button>
      </div>
    </form>
  );
}
