/*
 * @file: BaseController.ts
 * @description: This is the abstract class for providing base of controller to be used by all the controllers
 */

abstract class BaseController {
    #service: any;
    public constructor(service: any) {
        if (!service) {
            throw new Error("service cannot be empty");
        }
        this.#service = service;
    }
    public get service() {
        return this.#service;
    }
}

export default BaseController;
