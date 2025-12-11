import { config } from "dotenv";
import type { DotenvConfigOutput } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);
// __dirname: {PROJECT_ROOT}/backend/src/
// env file: {PROJECT_ROOT}/.env
const env:DotenvConfigOutput = config({
    path: path.resolve(__dirname, "..", "..", ".env"),
});

// Dynamic Import
const { default: App } = await import("#app/App.js");
//* Listening on host:port
const PORT:number = Number(process.env.PORT);
const HOST:string = process.env.HOST;
App.listen(PORT, HOST, () => {
    console.log(`Server is listening on ${HOST}:${PORT}`);
});
