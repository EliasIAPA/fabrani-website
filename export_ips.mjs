import 'dotenv/config';
import mysql from 'mysql2/promise';
import { writeFileSync } from 'fs';

const DB_URL = process.env.DATABASE_URL;

if (!DB_URL) {
  console.error('DATABASE_URL não encontrada');
  process.exit(1);
}

// Parse da URL MySQL
function parseDbUrl(url) {
  const match = url.match(/mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/([^?]+)(\?.*)?/);
  if (!match) throw new Error('URL inválida: ' + url);
  return {
    user: match[1],
    password: match[2],
    host: match[3],
    port: parseInt(match[4]),
    database: match[5],
    ssl: { rejectUnauthorized: true }
  };
}

async function main() {
  const config = parseDbUrl(DB_URL);
  console.log(`Conectando a ${config.host}:${config.port}/${config.database}...`);

  const conn = await mysql.createConnection(config);
  console.log('Conectado com sucesso!');

  // Últimos 7 dias
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const dateStr = sevenDaysAgo.toISOString().slice(0, 19).replace('T', ' ');

  console.log(`Buscando registros desde: ${dateStr}`);

  // Query 1: Todos os registros de lead_submissions (página /mec e /mec/saude)
  const [submissions] = await conn.execute(`
    SELECT 
      id,
      ip,
      fingerprint,
      page,
      userAgent,
      leadName,
      leadEmail,
      leadPhone,
      city,
      region,
      country,
      lat,
      lon,
      isp,
      isSuspicious,
      createdAt
    FROM lead_submissions
    WHERE createdAt >= ?
    ORDER BY createdAt DESC
  `, [dateStr]);

  console.log(`Total de registros encontrados: ${submissions.length}`);

  // Query 2: IPs bloqueados
  const [blocked] = await conn.execute(`
    SELECT ip, reason, totalSubmissions, blockedBy, isActive, createdAt
    FROM blocked_ips
    ORDER BY createdAt DESC
  `);

  console.log(`IPs bloqueados: ${blocked.length}`);

  // Query 3: Resumo por IP (últimos 7 dias)
  const [summary] = await conn.execute(`
    SELECT 
      ip,
      COUNT(*) as total_submissoes,
      MAX(createdAt) as ultima_submissao,
      MIN(createdAt) as primeira_submissao,
      GROUP_CONCAT(DISTINCT page SEPARATOR ', ') as paginas,
      MAX(city) as cidade,
      MAX(region) as estado,
      MAX(country) as pais,
      MAX(isp) as isp,
      MAX(leadName) as ultimo_nome,
      MAX(leadEmail) as ultimo_email,
      MAX(leadPhone) as ultimo_telefone,
      MAX(isSuspicious) as suspeito
    FROM lead_submissions
    WHERE createdAt >= ?
    GROUP BY ip
    ORDER BY total_submissoes DESC
  `, [dateStr]);

  console.log(`IPs únicos: ${summary.length}`);

  await conn.end();

  // Salvar dados em JSON para processamento Python
  const output = {
    exportedAt: new Date().toISOString(),
    period: `Últimos 7 dias (desde ${dateStr})`,
    submissions: submissions,
    blockedIps: blocked,
    summary: summary
  };

  writeFileSync('/home/ubuntu/ips_data.json', JSON.stringify(output, null, 2));
  console.log('Dados salvos em /home/ubuntu/ips_data.json');
}

main().catch(err => {
  console.error('Erro:', err.message);
  process.exit(1);
});
