import { Router } from "express";
import { projectControllers } from "./project.controller";

const router = Router();

router.post("/", projectControllers.createProject);
router.get("/", projectControllers.getProject);
router.patch("/:id", projectControllers.getProject);

export const porjectRoutes = router;
