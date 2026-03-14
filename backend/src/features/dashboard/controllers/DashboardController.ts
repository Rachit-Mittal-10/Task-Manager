import { BaseController } from "#core/controllers/BaseController.js";
import type { DashboardService } from "../services/DashboardService.js";

export class DashboardController extends BaseController<DashboardService> {
    constructor(service: DashboardService) {
        super(service);
    }
}
