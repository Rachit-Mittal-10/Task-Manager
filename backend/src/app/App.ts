import express, { type Express } from "express";
import cors from "cors";
import { publicRouter, protectedRouter } from "./routes/AppRoutes.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "#config/swagger.js";
import { logger } from "#config/logger.js";
import { pinoHttp } from "pino-http";

//* Getting the App from Express and adding cors and json middleware
const App: Express = express();
App.use(cors({
	origin: "*"
}));
App.use(express.json());
App.use(pinoHttp({ logger }));
App.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
App.get("/api-docs.json", (_request, response) => {
	response.json(swaggerSpec);
});

//* App routes
App.use("/", publicRouter.getRouter());
App.use("/", protectedRouter.getRouter());

export { App };
