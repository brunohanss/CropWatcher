import { Pool } from 'https://deno.land/x/postgres@v0.17.0/mod.ts';

class Database {
  private pool: Pool;

  constructor() {
    this.pool = new Pool(
      {
        // tls: { enabled: false },
        database: 'postgres',
        hostname: Deno.env.get('DB_HOSTNAME'),
        user: Deno.env.get('DB_USER'),
        port: 6543,
        password: Deno.env.get('DB_PASSWORD'),
      },
      1
    );
  }

  async connect() {
    return await this.pool.connect();
  }

  async fetchAllData() {
    const connection = await this.connect();
    try {
      const query = `
      SELECT 
    s.*,
    se."id" AS "se_id", se."idealTemp" AS "se_idealTemp", se."deathByColdTemp" AS "se_deathByColdTemp",
    se."deathByWarmTemp" AS "se_deathByWarmTemp", se."lightOrigin" AS "se_lightOrigin",
    se."periodTimeIn" AS "se_periodTimeIn", se."periodTimeOut" AS "se_periodTimeOut",
    se."possibleMonths" AS "se_possibleMonths", se."phIn" AS "se_phIn", se."phOut" AS "se_phOut",
    se."lightReduction" AS "se_lightReduction", se."organicNeed" AS "se_organicNeed",
    se."waterNeed" AS "se_waterNeed", se."seedDepthIn" AS "se_seedDepthIn",
    se."seedDepthOut" AS "se_seedDepthOut", se."createdAt" AS "se_createdAt",
    se."updatedAt" AS "se_updatedAt", se."soilNeed" AS "se_soilNeed", se."daysCount" AS "se_daysCount",
    
    g."id" AS "gr_id", g."idealTemp" AS "gr_idealTemp", g."deathByColdTemp" AS "gr_deathByColdTemp",
    g."deathByWarmTemp" AS "gr_deathByWarmTemp", g."lightOrigin" AS "gr_lightOrigin",
    g."periodTimeIn" AS "gr_periodTimeIn", g."periodTimeOut" AS "gr_periodTimeOut",
    g."possibleMonths" AS "gr_possibleMonths", g."phIn" AS "gr_phIn", g."phOut" AS "gr_phOut",
    g."lightReduction" AS "gr_lightReduction", g."organicNeed" AS "gr_organicNeed",
    g."waterNeed" AS "gr_waterNeed", g."seedDepthIn" AS "gr_seedDepthIn",
    g."seedDepthOut" AS "gr_seedDepthOut", g."createdAt" AS "gr_createdAt",
    g."updatedAt" AS "gr_updatedAt", g."soilNeed" AS "gr_soilNeed", g."daysCount" AS "gr_daysCount",
    
    b."id" AS "bl_id", b."idealTemp" AS "bl_idealTemp", b."deathByColdTemp" AS "bl_deathByColdTemp",
    b."deathByWarmTemp" AS "bl_deathByWarmTemp", b."lightOrigin" AS "bl_lightOrigin",
    b."periodTimeIn" AS "bl_periodTimeIn", b."periodTimeOut" AS "bl_periodTimeOut",
    b."possibleMonths" AS "bl_possibleMonths", b."phIn" AS "bl_phIn", b."phOut" AS "bl_phOut",
    b."lightReduction" AS "bl_lightReduction", b."organicNeed" AS "bl_organicNeed",
    b."waterNeed" AS "bl_waterNeed", b."seedDepthIn" AS "bl_seedDepthIn",
    b."seedDepthOut" AS "bl_seedDepthOut", b."createdAt" AS "bl_createdAt",
    b."updatedAt" AS "bl_updatedAt", b."soilNeed" AS "bl_soilNeed", b."daysCount" AS "bl_daysCount"
FROM 
    public."Seed" s
    LEFT JOIN public."Seedling" se ON s."id" = se."seedId"
    LEFT JOIN public."Growing" g ON s."id" = g."seedId"
    LEFT JOIN public."Blooming" b ON s."id" = b."seedId"
      `;
      const result = await connection.queryObject(query);
      return result.rows;
    } finally {
      connection.release();
    }
  }

  async analyzeData() {
    // Fetch all seed data with joined information from other stages
    const allData = await this.fetchAllData();
    // Here, you can add more logic to process this data as needed for analysis
    return allData;  // Placeholder for further processing
  }
}

// Setting up the server to handle requests
Deno.serve(async (req) => {
  if (req.method === 'GET' && req.url.includes('/analyze')) {
    const db = new Database();
    try {
      const analysisResult = await db.analyzeData();
      const response = JSON.stringify(analysisResult, null, 2);
      return new Response(response, {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
    } catch (error) {
      console.error(error);
      return new Response(String(error?.message ?? error), { status: 500 });
    }
  } else {
    return new Response('Not Found', { status: 404 });
  }
});