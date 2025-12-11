import mysql from "mysql2/promise";

const connectionString = {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
};

// console.log(process.env);
// console.log(connectionString);

let conn = mysql.createPool(connectionString);

export default conn;
