import { Router } from "express";
import { reassignControllers } from "./resasasign.controller";

const router = Router();

router.post("/", reassignControllers.createReassgin);
router.get("/", reassignControllers.getReassgin);

export const reassignRoutes = router;
