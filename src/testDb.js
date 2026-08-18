import { neon } from '@neondatabase/serverless';

const NEON_CONNECTION_STRING = 'postgresql://neondb_owner:npg_GrYel5Hs8DUy@ep-shy-waterfall-acbpx9qg-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require';

async function testConnection() {
  console.log("🔄 Conectando a Neon PostgreSQL...");
  const sql = neon(NEON_CONNECTION_STRING);

  try {
    // 1. Check version
    const versionRes = await sql`SELECT version();`;
    console.log("✅ Conexión exitosa a PostgreSQL:", versionRes[0].version);

    // 2. Create tables
    console.log("🔄 Creando tablas...");
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

    await sql`
      CREATE TABLE IF NOT EXISTS team_members (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        photo_url TEXT,
        occupations TEXT[],
        bio TEXT,
        whatsapp VARCHAR(50),
        github TEXT,
        linkedin TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

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

    await sql`
      CREATE TABLE IF NOT EXISTS email_settings (
        key VARCHAR(50) PRIMARY KEY,
        notification_emails TEXT NOT NULL,
        enable_auto_reply BOOLEAN DEFAULT true,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log("✅ Tablas creadas/verificadas correctamente.");

    // 3. Clear mock/dummy data as requested by user ("si funciona quitemos esos datos de prueba")
    console.log("🔄 Limpiando datos de prueba para dejar la base de datos limpia para producción...");
    await sql`DELETE FROM projects;`;
    await sql`DELETE FROM contact_inquiries;`;

    // Verify projects count
    const countRes = await sql`SELECT count(*) FROM projects;`;
    console.log(`✅ Base de datos limpia. Proyectos actuales en PostgreSQL: ${countRes[0].count}`);

    return true;
  } catch (error) {
    console.error("❌ Error en la conexión a PostgreSQL:", error);
    return false;
  }
}

testConnection();
