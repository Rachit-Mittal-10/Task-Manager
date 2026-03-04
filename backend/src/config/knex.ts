import knex from 'knex';
import type { Knex } from 'knex';
import config from 'knexfile.js';

const db = knex(config);

export default db;
