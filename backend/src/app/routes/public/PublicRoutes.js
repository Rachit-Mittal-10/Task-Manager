import { Router } from "express";
import { router as authRouter } from "#routes/authRouter.js";
import { authRouter as authRouter2 } from "#features/auth/Auth.js";
import { userRouter } from "#features/users/Users.js";
import { taskRouter } from "#features/tasks/Tasks.js";

const publicRouter = Router();

publicRouter.use("/auth", authRouter);
// temperory router
publicRouter.use("/temp/auth/", authRouter2.router);
publicRouter.use("/temp/users/", userRouter.router);
publicRouter.use("/temp/tasks/", taskRouter.router);


export {
    publicRouter
};