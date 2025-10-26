import BaseService from "./BaseService.js";
/*
* BaseCrudService.js
* This provides the basic functionality for all the application service layers
*/
class BaseCrudService extends BaseService {
    constructor(model, dep = {}){
        if(!model){
            throw new Error("Model is mandatory!!!")
        }
        super(model,dep);
    }
    async create(data){
        if(!data || Object.keys(data).length === 0){
            throw new Error("Data is empty");
        }
        try {
            const result = await this.model.create(data);
            return result;
        }
        catch (err){
            throw err;
        }
    }
    async get(id){
        try {
            const result = await this.model.get(id);
            return result[0];
        }
        catch (err){
            throw err;
        }
    }
    async getAll(){
        try {
            const result = await this.model.getAll();
            return result;
        }
        catch (err) {
            console.log(`Err during service: ${err}`);
            throw err;
        }
    }
    async update(id,data){
        if(!data || Object.keys(data) === 0){
            throw new Error("Data is Empty");
        }
        try {
            const result = await this.model.update(id,data);
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    async remove(id){
        try {
            const result = await this.model.remove(id);
            return result;
        }
        catch (err) {
            throw err;
        }
    }
};

export default BaseCrudService;