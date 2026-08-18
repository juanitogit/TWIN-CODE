import React, { useState } from 'react';
import { Mail, KeyRound, ArrowRight, ShieldCheck, X, Eye, EyeOff } from 'lucide-react';

const ADMIN_USER = 'twin.code2026@devs.com';
const ADMIN_PASS = 'twincoders2026*';

export default function AdminLogin({ onLoginSuccess, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (email.trim().toLowerCase() === ADMIN_USER.toLowerCase() && password === ADMIN_PASS) {
        sessionStorage.setItem('twincode_admin_session', 'true');
        onLoginSuccess();
      } else {
        setError('Credenciales no válidas. Por favor verifica tus datos de acceso.');
        setLoading(false);
      }
    }, 450);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      backgroundColor: '#000000',
      backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(198, 169, 114, 0.08) 0%, rgba(0, 0, 0, 0.95) 70%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div
        className="animate-fade-in-up"
        style={{
          backgroundColor: '#0c0c0e',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: 'var(--radius-apple-lg)',
          width: '100%',
          maxWidth: '440px',
          padding: '40px 36px',
          position: 'relative',
          boxShadow: '0 32px 80px rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)'
        }}
      >
        {/* Close Button to return to public website */}
        <button
          onClick={onClose}
          title="Volver a la web"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            color: 'var(--color-smoke)',
            padding: '6px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--color-border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={e => {
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.color = 'var(--color-smoke)';
            e.currentTarget.style.borderColor = 'var(--color-border-subtle)';
          }}
        >
          <X size={16} />
        </button>

        {/* Brand Icon & Apple HIG Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          {/* Official Interlocking Diamonds Logo with Ambient Glow */}
          <div style={{
            position: 'relative',
            width: '64px',
            height: '64px',
            margin: '0 auto 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#121214',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '16px',
            boxShadow: '0 8px 30px rgba(198, 169, 114, 0.15)'
          }}>
            <svg width="34" height="34" viewBox="0 0 48 48" fill="none" style={{ display: 'block' }}>
              <rect x="7" y="17" width="18" height="18" rx="2" transform="rotate(45 7 17)" stroke="#8e8e93" strokeWidth="3.4" fill="none" />
              <rect x="23" y="17" width="18" height="18" rx="2" transform="rotate(45 23 17)" stroke="#ffffff" strokeWidth="3.4" fill="none" />
            </svg>
          </div>

          <h2 style={{
            fontSize: '22px',
            fontWeight: 600,
            letterSpacing: '0.04em',
            color: '#ffffff',
            marginBottom: '6px',
            textTransform: 'uppercase'
          }}>
            TWIN CODE
          </h2>

          <span style={{
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.12em',
            color: 'var(--color-compass-gold)',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '10px'
          }}>
            Consola de Ingeniería & Gestión
          </span>

          <p style={{ fontSize: '13px', color: 'var(--color-smoke)', lineHeight: '1.4' }}>
            Autenticación administrativa para control de proyectos y base de datos
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{
            backgroundColor: 'rgba(255, 69, 58, 0.1)',
            border: '1px solid rgba(255, 69, 58, 0.3)',
            borderRadius: 'var(--radius-apple-sm)',
            padding: '11px 14px',
            fontSize: '12px',
            color: '#ff453a',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '11px',
              fontWeight: 500,
              color: 'var(--color-smoke)',
              marginBottom: '7px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}>
              Correo de Administrador
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                required
                placeholder="admin@correo.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="hyper-input"
                style={{
                  paddingLeft: '40px',
                  fontSize: '14px',
                  backgroundColor: '#121214',
                  borderColor: 'rgba(255, 255, 255, 0.12)'
                }}
              />
              <Mail size={16} style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-smoke)'
              }} />
            </div>
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '11px',
              fontWeight: 500,
              color: 'var(--color-smoke)',
              marginBottom: '7px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}>
              Contraseña
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="hyper-input"
                style={{
                  paddingLeft: '40px',
                  paddingRight: '40px',
                  fontSize: '14px',
                  backgroundColor: '#121214',
                  borderColor: 'rgba(255, 255, 255, 0.12)'
                }}
              />
              <KeyRound size={16} style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-smoke)'
              }} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-smoke)',
                  cursor: 'pointer'
                }}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-apple-primary"
            style={{
              width: '100%',
              marginTop: '6px',
              padding: '12px 20px',
              fontSize: '13px',
              fontWeight: 600,
              backgroundColor: '#ffffff',
              color: '#000000'
            }}
          >
            <span>{loading ? 'Validando credenciales...' : 'Iniciar Sesión'}</span>
            <ArrowRight size={15} />
          </button>
        </form>

        {/* Apple Security Footer */}
        <div style={{
          marginTop: '28px',
          paddingTop: '18px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontSize: '11px',
          color: '#6e6e73'
        }}>
          <ShieldCheck size={13} style={{ color: 'var(--color-pulse-green)' }} />
          <span>Acceso seguro SSL • Neon PostgreSQL Sincronizado</span>
        </div>
      </div>
    </div>
  );
}
