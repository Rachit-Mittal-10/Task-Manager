import { BaseCrudRepository } from "#core/repository/BaseCrudRepository.js";
import type { Knex } from "knex";
import { TagModel } from "../models/TagModel.js";

export class TagRepository extends BaseCrudRepository<TagModel> {
    constructor(conn: Knex) {
        super("tags", conn, TagModel);
    }
    protected getOwnerColumn(): string {
        return "user_id";
    }
}
