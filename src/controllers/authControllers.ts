import path from "path";
import db from "../config/db";
import { Request, Response } from "express";

export const loginUser = (req: Request, res: Response) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err: any, results: any) => {
      if (err) {
        return res.status(500).send("Database error: " + err.message);
      }
      if (!Array.isArray(results) || results.length === 0) {
        return res.status(401).send("Invalid username or password");
      }
      //   res.status(200).json({
      //     success: true,
      //     message: "Login successful",
      //     user: results[0],
      //   });

      res.sendFile(path.join(__dirname, "..", "views", "dashboard.html"));
    }
  );
};
