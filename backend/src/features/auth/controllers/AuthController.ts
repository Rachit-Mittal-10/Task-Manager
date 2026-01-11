import { BaseController } from "#core/controllers/BaseController.js";
import type { Request, Response } from "express";
import type AuthService from "../services/AuthService.js";

class AuthController extends BaseController<AuthService> {
    async login(request: Request, response: Response): Promise<Response> {
        const { username, email, password } = request.body;
        try {
            const result = await this.service.login(username, email, password);
            if (result && result.token) {
                return response.status(200).json({
                    message: "Login Successful",
                    token: result.token,
                });
            }
            return response.status(404).json({
                message: "Something went wrong",
            });
        } catch (err) {
            return response.status(401).json({
                message: "Login Failed. Invalid Credentials!!!",
            });
        }
    }
    async register(request: Request, response: Response): Promise<Response> {
        const { username, email, password, firstname } = request.body;
        try {
            const result = await this.service.register(
                username,
                email,
                password,
                firstname,
            );
            return response.status(201).json({
                result,
            });
        } catch (err) {
            return response.status(404).json({
                message: "Error Occured!!!",
            });
        }
    }
    async me(request: Request, response: Response): Promise<void> {
        const message = await this.service.me();

        response.status(200).json({
            message,
        });
    }
}

export default AuthController;
