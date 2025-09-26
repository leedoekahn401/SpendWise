import { Router } from "express";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";
import { getDailySummary } from "./dashboard.controller.js";

const dashboardRouter = Router();

dashboardRouter.use(authMiddleware);

dashboardRouter.get("/summary",getDailySummary);


export default dashboardRouter;