import { BaseCrudController } from "#core/controllers/BaseCrudController.js";
import type { TaskModel } from "../models/TaskModel.js";
import type { TaskService } from "../services/TaskService.js";
import type { Request, Response } from "express";

export class TaskController extends BaseCrudController<TaskModel, TaskService> {};
