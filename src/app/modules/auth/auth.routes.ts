import express from "express";

import { backendAuthControllers } from "./auth.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/login", backendAuthControllers.loginUser);

router.patch("/refresh-token", auth, backendAuthControllers.refreshToken);

export const authRoutes = router;
