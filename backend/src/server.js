import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// __dirname: {PROJECT_ROOT}/backend/src/
// env file: {PROJECT_ROOT}/.env
const env = config({
    path: path.resolve(__dirname,"..","..",".env")
});

// console.log(env);
// console.log(`process.env in the server.js file:`);
// console.log(process.env);

// import App from "#app/App.js";
const { default: App } = await import("#app/App.js");
//* Listening on host:port
const PORT = process.env.PORT;
const HOST = process.env.HOST;
App.listen(PORT, HOST, () => {
    console.log(`Server is listening on ${HOST}:${PORT}`);
});
