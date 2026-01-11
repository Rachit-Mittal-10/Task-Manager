interface BaseModelData {
    id?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
}

/*
 * @file: BaseModel.js
 * @descripiton: this is the abstract class. not to be instantiated.
 */
export abstract class BaseModel {
    id: number | null;
    created_at: Date | null;
    updated_at: Date | null;

    public constructor(data: BaseModelData = {}) {
        this.id = data.id ?? null;
        this.created_at = data.created_at ? new Date(data.created_at) : null;
        this.updated_at = data.updated_at ? new Date(data.updated_at) : null;
    }
}