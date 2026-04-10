# Knex Migrations Guide

This project uses Knex in the backend for:

- database connection configuration
- schema migrations
- seed support

The Knex configuration for this project lives in [backend/src/knexfile.ts](../backend/src/knexfile.ts).

## Where migrations live

Knex is configured to store migration files in:

- [backend/src/database/migrations](../backend/src/database/migrations)

Current examples include:

- [backend/src/database/migrations/20260304125527_CREATE_USERS.ts](../backend/src/database/migrations/20260304125527_CREATE_USERS.ts)
- [backend/src/database/migrations/20260304125636_CREATE_AUTH.ts](../backend/src/database/migrations/20260304125636_CREATE_AUTH.ts)
- [backend/src/database/migrations/20260304125724_CREATE_TASKS.ts](../backend/src/database/migrations/20260304125724_CREATE_TASKS.ts)

## Backend Knex scripts

The backend package exposes these scripts in [backend/package.json](../backend/package.json):

- `npm run migrations`
- `npm run migrate:make -- <MIGRATION_NAME>`
- `npm run migrate`
- `npm run migrate:status`
- `npm run migrate:rollback`
- `npm run migrate:rollback-all`

## Important note about where to run commands

Run the Knex commands from the backend workspace:

```bash
cd backend
```

That ensures the `src/knexfile.ts` path and backend dependencies resolve correctly.

## What each script does

### Base Knex command

```bash
npm run migrations
```

This is the raw Knex CLI entry point used by the other scripts.

In this project it resolves to a TypeScript-aware Knex invocation using `ts-node`, so Knex can load [backend/src/knexfile.ts](../backend/src/knexfile.ts) directly.

### Run all pending migrations

```bash
npm run migrate
```

This applies all pending migrations using:

- knexfile: `src/knexfile.ts`
- migration directory: `src/database/migrations`

### Check migration status

```bash
npm run migrate:status
```

Use this to see which migrations have already run and which are still pending.

### Roll back the latest batch

```bash
npm run migrate:rollback
```

This undoes the most recent migration batch.

### Roll back all migrations

```bash
npm run migrate:rollback-all
```

Use this carefully. It removes all applied migrations in reverse order.

## How to create a new migration file from the CLI

To generate a new migration file with the helper script, run:

```bash
cd backend
npm run migrate:make -- CREATE_PROJECTS
```

This expands to the Knex CLI with the correct `src/knexfile.ts` path already included.

If you want the raw Knex wrapper command, run:

```bash
cd backend
npm run migrations -- migrate:make CREATE_PROJECTS --knexfile src/knexfile.ts
```

This creates a new timestamped file in [backend/src/database/migrations](../backend/src/database/migrations) with a name similar to:

```text
20260411123000_CREATE_PROJECTS.ts
```

## Recommended naming convention

Use clear, action-oriented names such as:

- `CREATE_PROJECTS`
- `ADD_PRIORITY_TO_TASKS`
- `CREATE_TAGS_TABLE`
- `ALTER_USERS_ADD_TIMEZONE`

This matches the style already present in the project.

## Example: create a migration for a `projects` table

Generate it:

```bash
cd backend
npm run migrate:make -- CREATE_PROJECTS
```

Then edit the generated file in [backend/src/database/migrations](../backend/src/database/migrations) so it looks something like this:

```ts
import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("projects", (table) => {
        table.increments("id").primary();
        table.integer("user_id").unsigned().notNullable();
        table.string("name").notNullable();
        table.text("description");
        table.timestamps(true, true);

        table
            .foreign("user_id")
            .references("id")
            .inTable("users")
            .onDelete("CASCADE");
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("projects");
}
```

Then apply it:

```bash
cd backend
npm run migrate
```

## Migration file structure

Each migration file exports two functions:

- `up`: apply the schema change
- `down`: undo the schema change

Example pattern:

```ts
import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    // apply schema change
}

export async function down(knex: Knex): Promise<void> {
    // undo schema change
}
```

## What the knexfile controls

The project Knex config in [backend/src/knexfile.ts](../backend/src/knexfile.ts) defines:

- MySQL client: `mysql2`
- connection values from environment variables
- migration directory
- seed directory
- TypeScript extensions to load
- connection pool settings

Relevant environment variables include:

- `DATABASE_HOST`
- `DATABASE_PORT`
- `DATABASE_USER`
- `DATABASE_PASSWORD`
- `DATABASE_NAME`

These are loaded from the project root `.env` file.

## Common migration workflow in this project

### 1. Generate a migration

```bash
cd backend
npm run migrate:make -- CREATE_PROJECTS
```

### 2. Edit the generated file

Add the `up` and `down` schema logic.

### 3. Run migrations

```bash
npm run migrate
```

### 4. Check status

```bash
npm run migrate:status
```

### 5. Roll back if needed

```bash
npm run migrate:rollback
```

## Direct Knex CLI alternative

If you want to call the Knex CLI command directly through the existing wrapper, this is the underlying pattern:

```bash
cd backend
npm run migrations -- <knex-command> --knexfile src/knexfile.ts
```

Examples:

```bash
npm run migrations -- migrate:make ADD_STATUS_TO_PROJECTS --knexfile src/knexfile.ts
npm run migrations -- migrate:latest --knexfile src/knexfile.ts
npm run migrations -- migrate:status --knexfile src/knexfile.ts
```

## Good migration practices

- Keep one migration focused on one schema change
- Always implement both `up` and `down`
- Use clear, stable table and column names
- Avoid editing old migrations that may already be applied in another environment
- Create a new migration for every schema change instead of modifying old history
- Test rollbacks for important changes

## When to create a new migration

Create a new migration when you need to:

- add a new table
- alter an existing table
- add or remove indexes
- add foreign keys
- rename columns or tables
- change nullability or defaults

## Seeds

This project also has a seeds directory configured in [backend/src/knexfile.ts](../backend/src/knexfile.ts):

- [backend/src/database/seeds](../backend/src/database/seeds)

If you later want seed documentation too, it can be added in the same style.
