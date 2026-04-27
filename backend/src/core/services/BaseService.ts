import { IData } from "#common/types/IData.js";
import { RequestContext } from "#common/types/RequestContext.js";
import type { Knex } from "knex";
import { StaticService } from "./StaticService.js";
/*
 * @file: BaseService.js
 * @description: Extends Static Service and adds the Model into class
 */
export abstract class BaseService<R> extends StaticService {
    /*
     * @private
     * @type: Object
     * @description: contains the repository object. used to talk to repository
     */
    protected readonly repository: R;
    /*
     * @constructor
     * @params: Object and Object
     */
    public constructor(repository: R, dep: IData = {}) {
        if (!repository) {
            throw new Error("Repository is mandatory");
        }
        super(dep);
        this.repository = repository;
    }

    protected getDbDependency(): Knex {
        const injectedDb = this.getDep<Knex>("db");
        if (!injectedDb) {
            throw new Error("Database dependency is missing in service");
        }

        return injectedDb;
    }

    protected async withTransaction<T>(
        operation: (context: RequestContext) => Promise<T>,
        context: RequestContext = {},
    ): Promise<T> {
        if (context.tx) {
            return operation(context);
        }

        const dbConnection = this.getDbDependency();
        return dbConnection.transaction(async (tx) => {
            const transactionalContext: RequestContext = {
                ...context,
                tx,
            };

            return operation(transactionalContext);
        });
    }
}

