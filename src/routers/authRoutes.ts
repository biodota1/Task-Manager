import express from "express";
import { loginUser, dashboard } from "../controllers/authControllers";

const authRouter = express.Router();

authRouter.post("/login", loginUser);
authRouter.get("/dashboard", dashboard);

export default authRouter;
