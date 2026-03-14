import { StaticService } from "#core/services/StaticService.js";
import type { IData } from "#common/types/IData.js";

export class DashboardService extends StaticService {
    constructor(dep: IData = {}) {
        super(dep);
    }
}
