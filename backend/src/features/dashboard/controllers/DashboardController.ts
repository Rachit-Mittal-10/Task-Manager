import { BaseController } from "#core/controllers/BaseController.js";
import type DashboardService from "../services/DashboardService.js";

class DashboardController extends BaseController<DashboardService> {
    constructor(service: DashboardService) {
        super(service);
    }
}

export default DashboardController;
