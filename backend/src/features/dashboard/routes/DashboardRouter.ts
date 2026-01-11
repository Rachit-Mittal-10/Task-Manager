import { BaseRouter } from "#core/routes/BaseRouter.js";
import type DashboardController from "../controllers/DashboardController.js";

class DashboardRouter extends BaseRouter<DashboardController> {
    constructor(controller: DashboardController) {
        super(controller);
    }
}

export default DashboardRouter;
