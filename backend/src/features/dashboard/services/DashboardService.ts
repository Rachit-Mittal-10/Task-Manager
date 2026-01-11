import { StaticService } from "#core/services/StaticService.js";
import type { IData } from "#common/types/IData.js";

class DashboardService extends StaticService {
    constructor(dep: IData = {}) {
        super(dep);
    }
}

export default DashboardService;
