/*
 * @file: BaseController.ts
 * @description: This is the abstract class for providing base of controller to be used by all the controllers
 */

export abstract class BaseController<S> {
    #service: S;
    public constructor(service: S) {
        if (!service) {
            throw new Error("service cannot be empty");
        }
        this.#service = service;
    }
    public get service(): S {
        return this.#service;
    }
}

