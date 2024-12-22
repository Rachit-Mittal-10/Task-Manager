import { Router } from "express";
import { createTask, getTasks, getTask } from "../controllers/taskController.js";

const router = Router();

//* This will create the task
router.post("/",createTask);

//* This will get all the tasks
router.get("/",getTasks);

//* This will get the particular task
router.get("/:taskId", getTask);

export {
    router
};