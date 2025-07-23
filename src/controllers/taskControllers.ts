import { ResultSetHeader } from "mysql2";
import db from "../config/db";
import { Request, Response } from "express";

export const getAllTasks = (req: Request, res: Response) => {
  const sql = `
    SELECT tasks.id AS taskId, tasks.subject, tasks.description, users.username
    FROM tasks
    JOIN users ON tasks.userId = users.id
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json({ success: true, tasks: results });
  });
};

export const getUserTasks = (req: Request, res: Response) => {
  const userId = req.session.userId;

  db.query("SELECT * FROM tasks WHERE userId = ?", [userId], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
};

export const createTask = (req: Request, res: Response) => {
  const { userId, subject, description, due_date } = req.body;
  const status = "in progess";
  db.query(
    "INSERT INTO tasks (userId,subject, description, status, due_date) VALUES (?, ?, ?, ?, ?)",
    [userId, subject, description, status, due_date],
    (err) => {
      if (err) {
        return res.status(500).send("Database error: " + err.message);
      }
      res.status(201).json({
        success: true,
        message: "Task created successfully",
        task: { userId, subject, description, status, due_date },
      });
    }
  );
};

export const deleteTask = (req: Request, res: Response) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM tasks WHERE id = ?",
    [id],
    (err, result: ResultSetHeader) => {
      if (err) {
        return res.status(500).send("Database error: " + err.message);
      }
      if (result.affectedRows === 0) {
        return res.status(404).send("Task not found");
      }
      res.status(200).json({
        success: true,
        message: "Task deleted successfully",
      });
    }
  );
};

export const updateTask = (req: Request, res: Response) => {
  const taskId = req.params.id;
  const { status } = req.body;

  db.query(
    "UPDATE tasks SET status = ? WHERE id = ?",
    [status, taskId],
    (err, result: ResultSetHeader) => {
      if (err) {
        return res.status(500).send("Database error: " + err.message);
      }
      if (result.affectedRows === 0) {
        return res.status(404).send("Task not found");
      }
      res.status(200).json({
        success: true,
        message: "Task updated successfully",
        taskId,
        status,
      });
    }
  );
};
