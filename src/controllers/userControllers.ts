import { ResultSetHeader } from "mysql2";
import db from "../config/db";
import { Request, Response } from "express";

export const getAllUsers = (req: Request, res: Response) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return res.status(500).send("Database error: " + err.message);
    }
    res.json(results);
  });
};

export const createUser = (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  db.query(
    "INSERT INTO users (username,password, email) VALUES (?, ?, ?)",
    [username, password, email],
    (err) => {
      if (err && err.code === "ER_DUP_ENTRY") {
        return res.status(400).send("User already exists");
      }
      if (err) {
        return res.status(500).send("Database error: " + err.message);
      }
      res.status(201).json({
        success: true,
        message: "User created successfully",
        user: { username, password, email },
      });
    }
  );
};

export const deleteUser = (req: Request, res: Response) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM users WHERE id = ?",
    [id],
    (err, result: ResultSetHeader) => {
      if (err) {
        return res.status(500).send("Database error: " + err.message);
      }
      if (result.affectedRows === 0) {
        return res.status(404).send("User not found");
      }
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    }
  );
};

export const updateUser = (req: Request, res: Response) => {
  const userId = req.params.id;
  const { status } = req.body;

  db.query(
    "UPDATE users SET status = ? WHERE id = ?",
    [status, userId],
    (err, result: ResultSetHeader) => {
      if (err) {
        return res.status(500).send("Database error: " + err.message);
      }
      if (result.affectedRows === 0) {
        return res.status(404).send("User not found");
      }
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        userId,
        status,
      });
    }
  );
};
