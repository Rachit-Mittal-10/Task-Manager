import { BaseModel } from "#core/models/BaseModel.js";
import type { IBaseModel } from "#core/models/IBaseModel.js";

export interface IProjectModel extends IBaseModel {
    [key: string]: unknown;
}

export class ProjectModel extends BaseModel implements IProjectModel {
    [key: string]: unknown;

    constructor(data: IProjectModel = {}) {
        super(data);
        Object.assign(this, data);
    }
}
