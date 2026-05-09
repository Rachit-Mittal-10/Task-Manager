import { BaseController } from "#core/controllers/BaseController.js";
import type { DashboardService } from "../services/DashboardService.js";
import type { NextFunction, Request, Response } from "express";

export class DashboardController extends BaseController<DashboardService> {
    constructor(service: DashboardService) {
        super(service);
    }
    public async getDashboard(request: Request, response: Response, next: NextFunction) {
        const context = await this.getContext(request);
        try {
            const dashboardData = await this.service.getDashboardData(context);
            response.status(200).json(dashboardData);
        } catch (error) {
            next(error);
        }
    }
    public async getContext(request: Request) {
        // Extract user information from request if needed
        const user_id = request.user.user_id || null; // Assuming authentication middleware sets request.user
        return { user_id };
    }
}