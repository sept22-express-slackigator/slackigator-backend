const { Pool } = require('pg');
console.log('pool.js', process.env.DATABASE_URL);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSLMODE && { rejectUnauthorized: false },
});

pool.on('connect', () => console.info('🐘 Postgres connected'));

module.exports = pool;
