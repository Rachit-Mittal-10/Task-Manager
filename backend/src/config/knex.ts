import knex from 'knex';
import type { Knex } from 'knex';

const config: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'password',
    database: process.env.DATABASE_NAME || 'task_manager',
    port: parseInt(process.env.DATABASE_PORT || '3306'),
  },
  pool: {
    min: 2,
    max: 10,
  },
};

const db = knex(config);

export default db;
