// src/controllers/circuitController.ts
import { Request, Response } from "express";
import Circuit from "../models/circuit";

/**
 * Controller: GET /circuits
 * Retrieves all circuits. Supports case-insensitive search on the circuit name via the query parameter `search`.
 */
export const getCircuits = async (req: Request, res: Response) => {
  try {
    const searchQuery = req.query.search;
    const query = searchQuery
      ? { name: { $regex: new RegExp(searchQuery.toString(), "i") } }
      : {};

    const circuits = await Circuit.find(query);
    res.status(200).json(circuits);
  } catch (error) {
    res.status(500).json({
      error: "Er is een fout opgetreden bij het ophalen van circuits.",
    });
  }
};
