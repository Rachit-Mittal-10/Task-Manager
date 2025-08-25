import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { router as taskRouter } from "./taskRouter.js";
import { router as dashboardRouter } from "./dashboardRouter.js";
import { router as userRouter } from "./userRouter.js";


const protectedRouter = Router();
//* adding the authenticate middleware 
protectedRouter.use(authenticateToken);

protectedRouter.use("/tasks", taskRouter);
protectedRouter.use("/users", userRouter);
protectedRouter.use("/dashboard", dashboardRouter);

export {
    protectedRouter
};