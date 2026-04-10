import { BaseCrudRouter } from "#core/routes/BaseCrudRouter.js";
import type { TagController } from "../controllers/TagController.js";

export class TagRouter extends BaseCrudRouter<TagController> {
    constructor(controller: TagController) {
        super(controller);
    }
}
