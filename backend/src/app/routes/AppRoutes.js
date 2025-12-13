"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRouter = exports.protectedRouter = void 0;
var ProtectedRoutes_js_1 = require("./protected/ProtectedRoutes.js");
Object.defineProperty(exports, "protectedRouter", { enumerable: true, get: function () { return ProtectedRoutes_js_1.protectedRouter; } });
var PublicRoutes_js_1 = require("./public/PublicRoutes.js");
Object.defineProperty(exports, "publicRouter", { enumerable: true, get: function () { return PublicRoutes_js_1.publicRouter; } });
