import { Router } from "express";
import { authenticateToken } from "#middleware/authMiddleware.js";
import { router as taskRouter } from "#routes/taskRouter.js";
import { router as dashboardRouter } from "#routes/dashboardRouter.js";
import { router as userRouter } from "#routes/userRouter.js";


const protectedRouter = Router();
//* adding the authenticate middleware 
protectedRouter.use(authenticateToken);

protectedRouter.use("/tasks", taskRouter);
protectedRouter.use("/users", userRouter);
protectedRouter.use("/dashboard", dashboardRouter);

export {
    protectedRouter
};