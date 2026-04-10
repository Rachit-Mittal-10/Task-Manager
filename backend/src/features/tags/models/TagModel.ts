import { BaseModel } from "#core/models/BaseModel.js";
import type { IBaseModel } from "#core/models/IBaseModel.js";

export interface ITagModel extends IBaseModel {
    [key: string]: unknown;
}

export class TagModel extends BaseModel implements ITagModel {
    [key: string]: unknown;

    constructor(data: ITagModel = {}) {
        super(data);
        Object.assign(this, data);
    }
}
