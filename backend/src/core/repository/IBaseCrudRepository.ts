import { RequestContext } from "#/common/types/RequestContext.js";
import { IData } from "#common/types/IData.js";
import { IOptions } from "./BaseCrudRepository.js";

export interface IBaseCrudRepository<T> {
    create(data: IData, context?: RequestContext): Promise<number>;
    read(id?: number | undefined, context?: RequestContext): Promise<T | T[] | undefined>;
    update(id: number, data:IData, extraFilter?: IData): Promise<number>;
    remove(id: number, extraFilter?: IData): Promise<number>;
};