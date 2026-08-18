import { neon } from '@neondatabase/serverless';

const SOURCE_DB_URL = 'postgresql://neondb_owner:npg_qI0k5AufDPiE@ep-lively-king-aqy68sxu-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require';
const TARGET_DB_URL = 'postgresql://neondb_owner:npg_GrYel5Hs8DUy@ep-shy-waterfall-acbpx9qg-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require';

async function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function fetchWithRetry(fn, retries = 5, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      console.warn(`⚠️ Intento ${i + 1}/${retries} falló (${err.message}). Reintentando en ${delay}ms...`);
      if (i === retries - 1) throw err;
      await wait(delay);
    }
  }
}

async function run() {
  console.log("🔄 Iniciando migración con reintentos automáticos...");
  const sourceSql = neon(SOURCE_DB_URL);
  const targetSql = neon(TARGET_DB_URL);

  const sourceRows = await fetchWithRetry(() => sourceSql`SELECT * FROM projects ORDER BY id ASC;`);
  console.log(`📦 Se obtuvieron ${sourceRows.length} proyectos de la BD origen.`);

  // Ensure target table exists
  await fetchWithRetry(() => targetSql`
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
  `);

  let count = 0;
  for (const item of sourceRows) {
    const id = `proj-${item.id}`;
    const title = item.title || item.name || 'Proyecto';
    const client = item.client || 'Twin Code Project';
    const category = item.category || 'Software a Medida & Plataformas Web';
    const description = item.description || '';
    
    // Live web url: get from demo_link or demo_url (strictly ignore github)
    let liveUrl = item.demo_link || item.demo_url || item.live_url || item.url || '';
    if (liveUrl && (liveUrl.includes('github.com') || liveUrl.includes('gitlab.com'))) {
      liveUrl = '';
    }

    // Image url from image_urls array or image_url
    let imageUrl = '';
    if (Array.isArray(item.image_urls) && item.image_urls.length > 0) {
      imageUrl = item.image_urls[0];
    } else if (item.image_url) {
      imageUrl = item.image_url;
    }

    // Tags
    let tags = item.tags || item.technologies || ['Fullstack', 'Web & Software'];
    if (typeof tags === 'string') {
      try {
        tags = JSON.parse(tags);
      } catch {
        tags = tags.split(',').map(t => t.trim()).filter(Boolean);
      }
    }
    if (!Array.isArray(tags) || tags.length === 0) {
      tags = ['Fullstack', 'Web & Software'];
    }

    const year = item.year ? item.year.toString() : '2025';
    const status = 'Published';
    const featured = true;

    await fetchWithRetry(() => targetSql`
      INSERT INTO projects (id, title, client, category, description, live_url, image_url, tags, year, status, featured)
      VALUES (${id}, ${title}, ${client}, ${category}, ${description}, ${liveUrl}, ${imageUrl}, ${tags}, ${year}, ${status}, ${featured})
      ON CONFLICT (id) DO UPDATE
      SET title = EXCLUDED.title,
          client = EXCLUDED.client,
          category = EXCLUDED.category,
          description = EXCLUDED.description,
          live_url = EXCLUDED.live_url,
          image_url = EXCLUDED.image_url,
          tags = EXCLUDED.tags,
          year = EXCLUDED.year,
          status = EXCLUDED.status,
          featured = EXCLUDED.featured,
          updated_at = CURRENT_TIMESTAMP;
    `);
    count++;
    console.log(`  ✅ [${count}/${sourceRows.length}] "${title}" -> Web: ${liveUrl || 'Sin web pública'}`);
  }

  console.log(`\n🎉 Migración 100% exitosa. ${count} proyectos importados en Twin Code.`);
}

run().catch(console.error);
