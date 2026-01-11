import DashboardService from "./services/DashboardService.js";
import DashboardController from "./controllers/DashboardController.js";
import DashboardRouter from "./routes/DashboardRouter.js";
import { taskService } from "#features/tasks/Tasks.js";
import type { IData } from "#common/types/IData.js";

const dep: IData = { "task-service": taskService };
const dashboardService: DashboardService = new DashboardService(dep);
const dashboardController: DashboardController = new DashboardController(dashboardService);
const dashboardRouter: DashboardRouter = new DashboardRouter(dashboardController);

export { dashboardService, dashboardRouter };
