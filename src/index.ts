import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import session from "express-session";

import db from "./config/db";
import taskRouter from "./routers/taskRoutes";
import userRouter from "./routers/userRoutes";
import authRouter from "./routers/authRoutes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.get("/create-task", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "./src/views", "create-task.html"));
});

app.get("/delete-task", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "./src/views", "delete-task.html"));
});

app.use("/api", taskRouter);
app.use("/api", userRouter);
app.use("/api", authRouter);

app.get("/login-page", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "./src/views", "login.html"));
});

app.get("/register-page", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "./src/views", "register.html"));
});

db.connect((err: any) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to the database successfully.");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
