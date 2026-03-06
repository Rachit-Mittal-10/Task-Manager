import knex from 'knex';
import type { Knex } from 'knex';
import config from 'knexfile.js';

const db: Knex = knex(config);

export default db;
