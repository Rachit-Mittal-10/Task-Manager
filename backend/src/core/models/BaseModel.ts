/*
 * @file: BaseModel.js
 * @descripiton: this is the abstract class. not to be instantiated.
 */
class BaseModel {
    constructor(data = {}) {
        this.id = data.id ? data.id : null;
        this.created_at = data.created_at ? data.created_at : null;
        this.updated_at = data.updated_at ? data.updated_at : null;
    }
}

export default BaseModel;
