import express from "express";

import { backendAuthControllers } from "./auth.controller";
import backAuth from "../../middleware/Backend.Auth";

const router = express.Router();

router.post("/login", backendAuthControllers.loginUser);
router.patch(
  "/change-password",
  backAuth,
  backendAuthControllers.changeUserPassword
);

router.patch("/reset-password", backAuth, backendAuthControllers.resetPassword);

export const backendAuthRoutes = router;
