import { BaseRouter } from "#core/routes/BaseRouter.js";
import type { DashboardController } from "../controllers/DashboardController.js";

export class DashboardRouter extends BaseRouter<DashboardController> {
    constructor(controller: DashboardController) {
        super(controller);
        this.registerRoute("get", "/", "getDashboard");
    }
}
