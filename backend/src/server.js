"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var node_path_1 = require("node:path");
var url_1 = require("url");
var __filename = (0, url_1.fileURLToPath)(import.meta.url);
var __dirname = node_path_1.default.dirname(__filename);
// __dirname: {PROJECT_ROOT}/backend/src/
// env file: {PROJECT_ROOT}/.env
var env = (0, dotenv_1.config)({
    path: node_path_1.default.resolve(__dirname, "..", "..", ".env"),
});
// Dynamic Import
// const { default: App } = await import("#app/App.js");
var App = (await Promise.resolve().then(function () { return require("./app/App.js"); })).default;
//* Listening on host:port
var PORT = Number(process.env.PORT);
var HOST = process.env.HOST;
App.listen(PORT, HOST, function () {
    console.log("Server is listening on ".concat(HOST, ":").concat(PORT));
});
