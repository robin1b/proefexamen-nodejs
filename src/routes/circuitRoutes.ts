import { Router } from "express";
import { getCircuits } from "../controllers/circuitController";

const router = Router();

// GET /circuits
router.get("/", getCircuits);

export default router;
