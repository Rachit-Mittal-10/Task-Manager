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
        return res.status(200).json({message: "Create Task Path accessed"});
    }
    catch(err){
        res.status(400).json({message: "Task could not be added. Invalid Data."})
    }
    
};

const getAllTask = async (req,res) => {
    const userId = req.user.id;
    if(!userId){
        res.status(401).json({message:"No User Data."})
    }
    try{
        const results = await Task.getAllTask(userId);
        return res.status(200).json({
            message: "Get All Task Path Accessed",
            data: results
        });
    }
    catch(err){
        // console.log(err);
        return res.status(400).json({message: "Unable to fetch data"});
    }
};

export {
    createTask,
    getAllTask
};