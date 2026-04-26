import { StaticService } from "#core/services/StaticService.js";
import type { IData } from "#common/types/IData.js";
import { RequestContext } from "#common/types/RequestContext.js";

export class DashboardService extends StaticService {
    constructor(dep: IData = {}) {
        super(dep);
    }
    public async getDashboardData(context: RequestContext) {
        const taskService = this.getDep("task-service");
        // fetch tasks and compute dashboard data for the logged-in user
        const tasks = await taskService.read(undefined, undefined, undefined, context);
        const totalTasks = tasks.length;
        const statusCounts = tasks.reduce((acc, task) => {
            acc[task.status] = (acc[task.status] || 0) + 1;
            return acc;
        }, {});
        const priorityCounts = tasks.reduce((acc, task) => {
            acc[task.priority] = (acc[task.priority] || 0) + 1;
            return acc;
        }, {});
        return {
            totalTasks,
            statusCounts,
            priorityCounts,
        };
    }
}
