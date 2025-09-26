import Transaction from "../transaction/transaction.model.js";
import { calculateDateRange } from "../transaction/transaction.service.js";
import mongoose from "mongoose";    

export const getDailySummaryService = async(userId,period)=>{
    const { startDate, endDate } = calculateDateRange(period); 
    const dailyData = await Transaction.aggregate([
        // Stage 1: Match only the relevant transactions
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId), // Match by user
                date: { $gte: startDate, $lte: endDate } // Match by date range
            }
        },
        // Stage 2: Group by the date (Year-Month-Day)
        {
            $group: {
                // Group by a formatted date string like "2025-09-24"
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                // Calculate total income for that day
                totalIncome: {
                    $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] }
                },
                // Calculate total expense for that day
                totalExpense: {
                    $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] }
                }
            }
        },
        // Stage 3: Sort the results by date in ascending order
        {
            $sort: { _id: 1 }
        },
        // Stage 4: Rename '_id' to 'date' for a cleaner output
        {
            $project: {
                _id: 0,
                date: "$_id",
                totalIncome: 1,
                totalExpense: 1
            }
        }
    ]);

    // 2. Fill in Missing Days
    // The aggregation only returns days with transactions. We need to fill in the gaps.
    const summaryMap = new Map(dailyData.map(item => [item.date, item]));
    const fullSummary = [];
    
    // Loop from the start date to the end date, day by day
    for (let day = new Date(startDate); day <= endDate; day.setDate(day.getDate() + 1)) {
        const dateString = day.toISOString().split('T')[0]; // Format as "YYYY-MM-DD"
        
        if (summaryMap.has(dateString)) {
            const { date, totalIncome, totalExpense } = summaryMap.get(dateString);
            fullSummary.push({ date, totalIncome, totalExpense, surplus: totalIncome - totalExpense });
        } else {
            // If no data for this day, push a zero-value object
            fullSummary.push({ date: dateString, totalIncome: 0, totalExpense: 0, surplus: 0 });
        }
    }

    return fullSummary;

}

            