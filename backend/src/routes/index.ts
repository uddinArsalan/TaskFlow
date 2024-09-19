import { Router } from "express";
import authRouter from "./auth.route.js";
import { errorHandler } from "../middleware/error.middleware";

const router = Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

router.use(errorHandler);

export default router;
