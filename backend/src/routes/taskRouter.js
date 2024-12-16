import { Router } from "express";
import { createTask, getAllTask } from "../controllers/taskController.js";

const router = Router();

//* This will create the task
router.post("/",createTask);

//* This will get all the tasks
router.get("/",getAllTask);

router.get

export {
    router
};