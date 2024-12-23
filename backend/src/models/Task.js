import conn from "../config/mysql.js";
import CustomError from "../utils/error/CustomError.js";
import { constructUpdateQuery  } from "../utils/utils.js";

class Task {
    //* Create the task associated with userId
    static create = async (userId, title, status = 'planned', priority = 'not set', start_time = null, end_time = null, description = null) => {
        const query = "INSERT INTO tasks(title, start_time, end_time, status, priority, description) VALUES(?,?,?,?,?,?)";
        const query_map = "INSERT INTO mapping VALUES(?,?)";
        if (!userId) {
            console.log("UserId not provided.");
            // Log("User not provided.");
            return;
        }
        try {
            const [result] = await conn.execute(query, [title, start_time, end_time, status, priority, description]);
            const taskId = result.insertId;
            const [mapResult] = await conn.execute(query_map, [userId, taskId]);
        }
        catch (err) {
            console.log(`Error while inserting the tasks: ${err}`);
            throw err;
        }
    };

    static getTasks = async (userId) => {
        const query = `SELECT tasks.id, tasks.title, tasks.start_time, tasks.end_time, tasks.status, tasks.priority, tasks.description FROM tasks JOIN mapping ON mapping.task_id = tasks.id WHERE mapping.user_id = ?`;
        try {
            const [results] = await conn.query(query, [userId]);
            return results;
    }
    catch (err) {
            console.log(`Error while getting all task: ${err}`);
            throw err;
        }
    };

    static getTask = async (userId, taskId) => {
        const query = `SELECT tasks.id, tasks.title, tasks.start_time, tasks.end_time, tasks.status, tasks.priority, tasks.description FROM tasks JOIN mapping ON mapping.task_id = tasks.id WHERE mapping.user_id = ? AND tasks.id = ?`;
        try {
            const [result] = await conn.query(query, [userId, taskId]);
            // console.log(result);
            return result;
        }
        catch (err) {
            console.log(`Error getting the single task: ${err}`);
            throw err;
        }
    };

    static filterByPriority = async (userId, priority) => {
        const query = `SELECT tasks.id, tasks.title, tasks.start_time, tasks.end_time, tasks.status, tasks.priority, tasks.description FROM tasks JOIN mapping ON mapping.task_id = tasks.id WHERE mapping.user_id = ? AND tasks.priority = ?`;
        try {
            const [results] = await conn.query(query, [userId, priority]);
            return results;
        }
        catch (err) {
            console.log(`Error in filterByPriority: ${err}`);
            throw err;
        }
    };

    static filterByStatus = async (userId, status) => {
        const query = `SELECT tasks.id, tasks.title, tasks.start_time, tasks.end_time, tasks.status, tasks.priority, tasks.description FROM tasks JOIN mapping ON mapping.task_id = tasks.id WHERE mapping.user_id = ? AND tasks.status = ?`;
        try{
            const [results] = await conn.query(query,[userId,status]);
            return results;
        }
        catch(err){
            console.log(`Error in filterByStatus: ${err}`);
            throw err;
        }
    };

    static getTotalCount = async (userId) => {
        const query = ` SELECT COUNT(*) AS COUNT FROM tasks JOIN mapping ON mapping.task_id = tasks.id WHERE mapping.user_id = ?`;
        try {
            const [result] = await conn.query(query, [userId]);
            return result[0].COUNT;
        }
        catch (err) {
            console.log(`Error in getCountOfTask: ${err}`);
            throw err;
        }
    };

    static getCountByStatus = async (userId) => {
        const query = `SELECT tasks.status, COUNT(*) AS COUNT FROM tasks JOIN mapping ON mapping.task_id = tasks.id WHERE mapping.user_id = ? GROUP BY tasks.status`;
        try{
            const [results] = await conn.query(query,[userId]);
            return results;
        }
        catch(err){
            console.log(`Error in getCountByStatus: ${err}`);
            throw err;
        }
    };
    static updateTask = async (userId, taskId, dataArray) => {
        if(dataArray.length == 0){
            throw new CustomError("Column Data not provided");
        }
        try{
            const query = constructUpdateQuery(dataArray);
            console.log(query);
        }
        catch(err){
            throw err;
        }

    }
}

export {
    Task
};
