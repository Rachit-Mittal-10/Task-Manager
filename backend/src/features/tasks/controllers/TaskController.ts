import { BaseCrudController } from "#core/controllers/BaseCrudController.js";
import type TaskService from "../services/TaskService.js";
import type { Request, Response } from "express";

class TaskController extends BaseCrudController<TaskService> {};

export default TaskController;
