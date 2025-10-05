// import app from "./app.js";
import App from "#app/index.js";
import { config } from "dotenv";

const env = config({
    path: "../.env",
});

//* Listening on host:port
const PORT = process.env.PORT;
const HOST = process.env.HOST;
App.listen(PORT, HOST, () => {
    console.log(`Server is listening on ${HOST}:${PORT}`);
});
