// src/middleware/notFound.ts
import { Request, Response } from "express";

export const notFound = (req: Request, res: Response) => {
  res.status(404).json({ message: "Resource not found" });
};
