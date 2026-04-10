import type { Knex } from 'knex';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// load .env from project root (one level above backend/)
dotenv.config({ path: path.resolve(__dirname, '..',"..", '.env') });


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
    directory: path.resolve(__dirname, 'database',"migrations"),
    extension: 'ts',
    loadExtensions: ['.ts'],
  },
  seeds: {
    directory: path.resolve(__dirname, 'database',"seeds"),
    extension: 'ts',
    loadExtensions: ['.ts'],
  },
  pool: {
    min: 2,
    max: 10,
  },
};

export default config;
export { config };
