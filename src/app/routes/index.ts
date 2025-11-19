import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { teamRoutes } from "../modules/team/team.routes";
import { porjectRoutes } from "../modules/project/project.routes";
import { taskRoutes } from "../modules/task/task.routs";
import { authRoutes } from "../modules/auth/auth.routes";

const router = Router();

const moduleRoutes = [
  {
    route: "/users",
    module: userRoutes,
  },
  {
    route: "/teams",
    module: teamRoutes,
  },
  {
    route: "/projects",
    module: porjectRoutes,
  },
  {
    route: "/tasks",
    module: taskRoutes,
  },
  {
    route: "/auth",
    module: authRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.route, route.module);
});

export default router;
