import { IData } from "#common/types/IData.js";
import type { IOptions } from "../repository/BaseCrudRepository.js";

export interface IBaseCrudService {
    create(data: IData): Promise<number>;
    read(id?: number | undefined, filters?:IData | undefined, options?: IOptions): Promise<any>;
    update(id: number, data:IData): Promise<number>;
    remove(id: number): Promise<number>;
}