import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";

const router = Router();

const moduleRoutes = [
  {
    route: "/users",
    module: userRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.route, route.module);
});

export default router;
