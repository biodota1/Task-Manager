import express from "express";
import {
  getAllTasks,
  getUserTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../controllers/taskControllers";

const taskRouter = express.Router();

taskRouter.get("/tasks", getAllTasks);
taskRouter.get("/tasks/user/:userId", getUserTasks);
taskRouter.post("/tasks", createTask);
taskRouter.delete("/tasks/:id", deleteTask);
taskRouter.put("/tasks/:id", updateTask);

export default taskRouter;
