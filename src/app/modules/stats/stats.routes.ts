import { Router } from "express";
import { getSummary } from "./stats.controller";

const router = Router();

router.get("/dashboard", getSummary);

export const statsRoutes = router;
