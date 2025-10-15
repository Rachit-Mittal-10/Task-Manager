import { Router } from "express";
import { router as authRouter } from "#routes/authRouter.js";
import { AuthRouterInstance } from "#features/auth/Auth.js";


const publicRouter = Router();

publicRouter.use("/auth", authRouter);
// temperory router
publicRouter.use("/temp",AuthRouterInstance.router);
export {
    publicRouter
};