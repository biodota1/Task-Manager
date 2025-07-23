import express from "express";
import {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.get("/users", getAllUsers);
userRouter.post("/users", createUser);
userRouter.delete("/users/:id", deleteUser);
userRouter.put("/users/:id", updateUser);

export default userRouter;
