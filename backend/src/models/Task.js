import conn from "../config/mysql.js";

class Task{
    //* Create the task associated with userId
    static create = async  (userId, title, status='planned', priority='not set', start_time=null, end_time=null, description=null) => {
        const query = "INSERT INTO tasks(title, start_time, end_time, status, priority, description) VALUES(?,?,?,?,?,?)";
        const query_map = "INSERT INTO mapping VALUES(?,?)";
        if(!userId){
            console.log("UserId not provided.");
            return;
        }
        try{
            const [result] = await conn.execute(query,[title, start_time, end_time,status,priority,description]);
            const taskId = result.insertId;
            const [mapResult] = await conn.execute(query_map,[userId,taskId]);
        }
        catch(err){
            console.log(`Error while inserting the tasks: ${err}`);
            throw err;
        }
    };

    static getAllTask = async (userId) => {
        const query = `SELECT tasks.id, tasks.title, tasks.start_time, tasks.end_time, tasks.status, tasks.priority, tasks.description FROM tasks JOIN mapping ON mapping.task_id = tasks.id WHERE mapping.user_id = ?`;
        try{
            const [results] = await conn.query(query,[userId]); 
           return results;
        }
        catch(err){
            console.log(`Error while getting all task: ${err}`);
            throw err;
        }
    };

    static getTask = async (userId, taskId) => {
        const query = `SELECT tasks.id, tasks.title, tasks.start_time, tasks.end_time, tasks.status, tasks.priority, tasks.description FROM tasks JOIN mapping ON mapping.task_id = tasks.id WHERE mapping.user_id = ? AND tasks.id = ?`;
        try{
            const [results] = await conn.query(query,[userId,taskId]);
            return results;
        }
        catch(err){
            console.log(`Error getting the single task: ${err}`);
            throw err;
        }
    };

    static filterByPriority = async (userId, priority) => {
        const query = `SELECT tasks.id, tasks.title, tasks.start_time, tasks.end_time, tasks.status, tasks.priority, tasks.description FROM tasks JOIN mapping ON mapping.task_id = tasks.id WHERE mapping.user_id = ? AND tasks.priority=?`;
        try{
            const [results] = await conn.query(query,[userId, priority]);
            return results;
        }
        catch(err){
            console.log(`Error in filterByPriority: ${err}`);
            throw err;
        }
    };
    
    static filterByStatus = async (userId, status) => {
        const query = ``;
    };
}

export {
    Task
};