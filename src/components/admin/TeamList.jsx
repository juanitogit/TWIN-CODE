import React from 'react';
import { Edit2, Trash2, Plus, Users, RefreshCw } from 'lucide-react';

export default function TeamList({ members, onNewMember, onEditMember, onDeleteMember, onResetDefaults }) {
  return (
    <div>
      {/* Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div>
          <h4 style={{
            fontSize: '16px',
            color: 'var(--color-chalk)',
            fontWeight: 400
          }}>
            Integrantes del Equipo ({members.length})
          </h4>
          <span style={{
            fontSize: '12px',
            fontFamily: 'var(--font-input)',
            color: 'var(--color-smoke)'
          }}>
            Gestiona los miembros, roles dinámicos y perfiles mostrados en la web.
          </span>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={onResetDefaults}
            title="Restablecer integrantes demo iniciales"
            className="btn-graphite-outline"
            style={{ padding: '8px 12px', fontSize: '12px' }}
          >
            <RefreshCw size={13} />
            <span>Reset Demos</span>
          </button>

          <button
            onClick={onNewMember}
            className="btn-primary-solid"
            style={{ padding: '8px 16px', fontSize: '12px' }}
          >
            <Plus size={14} />
            <span>Añadir Integrante</span>
          </button>
        </div>
      </div>

      {/* List */}
      {members.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '48px 16px',
          border: '1px dashed var(--color-graphite)',
          borderRadius: 'var(--radius-cards)'
        }}>
          <p style={{ color: 'var(--color-smoke)', marginBottom: '16px' }}>
            No hay integrantes registrados en el equipo.
          </p>
          <button onClick={onNewMember} className="btn-primary-solid">
            Crear el primer integrante
          </button>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {members.map((member) => (
            <div
              key={member.id}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                padding: '16px 20px',
                backgroundColor: 'var(--color-carbon)',
                border: '1px solid var(--color-graphite)',
                borderRadius: 'var(--radius-cards)',
                transition: 'border-color 0.2s ease'
              }}
              onMouseOver={e => e.currentTarget.style.borderColor = 'var(--color-iron)'}
              onMouseOut={e => e.currentTarget.style.borderColor = 'var(--color-graphite)'}
            >
              {/* Avatar and info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '240px', flex: '1 1 300px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-tags)',
                  overflow: 'hidden',
                  border: '1px solid var(--color-graphite)',
                  backgroundColor: '#161616',
                  flexShrink: 0
                }}>
                  {member.photoUrl ? (
                    <img
                      src={member.photoUrl}
                      alt={member.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={e => e.currentTarget.style.display = 'none'}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-smoke)' }}>
                      <Users size={20} />
                    </div>
                  )}
                </div>

                <div>
                  <h5 style={{ fontSize: '15px', color: 'var(--color-chalk)', fontWeight: 400, marginBottom: '4px' }}>
                    {member.name}
                  </h5>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {member.occupations && member.occupations.map((occ, idx) => (
                      <span key={idx} style={{
                        fontSize: '10px',
                        fontFamily: 'var(--font-input)',
                        padding: '1px 6px',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid var(--color-graphite)',
                        borderRadius: 'var(--radius-tags)',
                        color: 'var(--color-smoke)'
                      }}>
                        {occ}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => onEditMember(member)}
                  title="Editar Integrante"
                  style={{
                    padding: '8px',
                    borderRadius: 'var(--radius-tags)',
                    border: '1px solid var(--color-graphite)',
                    color: 'var(--color-chalk)',
                    backgroundColor: 'transparent'
                  }}
                  onMouseOver={e => e.currentTarget.style.borderColor = 'var(--color-iron)'}
                  onMouseOut={e => e.currentTarget.style.borderColor = 'var(--color-graphite)'}
                >
                  <Edit2 size={14} />
                </button>

                <button
                  onClick={() => {
                    if (window.confirm(`¿Estás seguro de eliminar a "${member.name}" del equipo?`)) {
                      onDeleteMember(member.id);
                    }
                  }}
                  title="Eliminar Integrante"
                  style={{
                    padding: '8px',
                    borderRadius: 'var(--radius-tags)',
                    border: '1px solid var(--color-graphite)',
                    color: '#ff6b6b',
                    backgroundColor: 'transparent'
                  }}
                  onMouseOver={e => e.currentTarget.style.borderColor = '#ff6b6b'}
                  onMouseOut={e => e.currentTarget.style.borderColor = 'var(--color-graphite)'}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
