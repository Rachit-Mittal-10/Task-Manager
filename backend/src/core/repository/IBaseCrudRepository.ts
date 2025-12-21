import { IData } from "#common/types/IData.js";
import { IOptions } from "./BaseCrudRepository.js";
import { ReadOutput, WriteOutput } from "./IQueryOutput.js";

export interface IBaseCrudRepository {
    create(data: IData): Promise<WriteOutput>;
    get(id: number): Promise<ReadOutput>;
    getAll(): Promise<ReadOutput>;
    update(id: number, data:IData): Promise<WriteOutput>;
    remove(id: number): Promise<WriteOutput>;
    findBy(data: IData, options: IOptions): Promise<ReadOutput>;
};