import mysql from "mysql2";
import { config } from "dotenv";

const global_env = config({
    path: "../.env"
});

const connectionString = {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
}

let conn = mysql.createPool(connectionString);

// const conn = mysql.createConnection(connectionString);
// conn.connect((err)=>{
//     if(err){
//         console.log(`Error connecting to db: ${err}`);
//     }
//     else{
//         console.log(`Connected to DB with ${JSON.stringify(connectionString)}`);
//         console.log(global_env);
//     }
// });

export default conn;