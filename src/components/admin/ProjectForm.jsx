import React, { useState, useEffect, useRef } from 'react';
import { Upload, Image as ImageIcon, Trash2, Check, ExternalLink } from 'lucide-react';

export default function ProjectForm({ project, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [category, setCategory] = useState('Software a Medida & Plataformas Web');
  const [description, setDescription] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [status, setStatus] = useState('Published');

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (project) {
      setTitle(project.title || '');
      setClient(project.client || '');
      setCategory(project.category || 'Software a Medida & Plataformas Web');
      setDescription(project.description || '');
      setLiveUrl(project.liveUrl || '');
      setImageUrl(project.imageUrl || '');
      setTags(project.tags ? project.tags.join(', ') : '');
      setYear(project.year || new Date().getFullYear().toString());
      setStatus(project.status || 'Published');
    }
  }, [project]);

  // Handle local image file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        alert("El archivo es demasiado grande. Selecciona una imagen menor a 8MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagArray = tags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    onSave({
      title,
      client,
      category,
      description,
      liveUrl,
      imageUrl,
      tags: tagArray.length > 0 ? tagArray : ['React', 'PostgreSQL'],
      year,
      status,
      featured: true
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Title and Client */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px'
      }}>
        <div>
          <label style={{
            display: 'block',
            fontSize: '12px',
            color: 'var(--color-smoke)',
            marginBottom: '8px',
            textTransform: 'uppercase'
          }}>
            Título del Proyecto *
          </label>
          <input
            type="text"
            required
            placeholder="Ej. Sistema de Automatización de Operaciones"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="hyper-input"
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            fontSize: '12px',
            color: 'var(--color-smoke)',
            marginBottom: '8px',
            textTransform: 'uppercase'
          }}>
            Cliente / Empresa
          </label>
          <input
            type="text"
            placeholder="Ej. Logix Global Logistics"
            value={client}
            onChange={e => setClient(e.target.value)}
            className="hyper-input"
          />
        </div>
      </div>

      {/* Category and Year */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px'
      }}>
        <div>
          <label style={{
            display: 'block',
            fontSize: '12px',
            color: 'var(--color-smoke)',
            marginBottom: '8px',
            textTransform: 'uppercase'
          }}>
            Categoría *
          </label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="hyper-select"
          >
            <option value="Software a Medida & Plataformas Web">Software a Medida & Plataformas Web</option>
            <option value="Automatización & Bots / RPA">Automatización & Bots / RPA</option>
            <option value="Sistemas de Gestión & ERPs">Sistemas de Gestión & ERPs</option>
            <option value="Bases de Datos & Arquitectura PostgreSQL">Bases de Datos & Arquitectura PostgreSQL</option>
            <option value="E-Commerce & Pasarelas">E-Commerce & Pasarelas</option>
            <option value="Plataformas & Dashboards">Plataformas & Dashboards</option>
          </select>
        </div>

        <div>
          <label style={{
            display: 'block',
            fontSize: '12px',
            color: 'var(--color-smoke)',
            marginBottom: '8px',
            textTransform: 'uppercase'
          }}>
            Año de Lanzamiento
          </label>
          <input
            type="text"
            placeholder="2026"
            value={year}
            onChange={e => setYear(e.target.value)}
            className="hyper-input"
          />
        </div>
      </div>

      {/* File Upload for Project Screenshot */}
      <div>
        <label style={{
          display: 'block',
          fontSize: '12px',
          color: 'var(--color-smoke)',
          marginBottom: '8px',
          textTransform: 'uppercase'
        }}>
          Captura / Imagen del Proyecto (Subir Archivo) *
        </label>

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        {imageUrl ? (
          <div style={{
            position: 'relative',
            borderRadius: 'var(--radius-apple-sm)',
            overflow: 'hidden',
            border: '1px solid var(--color-border-subtle)',
            backgroundColor: '#0a0a0c',
            height: '200px'
          }}>
            <img
              src={imageUrl}
              alt="Preview"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              bottom: '12px',
              right: '12px',
              display: 'flex',
              gap: '8px'
            }}>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="btn-apple-secondary"
                style={{ padding: '6px 12px', fontSize: '11px', backgroundColor: 'rgba(0,0,0,0.75)' }}
              >
                Cambiar Imagen
              </button>
              <button
                type="button"
                onClick={() => setImageUrl('')}
                className="btn-apple-secondary"
                style={{ padding: '6px 12px', fontSize: '11px', color: '#ff6b6b', backgroundColor: 'rgba(0,0,0,0.75)' }}
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            style={{
              border: '2px dashed var(--color-border-subtle)',
              borderRadius: 'var(--radius-apple-sm)',
              padding: '36px 20px',
              textAlign: 'center',
              backgroundColor: '#0c0c0e',
              cursor: 'pointer',
              transition: 'border-color 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = '#ffffff'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--color-border-subtle)'}
          >
            <Upload size={28} style={{ color: 'var(--color-compass-gold)', margin: '0 auto 12px' }} />
            <p style={{ fontSize: '13px', color: '#f5f5f7', fontWeight: 500, marginBottom: '4px' }}>
              Haz clic para seleccionar o arrastra una imagen aquí
            </p>
            <span style={{ fontSize: '11px', color: 'var(--color-smoke)' }}>
              Soporta PNG, JPG, WebP o AVIF (hasta 8MB)
            </span>
          </div>
        )}
      </div>

      {/* Live URL */}
      <div>
        <label style={{
          display: 'block',
          fontSize: '12px',
          color: 'var(--color-smoke)',
          marginBottom: '8px',
          textTransform: 'uppercase'
        }}>
          Enlace a la Web / Sistema en Vivo (Opcional)
        </label>
        <div style={{ position: 'relative' }}>
          <input
            type="url"
            placeholder="https://empresa.com o https://app.cliente.com"
            value={liveUrl}
            onChange={e => setLiveUrl(e.target.value)}
            className="hyper-input"
            style={{ paddingLeft: '36px' }}
          />
          <ExternalLink size={15} style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--color-smoke)'
          }} />
        </div>
      </div>

      {/* Description */}
      <div>
        <label style={{
          display: 'block',
          fontSize: '12px',
          color: 'var(--color-smoke)',
          marginBottom: '8px',
          textTransform: 'uppercase'
        }}>
          Descripción Detallada del Proyecto *
        </label>
        <textarea
          rows={4}
          required
          placeholder="Explica qué problema resolvió este software, arquitectura técnica empleada, integraciones y resultados..."
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="hyper-textarea"
        />
      </div>

      {/* Tags */}
      <div>
        <label style={{
          display: 'block',
          fontSize: '12px',
          color: 'var(--color-smoke)',
          marginBottom: '8px',
          textTransform: 'uppercase'
        }}>
          Tecnologías / Tags (separados por coma)
        </label>
        <input
          type="text"
          placeholder="React, PostgreSQL, Node.js, Python Automations, Docker"
          value={tags}
          onChange={e => setTags(e.target.value)}
          className="hyper-input"
        />
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
          <span>{project ? 'Guardar Cambios' : 'Publicar Proyecto en PostgreSQL'}</span>
        </button>
      </div>
    </form>
  );
}
