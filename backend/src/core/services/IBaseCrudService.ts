import { IData } from "#common/types/IData.js";
import type { IOptions } from "../repository/BaseCrudRepository.js";

export interface IBaseCrudService<T> {
    create(data: IData): Promise<number>;
    read(id?: number | undefined, filters?:IData | undefined, options?: IOptions): Promise<T | T[] | undefined>;
    update(id: number, data:IData): Promise<number>;
    remove(id: number): Promise<number>;
}