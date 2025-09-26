import { createResponse } from "../../common/configs/response.config.js";
import handleAsync from "../../common/utils/handle-async.util.js";
import { getTransactionsByFilterService,createTransactionService, getIncomeService, getExpenseService } from "./transaction.service.js";

export const getTransaction = handleAsync(async(req,res)=>{
    const income = await getTransactionsByFilterService(req.user.id,req.query.period);
    return createResponse(res,200,"Get income successfully",income);
})

export const createTransaction = handleAsync(async(req,res)=>{
    const transaction = await createTransactionService({
        ...req.body, // Copies all properties from req.body
        userId: req.user.id // Adds or overwrites the userId
    });
    return createResponse(res,200,"Create transaction successfully",transaction);
})

export const getIncome = handleAsync(async(req,res)=>{
    const userId = req.user.id;
    const period = req.query.period;

    const income = await getIncomeService(userId, period);
    return createResponse(res,200,"Get income successfully",income);
})

export const getExpense = handleAsync(async(req,res)=>{
    const userId = req.user.id;
    const period = req.query.period;

    const expense = await getExpenseService(userId, period);
    return createResponse(res,200,"Get expense successfully",expense);
})
