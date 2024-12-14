//* importing the modules
import express from "express";
import { config } from "dotenv";
import cors from 'cors';
import conn from "./config/mysql.js";

//* Reading the environment file
const env = config({
    path: "./.env"
});

//* Getting the App from Express
const app = express();
app.use(cors());
app.use(express.json());

//* Listening on port
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`);
});
