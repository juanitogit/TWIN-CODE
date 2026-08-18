import fs from 'fs';
import path from 'path';
import { neon } from '@neondatabase/serverless';

const SOURCE_UPLOADS_DIR = 'C:\\Users\\juan8\\Desktop\\Portfolio\\Portfolio\\uploads';
const TARGET_PUBLIC_UPLOADS = 'c:\\Users\\juan8\\Documents\\Devs\\public\\uploads';

const SOURCE_DB_URL = 'postgresql://neondb_owner:npg_qI0k5AufDPiE@ep-lively-king-aqy68sxu-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require';
const TARGET_DB_URL = 'postgresql://neondb_owner:npg_GrYel5Hs8DUy@ep-shy-waterfall-acbpx9qg-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require';

async function copyAndSync() {
  console.log("🔄 1. Creando directorio public/uploads si no existe...");
  if (!fs.existsSync(TARGET_PUBLIC_UPLOADS)) {
    fs.mkdirSync(TARGET_PUBLIC_UPLOADS, { recursive: true });
  }

  // Copiar archivos
  if (fs.existsSync(SOURCE_UPLOADS_DIR)) {
    const files = fs.readdirSync(SOURCE_UPLOADS_DIR);
    console.log(`📁 Copiando ${files.length} archivos de imágenes desde '${SOURCE_UPLOADS_DIR}' a '${TARGET_PUBLIC_UPLOADS}'...`);

    for (const f of files) {
      const srcPath = path.join(SOURCE_UPLOADS_DIR, f);
      const destPath = path.join(TARGET_PUBLIC_UPLOADS, f);
      fs.copyFileSync(srcPath, destPath);
    }
    console.log(`✅ ¡${files.length} imágenes originales copiadas exitosamente a public/uploads!`);
  } else {
    console.warn("⚠️ No se encontró el directorio origen de uploads.");
  }

  // Sincronizar en PostgreSQL
  console.log("🔄 2. Sincronizando nombres originales de imágenes en PostgreSQL...");
  const sourceSql = neon(SOURCE_DB_URL);
  const targetSql = neon(TARGET_DB_URL);

  const sourceProjects = await sourceSql`SELECT id, title, image_urls, demo_link FROM projects;`;
  console.log(`Encontrados ${sourceProjects.length} proyectos en BD origen.`);

  for (const p of sourceProjects) {
    let mainImg = '';
    if (Array.isArray(p.image_urls) && p.image_urls.length > 0) {
      mainImg = p.image_urls[0]; // e.g. /uploads/1781237965074-282520956.png
    }

    if (mainImg) {
      await targetSql`
        UPDATE projects
        SET image_url = ${mainImg}
        WHERE title = ${p.title};
      `;
      console.log(`  ✅ [${p.title}] -> imagen configurada a: ${mainImg}`);
    }
  }

  console.log("\n🎉 ¡TODAS LAS IMÁGENES REALES IMPORTADAS Y SINCRONIZADAS CON ÉXITO!");
}

copyAndSync().catch(console.error);
