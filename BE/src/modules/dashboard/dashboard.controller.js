import { getDailySummaryService } from "./dashboard.service.js";
import handleAsync from "../../common/utils/handle-async.util.js";
import { createResponse } from "../../common/configs/response.config.js";

export const getDailySummary = handleAsync(async(req,res)=>{
    const userId = req.user.id;
    const period = req.query.period;
    const dailySummary = await getDailySummaryService(userId,period);
    return createResponse(res,200,"Get daily summary successfully",dailySummary);
})



