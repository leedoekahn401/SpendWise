import {Router} from "express";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";
import { createTransaction } from "./transaction.controller.js";
import validBodyReq from "../../common/middlewares/valid-body.middleware.js";
import { transactionSchema } from "./transaction.schema.js";
import { getTransaction, getIncome, getExpense, downloadExcel, getGroupTransaction } from "./transaction.controller.js";

const transactionRouter = Router();


transactionRouter.use(authMiddleware);

transactionRouter.get("/download",downloadExcel);
transactionRouter.post("/create",validBodyReq(transactionSchema),createTransaction);
transactionRouter.get("/",getTransaction);
transactionRouter.get("/income",getIncome);
transactionRouter.get("/expense",getExpense);
transactionRouter.get("/group/:id",getGroupTransaction);

export default transactionRouter;