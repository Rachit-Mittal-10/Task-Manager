import { Router } from "express";
import { createTask, getTasks, getTask, getCountOfTask } from "../controllers/taskController.js";

const router = Router();

//* This will create the task
router.post("/",createTask);

router.get("/count",getCountOfTask);

//* This will get all the tasks
router.get("/",getTasks);

//* This will get the particular task
router.get("/:taskId", getTask);


export {
    router
};