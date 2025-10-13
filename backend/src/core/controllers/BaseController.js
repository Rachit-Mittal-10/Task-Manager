class BaseController {
    #service;
    constructor(service){
        this.#service = service;
    }
    async get(request, response){
        const id = request.body.id;
        try {
            const result = await this.#service.get(id);
            response.status(200).json(result);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    };
    async getAll(request, response){
        try {
            const result = await this.#service.getAll();
            response.status(200).json(result);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    };
    async create(request, response){
        const data = request.body.data;
        try {
            const result = await this.#service.create(data);
            response.status(201).json(result);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    };
    async update(request, response){
        const id = request.body.id;
        const data = request.body.data;
        try {
            const result = await this.#service.update(id, data);
            response.status(200).json(result);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    };
    async delete(request, response){
        const id = request.body.id;
        try {
            const result = await this.#service.remove(id);
            response.status(200).json(result);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    };
};

export default BaseController;