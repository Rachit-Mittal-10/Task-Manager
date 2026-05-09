import { BaseController } from "#core/controllers/BaseController.js";
import type { NextFunction, Request, Response } from "express";
import type { AuthService } from "../services/AuthService.js";

export class AuthController extends BaseController<AuthService> {
    async login(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        const { username, email, password } = request.body;
        request.log.info(`Login attempt for username: ${username}, email: ${email}`);
        try {
            const context = await this.getRequestContext(request);
            const result = await this.service.login(username, email, password, context);
            if (result.token) {
                return response.status(200).json({
                    message: "Login Successful",
                    token: result.token,
                });
            }
        } catch (err) {
            next(err);
        }
    }
    async register(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        const { username, email, password, firstname, middlename, lastname, age } = request.body;
        try {
            const context = await this.getRequestContext(request);
            const result = await this.service.register({
                username,
                email,
                password,
                firstname,
                middlename,
                lastname,
                age
            }, context);
            return response.status(201).json({
                result,
            });
        } catch (err) {
            next(err);
        }
    }
}
