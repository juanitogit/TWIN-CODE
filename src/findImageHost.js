import { neon } from '@neondatabase/serverless';

const SOURCE_DB_URL = 'postgresql://neondb_owner:npg_qI0k5AufDPiE@ep-lively-king-aqy68sxu-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require';

async function checkHosts() {
  const sql = neon(SOURCE_DB_URL);
  const rows = await sql`SELECT id, title, image_urls FROM projects;`;
  console.log("Total proyectos:", rows.length);

  const samplePath = rows[0].image_urls[0]; // e.g. /uploads/1781231225777-610771139.png
  console.log("Muestra de path de imagen:", samplePath);

  // Lista de posibles dominios base
  const candidateHosts = [
    "https://freedev.app",
    "https://api.freedev.app",
    "https://backend.freedev.app",
    "https://votacionestest.freedev.app",
    "https://portfolio-backend.onrender.com",
    "https://juanesteban.onrender.com",
    "https://portfolio-juan.onrender.com",
    "https://juanesteban-backend.onrender.com",
    "https://dev-portfolio.onrender.com",
    "https://api-portfolio.onrender.com",
    "https://portfolio-production.up.railway.app",
    "https://backend-production.up.railway.app",
    "http://localhost:5000",
    "http://localhost:3000",
    "http://localhost:8000"
  ];

  for (const host of candidateHosts) {
    try {
      const testUrl = `${host}${samplePath}`;
      const res = await fetch(testUrl, { method: 'HEAD' });
      console.log(`[${res.status}] Probando: ${testUrl}`);
      if (res.status === 200) {
        console.log(`🎉 ¡HOST ENCONTRADO!: ${host}`);
        return host;
      }
    } catch (e) {
      // ignore
    }
  }
}

checkHosts();
