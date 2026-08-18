import { neon } from '@neondatabase/serverless';

const TARGET_DB_URL = 'postgresql://neondb_owner:npg_GrYel5Hs8DUy@ep-shy-waterfall-acbpx9qg-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require';

async function cleanDuplicates() {
  const sql = neon(TARGET_DB_URL);
  
  // Keep only distinct projects by title
  await sql`
    DELETE FROM projects a USING projects b
    WHERE a.ctid < b.ctid AND a.title = b.title;
  `;

  const remaining = await sql`SELECT count(*) FROM projects;`;
  console.log(`✅ Base de datos limpia sin duplicados. Proyectos únicos: ${remaining[0].count}`);
}

cleanDuplicates().catch(console.error);
