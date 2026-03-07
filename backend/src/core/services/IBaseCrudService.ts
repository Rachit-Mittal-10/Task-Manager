import { IData } from "#common/types/IData.js";
import type { IOptions } from "../repository/BaseCrudRepository.js";

export interface IBaseCrudService {
    create(data: IData): Promise<number>;
    get(id: number): Promise<any | undefined>;
    getAll(): Promise<any[]>;
    update(id: number, data:IData): Promise<number>;
    remove(id: number): Promise<number>;
    findBy(data: IData, options: IOptions): Promise<any[]>;
}