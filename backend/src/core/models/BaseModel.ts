/*
 * @file: BaseModel.js
 * @descripiton: this is the abstract class. not to be instantiated.
 */
import IBaseModel from "./IBaseModel.d.ts";

class BaseModel implements IBaseModel {
    public constructor(data:any = {}) {
        this.id = data.id ? data.id : null;
        this.created_at = data.created_at ? data.created_at : null;
        this.updated_at = data.updated_at ? data.updated_at : null;
    }
}

export default BaseModel;
