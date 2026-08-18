import { neon } from '@neondatabase/serverless';

const SOURCE_DB_URL = 'postgresql://neondb_owner:npg_qI0k5AufDPiE@ep-lively-king-aqy68sxu-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require';

async function inspectMore() {
  const sql = neon(SOURCE_DB_URL);
  try {
    const social = await sql`SELECT * FROM social_links;`;
    console.log("social_links:", JSON.stringify(social, null, 2));

    const certs = await sql`SELECT * FROM certificates;`;
    console.log("certificates:", JSON.stringify(certs, null, 2));

    const profile = await sql`SELECT * FROM profile;`;
    console.log("profile full:", JSON.stringify(profile, null, 2));
  } catch (err) {
    console.error("Error inspecting:", err);
  }
}

inspectMore();
