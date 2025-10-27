import DashboardService from "./services/DashboardService";
import DashboardController from "./controllers/DashboardController";
import DashboardRouter from "./routes/DashboardRouter";
import { taskService } from "#features/tasks/Tasks.js";

const dashboardService = new DashboardService(dep = { "task-service" : taskService });
const dashboardController = new DashboardController(dashboardService);
const dashboardRouter = new DashboardRouter(dashboardController);

export {
    dashboardService,
    dashboardRouter
}