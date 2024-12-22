import { Router } from "express";
import { createTask, getTasks, getTask, getCountInformation } from "../controllers/taskController.js";

const router = Router();

router.get("/count",getCountInformation);

//* This will get the particular task
router.get("/:taskId", getTask);

//* This will create the task
router.post("/",createTask);

//* This will get all the tasks
router.get("/",getTasks);

export {
    router
};