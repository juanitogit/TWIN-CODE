import { neon } from '@neondatabase/serverless';

export const NEON_CONNECTION_STRING = 'postgresql://neondb_owner:npg_GrYel5Hs8DUy@ep-shy-waterfall-acbpx9qg-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require';

// Neon HTTP SQL client
export const sql = neon(NEON_CONNECTION_STRING);

/**
 * Initializes the required PostgreSQL tables and adds any missing columns.
 */
export async function initDatabase() {
  try {
    // 1. Create Projects Table
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id VARCHAR(100) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        client VARCHAR(255),
        category VARCHAR(150),
        description TEXT,
        live_url TEXT,
        image_url TEXT,
        tags TEXT[],
        year VARCHAR(20),
        status VARCHAR(50) DEFAULT 'Published',
        featured BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 2. Create Team Members Table
    await sql`
      CREATE TABLE IF NOT EXISTS team_members (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        photo_url TEXT,
        occupations TEXT[],
        bio TEXT,
        whatsapp VARCHAR(50),
        email VARCHAR(255),
        website TEXT,
        github TEXT,
        linkedin TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Ensure email and website columns exist in team_members
    await sql`ALTER TABLE team_members ADD COLUMN IF NOT EXISTS email VARCHAR(255);`;
    await sql`ALTER TABLE team_members ADD COLUMN IF NOT EXISTS website TEXT;`;
    await sql`ALTER TABLE team_members ADD COLUMN IF NOT EXISTS whatsapp VARCHAR(50);`;

    // 3. Create Contact Inquiries Table
    await sql`
      CREATE TABLE IF NOT EXISTS contact_inquiries (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        service_type VARCHAR(150),
        message TEXT NOT NULL,
        sent_to TEXT,
        status VARCHAR(50) DEFAULT 'Nuevo',
        received_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 4. Create Email Settings Table
    await sql`
      CREATE TABLE IF NOT EXISTS email_settings (
        key VARCHAR(50) PRIMARY KEY,
        notification_emails TEXT NOT NULL,
        enable_auto_reply BOOLEAN DEFAULT true,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    return { success: true };
  } catch (error) {
    console.error("❌ Error initializing PostgreSQL tables:", error);
    return { success: false, error };
  }
}
