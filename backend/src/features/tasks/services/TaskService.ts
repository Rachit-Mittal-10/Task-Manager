import { BaseCrudService } from "#core/services/BaseCrudService.js";
import { TaskModel } from "../models/TaskModel.js";
import type { TaskRepository } from "../repository/TaskRepository.js";

export class TaskService extends BaseCrudService<TaskModel, TaskRepository> {};
