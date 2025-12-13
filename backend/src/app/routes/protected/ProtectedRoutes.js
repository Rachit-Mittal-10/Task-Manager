"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedRouter = void 0;
var AuthMiddleware_js_1 = require("#features/auth/middleware/AuthMiddleware.js");
var Tasks_js_1 = require("#features/tasks/Tasks.js");
var Users_js_1 = require("#features/users/Users.js");
var StaticRouter_js_1 = require("#core/routes/StaticRouter.js");
var ProtectedRouter = /** @class */ (function (_super) {
    __extends(ProtectedRouter, _super);
    function ProtectedRouter() {
        var _this = _super.call(this) || this;
        _this.registerMiddleware(AuthMiddleware_js_1.authenticateToken)
            .registerRouter("/tasks", Tasks_js_1.taskRouter.router)
            .registerRouter("/users", Users_js_1.userRouter.router);
        return _this;
    }
    return ProtectedRouter;
}(StaticRouter_js_1.default));
var protectedRouterInstance = new ProtectedRouter();
var protectedRouter = protectedRouterInstance.router;
exports.protectedRouter = protectedRouter;
