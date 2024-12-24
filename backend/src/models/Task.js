import conn from "../config/mysql.js";
import TaskError from "../utils/error/TaskError.js";

class Task {
    //* Create the task associated with userId
    static create = async (userId, title, status = 'planned', priority = 'not set', start_time = null, end_time = null, description = null) => {
        const query = "INSERT INTO tasks(user_id, title, start_time, end_time, status, priority, description) VALUES(?,?,?,?,?,?,?)";
        try {
            const [result] = await conn.execute(query, [userId,title, start_time, end_time, status, priority, description]);
            // const taskId = result.insertId;
            return result;
        }
        catch (err) {
            console.log(`Error while inserting the tasks: ${err.message}`);
            throw err;
        }
    };

    static getTasks = async (userId) => {
        const query = `SELECT tasks.id, tasks.title, tasks.start_time, tasks.end_time, tasks.status, tasks.priority, tasks.description FROM tasks WHERE tasks.user_id = ?`;
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
        const query = `SELECT tasks.id, tasks.title, tasks.start_time, tasks.end_time, tasks.status, tasks.priority, tasks.description FROM tasks WHERE tasks.user_id = ? AND tasks.id = ?`;
        try {
            const [[result]] = await conn.query(query, [userId, taskId]);
            if(!result){
                throw new TaskError(`No Task Associated with this Task Id: ${taskId}`);
            }
            return result;
        }
        catch (err) {
            console.log(`Error getting the single task: ${err}`);
            throw err;
        }
    };

    static filterByPriority = async (userId, priority) => {
        const query = `SELECT tasks.id, tasks.title, tasks.start_time, tasks.end_time, tasks.status, tasks.priority, tasks.description FROM tasks WHERE tasks.user_id = ? AND tasks.priority = ?`;
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
        const query = `SELECT tasks.id, tasks.title, tasks.start_time, tasks.end_time, tasks.status, tasks.priority, tasks.description FROM tasks WHERE tasks.user_id = ? AND tasks.status = ?`;
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
        const query = ` SELECT COUNT(*) AS COUNT FROM tasks WHERE tasks.user_id = ?`;
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
        const query = `SELECT tasks.status, COUNT(*) AS COUNT FROM tasks WHERE tasks.user_id = ? GROUP BY tasks.status`;
        try{
            const [results] = await conn.query(query,[userId]);
            return results;
        }
        catch(err){
            console.log(`Error in getCountByStatus: ${err}`);
            throw err;
        }
    };

    static #constructUpdateQuery = (dataArray) => {
       const query = `UPDATE tasks SET ${dataArray.join(", ")} WHERE tasks.id = ? AND tasks.user_id = ?`;
       return query;
    };   

    static updateTask = async (userId, taskId, dataArray) => {
        if(dataArray.length == 0){
            throw new DataError("Column Data not provided");
        }
        try{
            const query = Task.#constructUpdateQuery(dataArray);
            const [result] = await conn.query(query,[taskId,userId]);
        }
        catch(err){
            console.log(err.message);
            throw err;
        }
    };

    static deleteTask = async (userId, taskId) => {
        const query = `DELETE FROM tasks WHERE tasks.id = ? AND tasks.user_id = ?`;
        try{
            const [result] = await conn.query(query,[taskId,userId]);
        }
        catch(err){
            console.log(`Error in Task.deleteTask: ${err}`);
        }
    };
};

export {
    Task
};
