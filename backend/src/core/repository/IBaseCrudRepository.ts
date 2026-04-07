import { IData } from "#common/types/IData.js";
import { IOptions } from "./BaseCrudRepository.js";

export interface IBaseCrudRepository<T> {
    create(data: IData): Promise<number>;
    read(id?: number | undefined,filters?:IData | undefined, options?: IOptions, context?: IData): Promise<T | T[] | undefined>;
    update(id: number, data:IData, extraFilter?: IData): Promise<number>;
    remove(id: number, extraFilter?: IData): Promise<number>;
};