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
exports.publicRouter = void 0;
var Auth_js_1 = require("#features/auth/Auth.js");
var StaticRouter_js_1 = require("#core/routes/StaticRouter.js");
var PublicRouter = /** @class */ (function (_super) {
    __extends(PublicRouter, _super);
    function PublicRouter() {
        var _this = _super.call(this) || this;
        _this.registerRouter("/auth", Auth_js_1.authRouter.router);
        return _this;
    }
    return PublicRouter;
}(StaticRouter_js_1.default));
var publicRouterInstance = new PublicRouter();
var publicRouter = publicRouterInstance.router;
exports.publicRouter = publicRouter;
