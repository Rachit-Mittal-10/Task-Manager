import { IData } from "#common/types/IData.js";
import { IOptions } from "./BaseCrudRepository.js";

export interface IBaseCrudRepository<T> {
    create(data: IData): Promise<number>;
    read(id?: number | undefined,filters?:IData | undefined, options?: IOptions): Promise<T | T[]>;
    update(id: number, data:IData): Promise<number>;
    remove(id: number): Promise<number>;
};