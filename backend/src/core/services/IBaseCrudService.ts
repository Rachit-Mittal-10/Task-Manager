import { IData } from "#common/types/IData.js";
import { RequestContext } from "#common/types/RequestContext.js";

export interface IBaseCrudService<T> {
    create(data: IData, context?: RequestContext): Promise<number>;
    read(id?: number | undefined, context? : RequestContext): Promise<T | T[] | undefined>;
    update(id: number, data:IData, context?: RequestContext): Promise<number>;
    remove(id: number, context?: RequestContext): Promise<number>;
}