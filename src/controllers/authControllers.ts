import path from "path";
import db from "../config/db";
import { Request, Response } from "express";

declare module "express-session" {
  interface SessionData {
    userId?: number;
    username?: string;
  }
}

export const loginUser = (req: Request, res: Response) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";

  db.query(sql, [username, password], (err: any, results: any) => {
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
    req.session.userId = results[0].id;
    req.session.username = results[0].username;

    res.redirect("/api/dashboard");
  });
};

export const dashboard = (req: Request, res: Response) => {
  if (!req.session.userId) {
    return res.status(401).send("Unauthorized: Please log in");
  }

  const sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, [req.session.userId], (err: any, results: any) => {
    if (err) {
      return res.status(500).send("Database error: " + err.message);
    }
    if (!Array.isArray(results) || results.length === 0) {
      return res.status(404).send("User not found");
    }
    res.render("dashboard", {
      userId: results[0].username,
    });
  });
};
