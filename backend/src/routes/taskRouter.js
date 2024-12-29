import { Router } from "express";
import {
    createTask,
    getTasks,
    getTask,
    getDashboard,
    updateTask,
    deleteTask,
    getTimeLapse,
} from "../controllers/taskController.js";

const router = Router();

router.get("/test",getTimeLapse);

router.get("/dashboard", getDashboard);

//* This will get the particular task
router.get("/:taskId", getTask);

//* This will delete the task
router.delete("/:taskId", deleteTask);

//* This will put the updated task
router.put("/:taskId", updateTask);

//* This will create the task
router.post("/", createTask);

//* This will get all the tasks
router.get("/", getTasks);


export { router };
