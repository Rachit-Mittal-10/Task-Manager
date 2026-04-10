import { BaseCrudController } from "#core/controllers/BaseCrudController.js";
import type { TagModel } from "../models/TagModel.js";
import type { TagService } from "../services/TagService.js";

export class TagController extends BaseCrudController<TagModel, TagService> {}
