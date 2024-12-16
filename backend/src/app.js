import express from "express";
import cors from 'cors';
import { router as authRouter } from "./routes/authRouter.js";
import { authenticateToken } from "./middleware/authMiddleware.js";
import { router as taskRouter } from "./routes/taskRouter.js";

//* Getting the App from Express and adding cors and json middleware
const app = express();
app.use(cors());
app.use(express.json());


//* App routes
app.use("/auth", authRouter);
app.use("/tasks",authenticateToken,taskRouter);


export default app;