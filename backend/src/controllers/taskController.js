import { Task } from "../models/Task.js";
import { findRatio } from "../utils/utils.js";
import TaskError from "../utils/error/TaskError.js";

const createTask = async (req,res) => {
    const user = req.user;
    const body = req.body;
    //* This Would check whether req body consists the user details or not
    if(!user && !user.id){
        res.status(401).json({message: "User Details not available"});
    }
    //* This checks whether req body consists the task details or not.
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
        return res.status(400).json({message: "Task could not be added. Invalid Data."})
    }
    
};

const getTasks = async (req,res) => {
    const userId = req.user.id;
    if(!userId){
        res.status(401).json({message:"No User Data."})
    }
    try{
        const results = await Task.getTasks(userId);
        const totalCount = await Task.getTotalCount(userId);
        return res.status(200).json({
            message: "Data Fetched Successfully",
            totalCount,
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
        return res.status(200).json({
            message: "Data fetched Successfully",
            data: results
        });
    }
    catch(err){
        return res.status(400).json({
            name: err.name,
            message: err.message
        });
    }
};

const getCountInformation = async(req,res) => {
    const userId = req.user.id;
    try{
        // const result = await Task.getCountInformation(userId);
        const totalCount = await Task.getTotalCount(userId);
        let result = await Task.getCountByStatus(userId);
        result = findRatio(result,totalCount);
        res.status(200).json({
            message: "Data Fetched Successfully",
            totalCount,
            data: result
        });
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            message: "Data Fetch is unsuccessful"
        });
    }
};

const constructDataArray = (prev,curr) => {
    const updates = [];
    let temp = null;
    for(let key in curr){
        if(!prev.hasOwnProperty(key)){
            throw new TaskError("Invalid Key");
        }
        if(curr[key] !== prev[key]){
            temp = `tasks.${key} = "${curr[key]}"`;
            updates.push(temp);
        }
    }
    return updates;
};

const updateTask = async (req,res) => {
    const userId = req.user.id;
    const taskId = req.params.taskId;
    try{
        const prev = await Task.getTask(userId, taskId);
        const curr = req.body.task;
        const dataArray = constructDataArray(prev,curr);
        await Task.updateTask(userId,taskId,dataArray);
        return res.status(200).json({
            message: "Task Updated Successfully",
        });
    }
    catch(err){
        res.status(404).json({
            message: err.message
        });
    }
};

const deleteTask = async (req,res) => {
    const userId = req.user.id;
    const taskId = req.params.taskId;
    try{
        await Task.deleteTask(userId,taskId);
        res.status(200).json({
            message: "Task Deleted Successfully",
        });
    }
    catch(err){
        res.status(400).json({
            message: err.message,
            name: err.name
        });
    }

};


export {
    createTask,
    getTasks,
    getTask,
    getCountInformation,
    updateTask,
    deleteTask
};
