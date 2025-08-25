import express from "express";
import cors from "cors";
import { publicRouter } from "./routes/publicRouter.js";
import { protectedRouter } from "./routes/protectedRouter.js";


//* Getting the App from Express and adding cors and json middleware
const app = express();
app.use(cors());
app.use(express.json());

//* App routes
// app.use("/auth", authRouter);
// app.use("/tasks", authenticateToken, taskRouter);
// app.use("/users",authenticateToken,userRouter);
// app.use("/", authenticateToken, dashboardRouter);

app.use("/",publicRouter);
app.use("/",protectedRouter);

export default app;
