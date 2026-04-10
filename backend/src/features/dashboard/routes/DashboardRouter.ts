import { BaseRouter } from "#core/routes/BaseRouter.js";
import type { DashboardController } from "../controllers/DashboardController.js";

/**
 * @swagger
 * tags:
 *   - name: Dashboard
 *     description: Aggregated dashboard metrics
 */

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Fetch dashboard summary metrics for the authenticated user
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DashboardResponse'
 *       500:
 *         description: Failed to fetch dashboard data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

export class DashboardRouter extends BaseRouter<DashboardController> {
    constructor(controller: DashboardController) {
        super(controller);
        this.registerRoute("get", "/", "getDashboard");
    }
}
