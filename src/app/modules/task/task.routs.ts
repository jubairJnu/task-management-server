import { Router } from "express";
import { taskControllers } from "./task.contoller";

const router = Router();

router.post("/", taskControllers.createTask);
router.get("/", taskControllers.getTask);
router.patch("/:id", taskControllers.updateTask);

export const taskRoutes = router;
