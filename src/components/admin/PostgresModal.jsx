import React, { useState, useEffect } from 'react';
import { Database, X, Check, AlertCircle } from 'lucide-react';
import { projectService } from '../../services/projectService';

export default function PostgresModal({ isOpen, onClose }) {
  const [connectionString, setConnectionString] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const config = projectService.getPostgresConfig();
      if (config) {
        setConnectionString(config.connectionString || '');
        setApiUrl(config.apiUrl || '');
      }
      setSaved(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    projectService.savePostgresConfig({
      connectionString,
      apiUrl,
      updatedAt: new Date().toISOString()
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="animate-fade-in-up" style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'var(--color-carbon)',
        border: '1px solid var(--color-graphite)',
        borderRadius: 'var(--radius-cards)',
        width: '100%',
        maxWidth: '560px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '32px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.8)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
          paddingBottom: '16px',
          borderBottom: '1px solid var(--color-graphite)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Database size={20} style={{ color: 'var(--color-compass-gold)' }} />
            <h3 style={{
              fontSize: '18px',
              fontWeight: 500,
              color: 'var(--color-chalk)'
            }}>
              Conexión a Base de Datos PostgreSQL
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{ color: 'var(--color-smoke)', padding: '4px' }}
            onMouseOver={e => e.currentTarget.style.color = 'var(--color-chalk)'}
            onMouseOut={e => e.currentTarget.style.color = 'var(--color-smoke)'}
          >
            <X size={20} />
          </button>
        </div>

        {/* Info Note */}
        <div style={{
          backgroundColor: '#161616',
          border: '1px solid var(--color-graphite)',
          borderRadius: 'var(--radius-tags)',
          padding: '14px',
          marginBottom: '24px',
          display: 'flex',
          gap: '12px'
        }}>
          <AlertCircle size={18} style={{ color: 'var(--color-compass-gold)', flexShrink: 0, marginTop: '2px' }} />
          <p style={{ fontSize: '13px', lineHeight: '1.5', color: 'var(--color-smoke)' }}>
            Pega aquí el enlace de conexión de tu base de datos <strong>PostgreSQL</strong> (o tu URL de API / Supabase / Neon). Los proyectos y enlaces se sincronizarán directamente con esta base de datos.
          </p>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{
              display: 'block',
              fontFamily: 'var(--font-input)',
              fontSize: '12px',
              color: 'var(--color-smoke)',
              marginBottom: '8px',
              textTransform: 'uppercase'
            }}>
              Enlace de Conexión / Connection String PostgreSQL
            </label>
            <input
              type="text"
              placeholder="postgresql://usuario:password@host:5432/dbname"
              value={connectionString}
              onChange={e => setConnectionString(e.target.value)}
              className="hyper-input"
              style={{ fontFamily: 'var(--font-input)', fontSize: '13px' }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontFamily: 'var(--font-input)',
              fontSize: '12px',
              color: 'var(--color-smoke)',
              marginBottom: '8px',
              textTransform: 'uppercase'
            }}>
              URL de API / Backend Serverless (Opcional)
            </label>
            <input
              type="url"
              placeholder="https://api.tu-servidor.com o http://localhost:5000"
              value={apiUrl}
              onChange={e => setApiUrl(e.target.value)}
              className="hyper-input"
              style={{ fontFamily: 'var(--font-input)', fontSize: '13px' }}
            />
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '12px',
            marginTop: '12px',
            paddingTop: '20px',
            borderTop: '1px solid var(--color-graphite)'
          }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-graphite-outline"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-primary-pill"
              style={{ padding: '10px 22px' }}
            >
              {saved ? (
                <>
                  <Check size={14} />
                  <span>¡Guardado con éxito!</span>
                </>
              ) : (
                <span>Guardar Conexión</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
