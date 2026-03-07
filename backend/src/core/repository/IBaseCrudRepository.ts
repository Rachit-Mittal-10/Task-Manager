import { IData } from "#common/types/IData.js";
import { IOptions } from "./BaseCrudRepository.js";
import { ReadOutput, WriteOutput } from "./IQueryOutput.js";

export interface IBaseCrudRepository {
    create(data: IData): Promise<number[]>;
    get(id: number): Promise<any | undefined>;
    getAll(): Promise<any[]>;
    update(id: number, data:IData): Promise<number>;
    remove(id: number): Promise<number>;
    findBy(data: IData, options: IOptions): Promise<any[]>;
};