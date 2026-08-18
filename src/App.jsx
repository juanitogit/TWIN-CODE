import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Team from './components/Team';
import Manifesto from './components/Manifesto';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/admin/AdminPanel';
import { projectService } from './services/projectService';
import { teamService } from './services/teamService';

export default function App() {
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Load all data
  const loadData = useCallback(async () => {
    const projData = await projectService.getProjects();
    const teamData = await teamService.getMembers();
    setProjects(projData);
    setTeamMembers(teamData);
  }, []);

  useEffect(() => {
    loadData();

    // Check URL parameters for admin access (e.g. http://localhost:5173/?admin=true or #admin)
    const checkAdminUrl = () => {
      if (window.location.search.includes('admin=true') || window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    };

    checkAdminUrl();
    window.addEventListener('hashchange', checkAdminUrl);
    return () => window.removeEventListener('hashchange', checkAdminUrl);
  }, [loadData]);

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Project Actions
  const handleSaveProject = async (projectData, editingId) => {
    if (editingId) {
      await projectService.updateProject(editingId, projectData);
      showToast("Proyecto actualizado");
    } else {
      await projectService.createProject(projectData);
      showToast("Proyecto publicado");
    }
    loadData();
  };

  const handleDeleteProject = async (id) => {
    await projectService.deleteProject(id);
    showToast("Proyecto eliminado");
    loadData();
  };

  const handleResetProjectDefaults = async () => {
    await projectService.resetToDefaults();
    showToast("Proyectos restablecidos");
    loadData();
  };

  // Team Actions
  const handleSaveTeamMember = async (memberData, editingId) => {
    if (editingId) {
      await teamService.updateMember(editingId, memberData);
      showToast("Integrante actualizado");
    } else {
      await teamService.createMember(memberData);
      showToast("Integrante guardado");
    }
    loadData();
  };

  const handleDeleteTeamMember = async (id) => {
    await teamService.deleteMember(id);
    showToast("Integrante eliminado");
    loadData();
  };

  const handleResetTeamDefaults = async () => {
    await teamService.resetToDefaults();
    showToast("Equipo restablecido");
    loadData();
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000000', color: '#f5f5f7', overflowX: 'hidden' }}>
      {/* Toast Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 200,
          backgroundColor: '#ffffff',
          color: '#000000',
          padding: '10px 18px',
          borderRadius: 'var(--radius-apple-sm)',
          fontSize: '12px',
          fontWeight: 500,
          boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
          animation: 'fadeIn 0.2s ease'
        }}>
          {notification}
        </div>
      )}

      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Hero onExploreWork={() => {
          const el = document.getElementById('portfolio');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }} />
        
        <Services />
        
        <Portfolio projects={projects} />

        <Team members={teamMembers} />
        
        <Manifesto />
        
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Admin Panel Modal (Protected by Login) */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => {
          setIsAdminOpen(false);
          if (window.location.search.includes('admin=true')) {
            window.history.replaceState(null, '', window.location.pathname);
          }
          if (window.location.hash === '#admin') {
            window.history.replaceState(null, '', window.location.pathname);
          }
        }}
        projects={projects}
        onSaveProject={handleSaveProject}
        onDeleteProject={handleDeleteProject}
        onResetProjectDefaults={handleResetProjectDefaults}
        teamMembers={teamMembers}
        onSaveTeamMember={handleSaveTeamMember}
        onDeleteTeamMember={handleDeleteTeamMember}
        onResetTeamDefaults={handleResetTeamDefaults}
      />
    </div>
  );
}
