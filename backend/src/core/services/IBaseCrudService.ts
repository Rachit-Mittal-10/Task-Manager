import { IData } from "#common/types/IData.js";
import { WriteOutput, ReadOutput } from "#core/repository/IQueryOutput.js";

export interface IBaseCrudService {
    create(data: IData): Promise<WriteOutput>;
    get(id: number): Promise<ReadOutput>;
    getAll(): Promise<ReadOutput>;
    update(id: number, data:IData): Promise<WriteOutput>;
    remove(id: number): Promise<ReadOutput>;
}