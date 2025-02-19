import { Router } from "express";
import { getDrivers } from "../controllers/driverController";

const router = Router();

// GET /drivers
router.get("/", getDrivers);

export default router;
