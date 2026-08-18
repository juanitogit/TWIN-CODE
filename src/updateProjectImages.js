import { neon } from '@neondatabase/serverless';

const TARGET_DB_URL = 'postgresql://neondb_owner:npg_GrYel5Hs8DUy@ep-shy-waterfall-acbpx9qg-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require';

const PROJECT_IMAGE_MAP = {
  "Revista Escolar": "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80",
  "Sistema de votaciones escolares": "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1200&q=80",
  "Copycaess S.A.S": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  "El broasted del chef (prototipo para propuesta comercial)": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
  "VIANova (Version web)": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
  "VIANova(App movil)": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
  "EcoGuardian(Version web)": "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80",
  "EcoGuardian(App movil)": "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80",
  "BioSmart": "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80",
  "PAGINA CONSULTAS PRUEBAS SABER 11": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
  "AxionReality": "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1200&q=80",
  "TeamFlow": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
  "Interfaz Web con Control por Voz, Gestos y Tierra 3D": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  "Juego Hecho en roblox": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
  "Robot soccer 2024": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
  "robot soccer 2025 ": "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=1200&q=80",
  "Control de Asistencia": "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80",
  "App Movil-control remoto para Robots con ESP32": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
};

async function updateImages() {
  console.log("🔄 Asignando imágenes de alta fidelidad a todos los proyectos en PostgreSQL...");
  const sql = neon(TARGET_DB_URL);

  const projects = await sql`SELECT id, title FROM projects;`;
  console.log(`Encontrados ${projects.length} proyectos.`);

  for (const p of projects) {
    const matchedImg = PROJECT_IMAGE_MAP[p.title] || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80";
    await sql`
      UPDATE projects
      SET image_url = ${matchedImg}
      WHERE id = ${p.id};
    `;
    console.log(`  ✅ Actualizada imagen para: "${p.title}"`);
  }

  console.log("🎉 Todas las imágenes de los proyectos han sido asignadas en PostgreSQL.");
}

updateImages().catch(console.error);
