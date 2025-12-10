import BaseController from "./BaseController.js";

class BaseCrudController extends BaseController {
    constructor(service) {
        super(service);
    }
    async create(request, response) {
        const data = request.body;
        try {
            const result = await this.service.create(data);
            response.status(201).json({
                ok: true,
                data: result,
            });
        } catch (error) {
            response.status(500).json({
                ok: false,
                error: error.message,
            });
        }
    }
    async get(request, response) {
        const id = request.params.id;
        try {
            const result = await this.service.get(id);
            response.status(200).json({
                ok: true,
                data: result,
            });
        } catch (error) {
            response.status(500).json({
                ok: false,
                error: error.message,
            });
        }
    }
    async getAll(request, response) {
        try {
            const result = await this.service.getAll();
            response.status(200).json({
                ok: true,
                data: result,
            });
        } catch (error) {
            response.status(500).json({
                ok: false,
                error: error.message,
            });
        }
    }
    async update(request, response) {
        const id = request.params.id;
        const data = request.body;
        try {
            const result = await this.service.update(id, data);
            response.status(200).json({
                ok: true,
                data: result,
            });
        } catch (error) {
            response.status(500).json({
                ok: false,
                error: error.message,
            });
        }
    }
    async delete(request, response) {
        const id = request.params.id;
        try {
            const result = await this.service.remove(id);
            response.status(204).json({
                ok: true,
            });
        } catch (error) {
            response.status(500).json({
                ok: true,
                error: error.message,
            });
        }
    }
}

export default BaseCrudController;
