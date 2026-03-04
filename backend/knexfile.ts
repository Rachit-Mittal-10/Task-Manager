import type { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const config: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'password',
    database: process.env.DATABASE_NAME || 'task_manager',
    port: parseInt(process.env.DATABASE_PORT || '3306'),
  },
  migrations: {
    directory: './database/migrations',
    extension: 'ts',
    loadExtensions: ['.ts'],
  },
  seeds: {
    directory: './database/seeds',
    extension: 'ts',
    loadExtensions: ['.ts'],
  },
  pool: {
    min: 2,
    max: 10,
  },
};

export default config;
