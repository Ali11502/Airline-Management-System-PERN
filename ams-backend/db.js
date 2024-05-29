const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Airline Management System - Database (Final)',
  password: 'admin',
  port: 5432,
});

module.exports = pool;