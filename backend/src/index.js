import express from "express";
import { config } from "dotenv";
import conn from "./config/mysql.js";

const env = config({
    path: "./.env"
});

const app = express();



const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`);
});
