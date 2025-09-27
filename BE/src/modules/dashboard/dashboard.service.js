import Transaction from "../transaction/transaction.model.js";
import { calculateDateRange } from "../transaction/transaction.service.js";
import mongoose from "mongoose";    

export const getDailySummaryService = async(userId,period)=>{
    const { startDate, endDate } = calculateDateRange(period); 
    const dailyData = await Transaction.aggregate([

        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId), 
                date: { $gte: startDate, $lte: endDate } 
            }
        },
 
        {
            $group: {

                _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                totalIncome: {
                    $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] }
                },
                totalExpense: {
                    $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] }
                }
            }
        },
        {
            $sort: { _id: 1 }
        },
        {
            $project: {
                _id: 0,
                date: "$_id",
                totalIncome: 1,
                totalExpense: 1
            }
        }
    ]);

    const summaryMap = new Map(dailyData.map(item => [item.date, item]));
    const fullSummary = [];
    
    for (let day = new Date(startDate); day <= endDate; day.setDate(day.getDate() + 1)) {
        const dateString = day.toISOString().split('T')[0]; // Format as "YYYY-MM-DD"
        
        if (summaryMap.has(dateString)) {
            const { date, totalIncome, totalExpense } = summaryMap.get(dateString);
            fullSummary.push({ date, totalIncome, totalExpense, surplus: totalIncome - totalExpense });
        } else {
            fullSummary.push({ date: dateString, totalIncome: 0, totalExpense: 0, surplus: 0 });
        }
    }

    return fullSummary;

}

            
