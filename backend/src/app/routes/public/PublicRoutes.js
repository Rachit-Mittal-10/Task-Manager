import { Router } from "express";
import { router as authRouter } from "#routes/authRouter.js";


const publicRouter = Router();

publicRouter.use("/auth", authRouter);

export {
    publicRouter
};