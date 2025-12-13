"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var AppRoutes_js_1 = require("./routes/AppRoutes.js");
//* Getting the App from Express and adding cors and json middleware
var App = (0, express_1.default)();
App.use((0, cors_1.default)());
App.use(express_1.default.json());
//* App routes
App.use("/", AppRoutes_js_1.publicRouter);
App.use("/", AppRoutes_js_1.protectedRouter);
exports.default = App;
