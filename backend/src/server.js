import App from "#app/App.js";
import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// __dirname: {PROJECT_ROOT}/backend/src/
// env file: {PROJECT_ROOT}/.env
config({
    path: path.resolve(__dirname,"../../.env")
});


//* Listening on host:port
const PORT = process.env.PORT;
const HOST = process.env.HOST;
App.listen(PORT, HOST, () => {
    console.log(`Server is listening on ${HOST}:${PORT}`);
});
