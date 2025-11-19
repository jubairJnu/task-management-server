import { Router } from "express";
import { teamControllers } from "./team.controller";

const router = Router();
router.post("/", teamControllers.createTeam);
router.get("/", teamControllers.getTeam);
router.patch("/:id", teamControllers.updateTeam);

export const teamRoutes = router;
