import { Router } from "express";
import { getRaces } from "../controllers/raceController";

const router = Router();

// GET /races
router.get("/", getRaces);

export default router;
