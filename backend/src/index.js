import express from "express";
import { config } from "dotenv";
import cors from 'cors';
import conn from "./config/mysql.js";
import { router as userRouter } from "./routes/authRouter.js";


const env = config({
    path: "./.env"
});


//* Getting the App from Express and adding cors and json middleware
const app = express();
app.use(cors());
app.use(express.json());


//* App routes
app.use("/user",userRouter);


//* Listening on port
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`);
});

// app.listen(PORT);