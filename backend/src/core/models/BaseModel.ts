/*
 * @file: BaseModel.js
 * @descripiton: this is the abstract class. not to be instantiated.
 */
import { IBaseModel } from "./IBaseModel.js";

export abstract class BaseModel implements IBaseModel {
    id: number | null;
    created_at: Date | null;
    updated_at: Date | null;
    public constructor(data:any = {}) {
        this.id = data.id ? data.id : null;
        this.created_at = data.created_at ? new Date(data.created_at) : null;
        this.updated_at = data.updated_at ? new Date(data.updated_at) : null;
    }
}