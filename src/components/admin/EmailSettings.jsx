import React, { useState, useEffect } from 'react';
import { Mail, Check, AlertCircle, Trash2, Clock, User, Phone, Layers } from 'lucide-react';
import { emailService } from '../../services/emailService';

export default function EmailSettings() {
  const [notificationEmails, setNotificationEmails] = useState('');
  const [enableAutoReply, setEnableAutoReply] = useState(true);
  const [messages, setMessages] = useState([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const config = emailService.getConfig();
    setNotificationEmails(config.notificationEmails || '');
    setEnableAutoReply(config.enableAutoReply !== undefined ? config.enableAutoReply : true);
    setMessages(emailService.getMessages());
  }, []);

  const handleSaveConfig = (e) => {
    e.preventDefault();
    emailService.saveConfig({
      notificationEmails,
      enableAutoReply
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleDeleteMessage = (id) => {
    emailService.deleteMessage(id);
    setMessages(emailService.getMessages());
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Email Configuration Form */}
      <div style={{
        backgroundColor: '#0a0a0c',
        border: '1px solid var(--color-border-subtle)',
        borderRadius: 'var(--radius-apple-md)',
        padding: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Mail size={18} style={{ color: 'var(--color-compass-gold)' }} />
          <h4 style={{ fontSize: '16px', fontWeight: 500, color: '#f5f5f7' }}>
            Configuración de Notificaciones por Correo
          </h4>
        </div>

        <p style={{ fontSize: '13px', color: 'var(--color-smoke)', marginBottom: '20px', lineHeight: '1.5' }}>
          Configura los correos electrónicos donde llegarán automáticamente todas las solicitudes y formularios enviados desde la web.
        </p>

        <form onSubmit={handleSaveConfig} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '12px',
              color: 'var(--color-smoke)',
              marginBottom: '8px',
              textTransform: 'uppercase'
            }}>
              Correos Receptores (separados por coma si son varios) *
            </label>
            <input
              type="text"
              required
              placeholder="hola@twincode.studio, gerencia@tuempresa.com"
              value={notificationEmails}
              onChange={e => setNotificationEmails(e.target.value)}
              className="hyper-input"
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="checkbox"
              id="autoReply"
              checked={enableAutoReply}
              onChange={e => setEnableAutoReply(e.target.checked)}
              style={{ width: '16px', height: '16px', accentColor: 'var(--color-compass-gold)' }}
            />
            <label htmlFor="autoReply" style={{ fontSize: '13px', color: '#f5f5f7', cursor: 'pointer' }}>
              Confirmar recepción automática al cliente vía correo
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="submit" className="btn-apple-primary" style={{ padding: '8px 18px' }}>
              {saved ? (
                <>
                  <Check size={14} />
                  <span>¡Correos guardados!</span>
                </>
              ) : (
                <span>Guardar Configuración</span>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Received Inquiries Inbox */}
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}>
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 500, color: '#f5f5f7' }}>
              Bandeja de Solicitudes Recibidas ({messages.length})
            </h4>
            <span style={{ fontSize: '12px', color: 'var(--color-smoke)' }}>
              Registro histórico de solicitudes enviadas desde el formulario web
            </span>
          </div>
        </div>

        {messages.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '36px',
            border: '1px dashed var(--color-border-subtle)',
            borderRadius: 'var(--radius-apple-md)',
            backgroundColor: '#0a0a0c'
          }}>
            <p style={{ fontSize: '13px', color: 'var(--color-smoke)' }}>
              Aún no hay solicitudes recibidas en la bandeja.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  backgroundColor: '#0a0a0c',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-apple-md)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '15px', fontWeight: 500, color: '#f5f5f7' }}>
                      {msg.name}
                    </span>
                    <span style={{ fontSize: '13px', color: 'var(--color-smoke)' }}>
                      &lt;{msg.email}&gt;
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '11px', color: '#8e8e93', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} />
                      {new Date(msg.receivedAt).toLocaleString()}
                    </span>

                    <button
                      onClick={() => handleDeleteMessage(msg.id)}
                      title="Eliminar mensaje"
                      style={{ color: 'var(--color-smoke)', padding: '4px' }}
                      onMouseOver={e => e.currentTarget.style.color = '#ff6b6b'}
                      onMouseOut={e => e.currentTarget.style.color = 'var(--color-smoke)'}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: '11px',
                    padding: '2px 8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--color-border-subtle)',
                    borderRadius: 'var(--radius-apple-sm)',
                    color: 'var(--color-compass-gold)'
                  }}>
                    {msg.serviceType || 'Solución General'}
                  </span>

                  <span style={{
                    fontSize: '11px',
                    padding: '2px 8px',
                    backgroundColor: 'rgba(48, 209, 88, 0.1)',
                    border: '1px solid rgba(48, 209, 88, 0.3)',
                    borderRadius: 'var(--radius-apple-sm)',
                    color: '#30d158'
                  }}>
                    Notificado a: {msg.sentTo}
                  </span>
                </div>

                <p style={{
                  fontSize: '13px',
                  lineHeight: '1.5',
                  color: 'var(--color-smoke)',
                  backgroundColor: '#121214',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-apple-sm)'
                }}>
                  "{msg.message}"
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
