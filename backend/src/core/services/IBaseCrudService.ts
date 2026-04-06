import { IData } from "#common/types/IData.js";
import type { IOptions } from "../repository/BaseCrudRepository.js";
import { RequestContext } from "#common/types/RequestContext.js";

export interface IBaseCrudService<T> {
    create(data: IData): Promise<number>;
    read(id?: number | undefined, filters?:IData | undefined, options?: IOptions): Promise<T | T[] | undefined>;
    update(id: number, data:IData, context?: RequestContext): Promise<number>;
    remove(id: number, context?: RequestContext): Promise<number>;
}