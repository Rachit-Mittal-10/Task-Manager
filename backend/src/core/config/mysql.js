import mysql from "mysql2/promise";
import { config } from "dotenv";

const env = config({
    path: "../../.env",
});

const connectionString = {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
};

let conn = mysql.createPool(connectionString);


export default conn;
