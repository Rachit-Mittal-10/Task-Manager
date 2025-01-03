import { Task } from "../models/Task.js";
import { findRatio } from "../utils/utils.js";

const getDashboard = async (req, res) => {
    const userId = req.user.id;
    try {
        const totalCount = await Task.getTotalCount(userId);
        let countStatusresult = await Task.getCountByStatus(userId);
        let timeLapsedResult = await Task.getTimelapse(userId);
        countStatusresult = findRatio(countStatusresult, totalCount);
        res.status(200).json({
            message: "Data Fetched Successfully",
            totalCount,
            timeLapsedResult,
            countStatusresult,
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "Data Fetch is unsuccessful",
        });
    }
};

export {
    getDashboard,
};
