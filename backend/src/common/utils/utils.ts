import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { promisify } from "util";

const findRatio = (data, total) => {
    for (let obj of data) {
        obj.ratio = Math.round((obj.COUNT * 10000) / total) / 100;
    }
    return data;
};

const { customSort } = (() => {
    const statusOrder = {
        planned: 0,
        pending: 1,
        finished: 2,
    };

    const priorityOrder = {
        not_set: 0,
        low: 1,
        medium: 2,
        high: 3,
    };

    const customSort = (a, b) => {
        const status = statusOrder[a.status] - statusOrder[b.status];
        const priority = priorityOrder[a.priority] - priorityOrder[b.priority];
        if (status !== 0) {
            return status;
        }
        return priority;
    };
    return { customSort };
})();

const stripTimeFromDate = (datetime) => {
    if (!datetime) {
        return datetime;
    }
    const date = datetime.toISOString().split("T")[0];
    return date;
};

export {
    findRatio,
    customSort,
    stripTimeFromDate,
};
