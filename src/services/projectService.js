import { sql, initDatabase } from './neonDb';
import { INITIAL_PROJECTS } from '../data/initialProjects';

const STORAGE_KEY = 'twincode_projects_cache';

class ProjectService {
  constructor() {
    this.initialized = false;
    this.init();
  }

  async init() {
    if (!this.initialized) {
      await initDatabase();
      this.initialized = true;
    }
  }

  async getProjects() {
    try {
      await this.init();
      const rows = await sql`
        SELECT id, title, client, category, description, live_url as "liveUrl", image_url as "imageUrl", tags, year, status, featured, created_at as "createdAt"
        FROM projects
        ORDER BY created_at DESC;
      `;
      if (rows && rows.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
        return rows;
      }
    } catch (e) {
      console.warn("PostgreSQL read failed, using local cache:", e);
    }

    const cached = localStorage.getItem(STORAGE_KEY);
    return cached ? JSON.parse(cached) : INITIAL_PROJECTS;
  }

  async createProject(project) {
    const id = `proj-${Date.now()}`;
    const newProject = {
      id,
      title: project.title,
      client: project.client || 'Twin Code Client',
      category: project.category || 'Software a Medida',
      description: project.description || '',
      liveUrl: project.liveUrl || '',
      imageUrl: project.imageUrl || '',
      tags: project.tags || [],
      year: project.year || new Date().getFullYear().toString(),
      status: project.status || 'Published',
      featured: project.featured !== undefined ? project.featured : true,
      createdAt: new Date().toISOString()
    };

    try {
      await this.init();
      await sql`
        INSERT INTO projects (id, title, client, category, description, live_url, image_url, tags, year, status, featured)
        VALUES (${newProject.id}, ${newProject.title}, ${newProject.client}, ${newProject.category}, ${newProject.description}, ${newProject.liveUrl}, ${newProject.imageUrl}, ${newProject.tags}, ${newProject.year}, ${newProject.status}, ${newProject.featured});
      `;
    } catch (e) {
      console.error("Error creating project in PostgreSQL:", e);
    }

    // Update cache
    const current = await this.getProjects();
    localStorage.setItem(STORAGE_KEY, JSON.stringify([newProject, ...current.filter(p => p.id !== id)]));
    return newProject;
  }

  async updateProject(id, updatedFields) {
    try {
      await this.init();
      await sql`
        UPDATE projects
        SET title = ${updatedFields.title},
            client = ${updatedFields.client},
            category = ${updatedFields.category},
            description = ${updatedFields.description},
            live_url = ${updatedFields.liveUrl},
            image_url = ${updatedFields.imageUrl},
            tags = ${updatedFields.tags},
            year = ${updatedFields.year},
            status = ${updatedFields.status || 'Published'},
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id};
      `;
    } catch (e) {
      console.error("Error updating project in PostgreSQL:", e);
    }

    const current = await this.getProjects();
    const updated = current.map(p => p.id === id ? { ...p, ...updatedFields } : p);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return { id, ...updatedFields };
  }

  async deleteProject(id) {
    try {
      await this.init();
      await sql`DELETE FROM projects WHERE id = ${id};`;
    } catch (e) {
      console.error("Error deleting project in PostgreSQL:", e);
    }

    const current = await this.getProjects();
    const filtered = current.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  }

  async resetToDefaults() {
    try {
      await this.init();
      await sql`DELETE FROM projects;`;
      for (const p of INITIAL_PROJECTS) {
        await sql`
          INSERT INTO projects (id, title, client, category, description, live_url, image_url, tags, year, status, featured)
          VALUES (${p.id}, ${p.title}, ${p.client}, ${p.category}, ${p.description}, ${p.liveUrl}, ${p.imageUrl}, ${p.tags}, ${p.year}, ${p.status}, ${p.featured});
        `;
      }
    } catch (e) {
      console.error("Error resetting projects in PostgreSQL:", e);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
    return INITIAL_PROJECTS;
  }

  getPostgresConfig() {
    return { connectionString: 'postgresql://neondb_owner:npg_GrYel5Hs8DUy@ep-shy-waterfall-acbpx9qg-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require' };
  }

  savePostgresConfig() {
    return true;
  }
}

export const projectService = new ProjectService();
