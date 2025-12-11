import mysql, { type Pool } from "mysql2/promise";

interface IConnectionString {
    host: string,
    port: number,
    user: string,
    password: string,
    database: string
};

const connectionString: IConnectionString = {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
};

const conn: Pool = mysql.createPool(connectionString);

export default conn;
