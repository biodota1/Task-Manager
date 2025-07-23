import express from "express";
import { loginUser } from "../controllers/authControllers";

const authRouter = express.Router();

authRouter.post("/login", loginUser);

export default authRouter;
