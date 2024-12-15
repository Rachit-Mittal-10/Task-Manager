import express from "express";
import { config } from "dotenv";
import cors from 'cors';
import { router as authRouter } from "./routes/authRouter.js";
import { authenticateToken } from "./middleware/authMiddleware.js";
import { router as taskRouter } from "./routes/taskRouter.js";

const env = config({
    path: "./.env"
});


//* Getting the App from Express and adding cors and json middleware
const app = express();
app.use(cors());
app.use(express.json());


//* App routes
app.use("/user", authRouter);
app.use("/task",authenticateToken,taskRouter);


//* Listening on port
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`);
});

// app.listen(PORT);