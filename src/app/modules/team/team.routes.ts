import { Router } from "express";
import { teamControllers } from "./team.controller";

const router = Router();
router.post("/", teamControllers.createTeam);
router.patch("/:id", teamControllers.updateTeam);
