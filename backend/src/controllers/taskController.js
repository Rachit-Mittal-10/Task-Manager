import { Task } from "../models/Task.js";


const createTask = async (req,res) => {
    const user = req.user;
    const body = req.body;
    if(!user){
        res.status(401).json({message: "User Details not available"});
    }
    if(!body || !body.title){
        res.status(404).json({message: "Invalid Data"})
    }
    try{
        await Task.create(
            user.id,
            body.title,
            body.status || 'planned',
            body.priority || 'not set',
            body.start_time || null,
            body.end_time || null,
            body.description || null
        );
        return res.status(200).json({message: "Task Created"});
    }
    catch(err){
        res.status(400).json({message: "Task could not be added. Invalid Data."})
    }
    
};

const getTasks = async (req,res) => {
    const userId = req.user.id;
    if(!userId){
        res.status(401).json({message:"No User Data."})
    }
    try{
        const results = await Task.getTasks(userId);
        return res.status(200).json({
            message: "Data Fetched Successfully",
            data: results
        });
    }
    catch(err){
        return res.status(400).json({message: "Unable to fetch data"});
    }
};

const getTask = async (req,res) => {
    const taskId = req.params.taskId;
    const userId = req.user.id;
    try{
        const results = await Task.getTask(userId,taskId);
        if(results.length === 0){
            return res.status(404).json({
                message: `No Task associated with TaskId: ${taskId}`
            });
        }
        return res.status(200).json({
            message: "Data fetched Successfully",
            data: results
        });
    }
    catch(err){
        return res.status(400).json({message: "Unable to fetch Data"});
    }
};

const getCountOfTask = async (req,res) => {
    const userId = req.user.id;
    try{
        const result = await Task.getCountOfTask(userId);
        return res.status(200).json({
            message: "Data Fetched",
            data: result
        });
    }
    catch(err){
        return res.status(400).json({
            message: "Unable to fetch Data"
        });
    }
};

const getCountByStatus = async(req, res) => {
    const userId = req.user.id;
    try{
        const results = await Task.getCountByStatus(userId);
        // console.log(results);
        return res.status(200).json({
            message: "Data fetched Successfully",
            data: results
        });
    }
    catch(err){
        res.status(400).json({
            message: "Unable to fetch Data"
        });
    }
};

export {
    createTask,
    getTasks,
    getTask,
    getCountOfTask,
    getCountByStatus
};
