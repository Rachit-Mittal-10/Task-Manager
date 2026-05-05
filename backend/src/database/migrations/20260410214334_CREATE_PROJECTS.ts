import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    // create the project table first
    await knex.schema.createTable("projects", (table) => {
        table.increments("id").primary();
        table.integer("user_id").unsigned().notNullable().references("id").inTable("users").onDelete("CASCADE");
        table.string("name").notNullable();
        table.text("description");
        table.timestamps(true, true);
    });
    // then add the project_id column to the tasks table
    await knex.schema.table("tasks", (table) => {
        table.integer("project_id").unsigned().references("id").inTable("projects").onDelete("CASCADE");
    });
}


export async function down(knex: Knex): Promise<void> {
    // first remove the project_id column from the tasks table
    await knex.schema.table("tasks", (table) => {
        table.dropColumn("project_id");
    });
    // then drop the projects table
    await knex.schema.dropTableIfExists("projects");
}

