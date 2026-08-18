import React, { useState, useEffect } from 'react';
import {
  FolderGit2,
  Users,
  Mail,
  BarChart3,
  LogOut,
  ExternalLink,
  Plus,
  CheckCircle2,
  Layers
} from 'lucide-react';
import ProjectList from './ProjectList';
import ProjectForm from './ProjectForm';
import TeamList from './TeamList';
import TeamMemberForm from './TeamMemberForm';
import EmailSettings from './EmailSettings';
import AdminLogin from './AdminLogin';
import { emailService } from '../../services/emailService';

export default function AdminPanel({
  isOpen,
  onClose,
  projects,
  onSaveProject,
  onDeleteProject,
  onResetProjectDefaults,
  teamMembers,
  onSaveTeamMember,
  onDeleteTeamMember,
  onResetTeamDefaults
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('twincode_admin_session') === 'true';
  });

  const [activeTab, setActiveTab] = useState('DASHBOARD'); // 'DASHBOARD' | 'PROJECTS' | 'TEAM' | 'EMAILS'
  const [projectView, setProjectView] = useState('LIST'); // 'LIST' | 'FORM'
  const [editingProject, setEditingProject] = useState(null);

  const [teamView, setTeamView] = useState('LIST'); // 'LIST' | 'FORM'
  const [editingMember, setEditingMember] = useState(null);

  const [inboxMessages, setInboxMessages] = useState([]);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      setInboxMessages(emailService.getMessages());
    }
  }, [isOpen, isAuthenticated]);

  if (!isOpen) return null;

  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={() => setIsAuthenticated(true)}
        onClose={onClose}
      />
    );
  }

  const handleLogout = () => {
    sessionStorage.removeItem('twincode_admin_session');
    setIsAuthenticated(false);
    onClose();
  };

  // Project handlers
  const handleNewProject = () => {
    setEditingProject(null);
    setProjectView('FORM');
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setProjectView('FORM');
  };

  const handleProjectSave = (projectData) => {
    onSaveProject(projectData, editingProject ? editingProject.id : null);
    setProjectView('LIST');
    setEditingProject(null);
  };

  // Team handlers
  const handleNewMember = () => {
    setEditingMember(null);
    setTeamView('FORM');
  };

  const handleEditMember = (member) => {
    setEditingMember(member);
    setTeamView('FORM');
  };

  const handleTeamMemberSave = (memberData) => {
    onSaveTeamMember(memberData, editingMember ? editingMember.id : null);
    setTeamView('LIST');
    setEditingMember(null);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 90,
      backgroundColor: '#000000',
      color: '#f5f5f7',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      fontFamily: 'var(--font-sf)'
    }}>
      {/* Top Apple Navigation Bar */}
      <header style={{
        height: '60px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        backgroundColor: '#0a0a0c',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        flexShrink: 0
      }}>
        {/* Left: Perfectly aligned Brand + Console Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', lineHeight: 1 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ display: 'block', flexShrink: 0, verticalAlign: 'middle' }}>
            <rect x="3" y="8.5" width="7" height="7" rx="1.2" transform="rotate(45 3 8.5)" stroke="#8e8e93" strokeWidth="1.8" fill="none" />
            <rect x="10.5" y="8.5" width="7" height="7" rx="1.2" transform="rotate(45 10.5 8.5)" stroke="#ffffff" strokeWidth="1.8" fill="none" />
          </svg>

          <span style={{
            fontSize: '17px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            color: '#ffffff',
            textTransform: 'uppercase',
            display: 'inline-block',
            lineHeight: 1,
            verticalAlign: 'middle'
          }}>
            TWIN CODE
          </span>

          <span style={{
            fontSize: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            color: 'var(--color-compass-gold)',
            padding: '3px 8px',
            borderRadius: 'var(--radius-apple-sm)',
            fontWeight: 600,
            letterSpacing: '0.04em',
            display: 'inline-block',
            marginLeft: '4px'
          }}>
            ADMIN
          </span>
        </div>

        {/* Right: Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={onClose}
            className="btn-apple-secondary"
            style={{ padding: '6px 12px', fontSize: '11px' }}
          >
            <span>Ver Web</span>
            <ExternalLink size={12} />
          </button>

          <button
            onClick={handleLogout}
            title="Cerrar Sesión"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '6px 10px',
              fontSize: '11px',
              color: '#ff6b6b',
              backgroundColor: 'rgba(255, 107, 107, 0.08)',
              border: '1px solid rgba(255, 107, 107, 0.2)',
              borderRadius: 'var(--radius-apple-sm)',
              cursor: 'pointer'
            }}
          >
            <LogOut size={12} />
            <span className="hide-on-mobile">Salir</span>
          </button>
        </div>
      </header>

      {/* Main Admin Layout: Sidebar/Mobile Tabs + Content */}
      <div className="admin-body-layout" style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        {/* Navigation Sidebar (Desktop) / Top Tabs (Mobile) */}
        <aside className="admin-sidebar" style={{
          width: '230px',
          backgroundColor: '#060608',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '20px 12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexShrink: 0
        }}>
          <div className="admin-nav-tabs" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span className="sidebar-section-title" style={{ fontSize: '10px', color: '#6e6e73', padding: '0 10px 8px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
              Módulos
            </span>

            <button
              onClick={() => setActiveTab('DASHBOARD')}
              className={`admin-tab-btn ${activeTab === 'DASHBOARD' ? 'active' : ''}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 12px',
                borderRadius: 'var(--radius-apple-sm)',
                fontSize: '13px',
                fontWeight: activeTab === 'DASHBOARD' ? 600 : 400,
                color: activeTab === 'DASHBOARD' ? '#ffffff' : 'var(--color-smoke)',
                backgroundColor: activeTab === 'DASHBOARD' ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                textAlign: 'left'
              }}
            >
              <BarChart3 size={15} style={{ color: activeTab === 'DASHBOARD' ? 'var(--color-compass-gold)' : 'inherit' }} />
              <span>Resumen</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('PROJECTS');
                setProjectView('LIST');
              }}
              className={`admin-tab-btn ${activeTab === 'PROJECTS' ? 'active' : ''}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '9px 12px',
                borderRadius: 'var(--radius-apple-sm)',
                fontSize: '13px',
                fontWeight: activeTab === 'PROJECTS' ? 600 : 400,
                color: activeTab === 'PROJECTS' ? '#ffffff' : 'var(--color-smoke)',
                backgroundColor: activeTab === 'PROJECTS' ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FolderGit2 size={15} style={{ color: activeTab === 'PROJECTS' ? 'var(--color-compass-gold)' : 'inherit' }} />
                <span>Proyectos</span>
              </div>
              <span style={{ fontSize: '10px', color: '#8e8e93', backgroundColor: 'rgba(255,255,255,0.06)', padding: '1px 6px', borderRadius: '4px' }}>
                {projects.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('TEAM');
                setTeamView('LIST');
              }}
              className={`admin-tab-btn ${activeTab === 'TEAM' ? 'active' : ''}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '9px 12px',
                borderRadius: 'var(--radius-apple-sm)',
                fontSize: '13px',
                fontWeight: activeTab === 'TEAM' ? 600 : 400,
                color: activeTab === 'TEAM' ? '#ffffff' : 'var(--color-smoke)',
                backgroundColor: activeTab === 'TEAM' ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Users size={15} style={{ color: activeTab === 'TEAM' ? 'var(--color-compass-gold)' : 'inherit' }} />
                <span>Equipo</span>
              </div>
              <span style={{ fontSize: '10px', color: '#8e8e93', backgroundColor: 'rgba(255,255,255,0.06)', padding: '1px 6px', borderRadius: '4px' }}>
                {teamMembers.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('EMAILS')}
              className={`admin-tab-btn ${activeTab === 'EMAILS' ? 'active' : ''}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 12px',
                borderRadius: 'var(--radius-apple-sm)',
                fontSize: '13px',
                fontWeight: activeTab === 'EMAILS' ? 600 : 400,
                color: activeTab === 'EMAILS' ? '#ffffff' : 'var(--color-smoke)',
                backgroundColor: activeTab === 'EMAILS' ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                textAlign: 'left'
              }}
            >
              <Mail size={15} style={{ color: activeTab === 'EMAILS' ? 'var(--color-compass-gold)' : 'inherit' }} />
              <span>Notificaciones</span>
            </button>
          </div>

          {/* Sidebar Footer */}
          <div className="sidebar-footer-box" style={{
            padding: '12px',
            backgroundColor: '#0c0c0e',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: 'var(--radius-apple-sm)',
            fontSize: '11px',
            color: '#6e6e73'
          }}>
            <p style={{ color: '#ffffff', fontWeight: 500, marginBottom: '2px' }}>Twin Code Engine</p>
            <p style={{ fontSize: '10px' }}>Sesión activa</p>
          </div>
        </aside>

        {/* Admin Content Area */}
        <main style={{
          flexGrow: 1,
          backgroundColor: '#000000',
          overflowY: 'auto',
          padding: '24px 28px'
        }} className="admin-main-content">
          {/* TAB 1: DASHBOARD METRICS */}
          {activeTab === 'DASHBOARD' && (
            <div className="animate-fade-in-up">
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#ffffff', marginBottom: '4px' }}>
                  Panel de Control
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--color-smoke)' }}>
                  Gestión y control de proyectos, desarrolladores y notificaciones.
                </p>
              </div>

              {/* Metric Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '14px',
                marginBottom: '28px'
              }}>
                <div style={{
                  backgroundColor: '#0a0a0c',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 'var(--radius-apple-md)',
                  padding: '20px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--color-smoke)', textTransform: 'uppercase' }}>Proyectos Activos</span>
                    <FolderGit2 size={16} style={{ color: 'var(--color-compass-gold)' }} />
                  </div>
                  <span style={{ fontSize: '28px', fontWeight: 700, color: '#ffffff' }}>{projects.length}</span>
                </div>

                <div style={{
                  backgroundColor: '#0a0a0c',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 'var(--radius-apple-md)',
                  padding: '20px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--color-smoke)', textTransform: 'uppercase' }}>Integrantes Equipo</span>
                    <Users size={16} style={{ color: 'var(--color-compass-gold)' }} />
                  </div>
                  <span style={{ fontSize: '28px', fontWeight: 700, color: '#ffffff' }}>{teamMembers.length}</span>
                </div>

                <div style={{
                  backgroundColor: '#0a0a0c',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 'var(--radius-apple-md)',
                  padding: '20px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--color-smoke)', textTransform: 'uppercase' }}>Solicitudes Recibidas</span>
                    <Mail size={16} style={{ color: 'var(--color-compass-gold)' }} />
                  </div>
                  <span style={{ fontSize: '28px', fontWeight: 700, color: '#ffffff' }}>{inboxMessages.length}</span>
                </div>

                <div style={{
                  backgroundColor: '#0a0a0c',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 'var(--radius-apple-md)',
                  padding: '20px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--color-smoke)', textTransform: 'uppercase' }}>Servidor SMTP</span>
                    <CheckCircle2 size={16} style={{ color: 'var(--color-pulse-green)' }} />
                  </div>
                  <span style={{ fontSize: '15px', fontWeight: 600, color: '#30d158', marginTop: '6px', display: 'block' }}>Activo (Gmail)</span>
                </div>
              </div>

              {/* Actions & Recent List */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div style={{
                  backgroundColor: '#0a0a0c',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 'var(--radius-apple-md)',
                  padding: '22px'
                }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', marginBottom: '14px' }}>
                    Acciones
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button
                      onClick={() => {
                        setActiveTab('PROJECTS');
                        handleNewProject();
                      }}
                      className="btn-apple-primary"
                      style={{ width: '100%', justifyContent: 'flex-start', padding: '10px 16px', fontSize: '12px' }}
                    >
                      <Plus size={14} />
                      <span>Publicar Nuevo Proyecto</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('TEAM');
                        handleNewMember();
                      }}
                      className="btn-apple-secondary"
                      style={{ width: '100%', justifyContent: 'flex-start', padding: '10px 16px', fontSize: '12px' }}
                    >
                      <Plus size={14} />
                      <span>Añadir Desarrollador</span>
                    </button>
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#0a0a0c',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 'var(--radius-apple-md)',
                  padding: '22px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff' }}>
                      Últimos Proyectos
                    </h3>
                    <button
                      onClick={() => setActiveTab('PROJECTS')}
                      style={{ fontSize: '12px', color: 'var(--color-compass-gold)' }}
                    >
                      Ver todos
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {projects.slice(0, 4).map((p) => (
                      <div
                        key={p.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 12px',
                          backgroundColor: '#121214',
                          borderRadius: 'var(--radius-apple-sm)',
                          border: '1px solid rgba(255, 255, 255, 0.05)'
                        }}
                      >
                        <span style={{ fontSize: '12px', fontWeight: 500, color: '#ffffff' }}>{p.title}</span>
                        <span style={{ fontSize: '10px', color: 'var(--color-smoke)' }}>{p.year}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS MANAGEMENT */}
          {activeTab === 'PROJECTS' && (
            <div className="animate-fade-in-up">
              {projectView === 'FORM' ? (
                <div>
                  <div style={{
                    marginBottom: '20px',
                    paddingBottom: '14px',
                    borderBottom: '1px solid var(--color-border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <h3 style={{ fontSize: '18px', color: '#ffffff', fontWeight: 600 }}>
                        {editingProject ? `Editar: ${editingProject.title}` : 'Publicar Nuevo Proyecto'}
                      </h3>
                    </div>
                    <button
                      onClick={() => setProjectView('LIST')}
                      className="btn-graphite-outline"
                      style={{ fontSize: '11px', padding: '5px 12px' }}
                    >
                      Volver
                    </button>
                  </div>

                  <ProjectForm
                    project={editingProject}
                    onSave={handleProjectSave}
                    onCancel={() => setProjectView('LIST')}
                  />
                </div>
              ) : (
                <ProjectList
                  projects={projects}
                  onNewProject={handleNewProject}
                  onEditProject={handleEditProject}
                  onDeleteProject={onDeleteProject}
                  onResetDefaults={onResetProjectDefaults}
                />
              )}
            </div>
          )}

          {/* TAB 3: TEAM MANAGEMENT */}
          {activeTab === 'TEAM' && (
            <div className="animate-fade-in-up">
              {teamView === 'FORM' ? (
                <div>
                  <div style={{
                    marginBottom: '20px',
                    paddingBottom: '14px',
                    borderBottom: '1px solid var(--color-border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <h3 style={{ fontSize: '18px', color: '#ffffff', fontWeight: 600 }}>
                        {editingMember ? `Editar: ${editingMember.name}` : 'Añadir Integrante'}
                      </h3>
                    </div>
                    <button
                      onClick={() => setTeamView('LIST')}
                      className="btn-graphite-outline"
                      style={{ fontSize: '11px', padding: '5px 12px' }}
                    >
                      Volver
                    </button>
                  </div>

                  <TeamMemberForm
                    member={editingMember}
                    onSave={handleTeamMemberSave}
                    onCancel={() => setTeamView('LIST')}
                  />
                </div>
              ) : (
                <TeamList
                  members={teamMembers}
                  onNewMember={handleNewMember}
                  onEditMember={handleEditMember}
                  onDeleteMember={onDeleteTeamMember}
                  onResetDefaults={onResetTeamDefaults}
                />
              )}
            </div>
          )}

          {/* TAB 4: EMAILS & NOTIFICATIONS */}
          {activeTab === 'EMAILS' && (
            <div className="animate-fade-in-up">
              <EmailSettings />
            </div>
          )}
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .admin-body-layout {
            flex-direction: column !important;
          }
          .admin-sidebar {
            width: 100% !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
            padding: 8px 12px !important;
            flex-direction: row !important;
            align-items: center !important;
            overflow-x: auto !important;
          }
          .admin-nav-tabs {
            flex-direction: row !important;
            gap: 6px !important;
            width: 100% !important;
            overflow-x: auto !important;
            padding-bottom: 2px !important;
          }
          .admin-tab-btn {
            padding: 6px 10px !important;
            font-size: 11px !important;
            white-space: nowrap !important;
          }
          .sidebar-section-title, .sidebar-footer-box {
            display: none !important;
          }
          .admin-main-content {
            padding: 16px !important;
          }
          .hide-on-mobile {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
