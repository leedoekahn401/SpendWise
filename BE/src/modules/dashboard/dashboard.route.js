import { Router } from "express";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";
import { getDailySummary, getAddUpSummary, getCategorySummary, getGroupDailySummary, getGroupAddUpSummary,getGroupMemberProportions } from "./dashboard.controller.js";

const dashboardRouter = Router();

dashboardRouter.use(authMiddleware);

dashboardRouter.get("/summary/daily",getDailySummary);
dashboardRouter.get("/summary/add",getAddUpSummary);
dashboardRouter.get('/summary/category', getCategorySummary);
dashboardRouter.get('/summary/daily/:groupId', getGroupDailySummary);
dashboardRouter.get('/summary/add/:groupId', getGroupAddUpSummary);
dashboardRouter.get('/summary/proportions/:groupId', getGroupMemberProportions);

export default dashboardRouter;