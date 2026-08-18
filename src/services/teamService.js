import { sql, initDatabase } from './neonDb';
import { INITIAL_TEAM } from '../data/initialTeam';

const TEAM_STORAGE_KEY = 'twincode_team_cache';

class TeamService {
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

  async getMembers() {
    try {
      await this.init();
      const rows = await sql`
        SELECT id, name, photo_url as "photoUrl", occupations, bio, whatsapp, email, website, github, linkedin, created_at as "createdAt"
        FROM team_members
        ORDER BY created_at ASC;
      `;
      if (rows && rows.length > 0) {
        localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(rows));
        return rows;
      }
    } catch (e) {
      console.warn("PostgreSQL team read failed, fallback to cache:", e);
    }

    const cached = localStorage.getItem(TEAM_STORAGE_KEY);
    return cached ? JSON.parse(cached) : INITIAL_TEAM;
  }

  async createMember(member) {
    const id = `member-${Date.now()}`;
    const newMember = {
      id,
      name: member.name,
      photoUrl: member.photoUrl || '',
      occupations: member.occupations || ['Ingeniero de Software'],
      bio: member.bio || '',
      whatsapp: member.whatsapp ? member.whatsapp.trim() : null,
      email: member.email ? member.email.trim() : null,
      website: member.website ? member.website.trim() : null,
      github: member.github ? member.github.trim() : null,
      linkedin: member.linkedin ? member.linkedin.trim() : null,
      createdAt: new Date().toISOString()
    };

    try {
      await this.init();
      await sql`
        INSERT INTO team_members (id, name, photo_url, occupations, bio, whatsapp, email, website, github, linkedin)
        VALUES (${newMember.id}, ${newMember.name}, ${newMember.photoUrl}, ${newMember.occupations}, ${newMember.bio}, ${newMember.whatsapp}, ${newMember.email}, ${newMember.website}, ${newMember.github}, ${newMember.linkedin});
      `;
    } catch (e) {
      console.error("Error creating team member in PostgreSQL:", e);
    }

    const current = await this.getMembers();
    localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify([newMember, ...current.filter(m => m.id !== id)]));
    return newMember;
  }

  async updateMember(id, updatedFields) {
    const cleanData = {
      name: updatedFields.name,
      photoUrl: updatedFields.photoUrl || '',
      occupations: updatedFields.occupations || ['Ingeniero de Software'],
      bio: updatedFields.bio || '',
      whatsapp: updatedFields.whatsapp ? updatedFields.whatsapp.trim() : null,
      email: updatedFields.email ? updatedFields.email.trim() : null,
      website: updatedFields.website ? updatedFields.website.trim() : null,
      github: updatedFields.github ? updatedFields.github.trim() : null,
      linkedin: updatedFields.linkedin ? updatedFields.linkedin.trim() : null
    };

    try {
      await this.init();
      await sql`
        UPDATE team_members
        SET name = ${cleanData.name},
            photo_url = ${cleanData.photoUrl},
            occupations = ${cleanData.occupations},
            bio = ${cleanData.bio},
            whatsapp = ${cleanData.whatsapp},
            email = ${cleanData.email},
            website = ${cleanData.website},
            github = ${cleanData.github},
            linkedin = ${cleanData.linkedin},
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id};
      `;
    } catch (e) {
      console.error("Error updating team member in PostgreSQL:", e);
    }

    const current = await this.getMembers();
    const updated = current.map(m => m.id === id ? { ...m, ...cleanData } : m);
    localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(updated));
    return { id, ...cleanData };
  }

  async deleteMember(id) {
    try {
      await this.init();
      await sql`DELETE FROM team_members WHERE id = ${id};`;
    } catch (e) {
      console.error("Error deleting team member in PostgreSQL:", e);
    }

    const current = await this.getMembers();
    const filtered = current.filter(m => m.id !== id);
    localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(filtered));
    return true;
  }

  async resetToDefaults() {
    try {
      await this.init();
      await sql`DELETE FROM team_members;`;
      for (const m of INITIAL_TEAM) {
        await sql`
          INSERT INTO team_members (id, name, photo_url, occupations, bio, whatsapp, email, website, github, linkedin)
          VALUES (${m.id}, ${m.name}, ${m.photoUrl}, ${m.occupations}, ${m.bio}, ${m.whatsapp || null}, ${m.email || null}, ${m.website || null}, ${m.github || null}, ${m.linkedin || null});
        `;
      }
    } catch (e) {
      console.error("Error resetting team in PostgreSQL:", e);
    }
    localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(INITIAL_TEAM));
    return INITIAL_TEAM;
  }
}

export const teamService = new TeamService();
