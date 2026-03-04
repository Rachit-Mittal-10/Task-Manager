import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("tasks", (table) => {
        table.increments("id").primary();
        table.integer("user_id").unsigned().notNullable().references("id").inTable("users").onDelete("CASCADE");
        table.string("title").notNullable();
        table.text("description");
        table.enum("status", ["planned", "in_progress", "completed"]).defaultTo("planned").notNullable();
        table.enum("priority", ["low", "medium", "high","not_set"]).defaultTo("not_set").notNullable();
        table.date("start");
        table.date("end");
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("tasks");
}

