import { BaseCrudService } from "#core/services/BaseCrudService.js";
import type { TagModel } from "../models/TagModel.js";
import type { TagRepository } from "../repository/TagRepository.js";

export class TagService extends BaseCrudService<TagModel, TagRepository> {}
