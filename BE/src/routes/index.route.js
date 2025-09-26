import {Router} from "express";
import authRouter from "../modules/auth/auth.route.js";
import uploadRouter from "../modules/upload/upload.route.js";
import transactionRouter from "../modules/transaction/transaction.route.js";
import groupRouter from "../modules/group/group.route.js";
import dashboardRouter from "../modules/dashboard/dashboard.route.js";
const router = Router();

router.use("/auth", authRouter);
router.use("/upload", uploadRouter);
router.use("/group",groupRouter);
router.use("/transaction",transactionRouter);
router.use("/dashboard",dashboardRouter);
export default router;
