import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);
// __dirname: {PROJECT_ROOT}/backend/src/
// env file: {PROJECT_ROOT}/.env
const env:any = config({
    path: path.resolve(__dirname, "..", "..", ".env"),
});

// Dynamic Import
const { default: App } = await import("#app/App.js");
//* Listening on host:port
const PORT:any = process.env.PORT;
const HOST:any = process.env.HOST;
App.listen(PORT, HOST, () => {
    console.log(`Server is listening on ${HOST}:${PORT}`);
});
