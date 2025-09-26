import Transaction from "./transaction.model.js";


export const createTransactionService = async({userId,groupId,amount,type,category,description})=>{
    const transaction = await Transaction.create({userId,groupId,amount,type,category,description});
    return transaction;
}

export const getIncomeService = async (userId, period) => {
    return getTransactionsByFilterService(userId, { type: 'income', period });
};

export const getExpenseService = async (userId, period) => {
    return getTransactionsByFilterService(userId, { type: 'expense', period });
};

export const getTransactionsByFilterService = async (userId, filters = {}) => {
    // 1. Start with the base query that always includes the userId
    const query = { userId };
    const { type, period } = filters;
    // 2. Add the 'type' filter to the query if it's provided
    if (type && ['income', 'expense'].includes(type)) {
        query.type = type;
    }
    // 3. Calculate the start date based on the period
    const {startDate,endDate} = calculateDateRange(period);
    if (startDate) {
        // Add the date range to the query
        query.date = { $gte: startDate }; // Assumes your date field is named 'date'
    }
    // 4. Execute the single, efficient query and return the results
    const transactions = await Transaction.find(query).sort({ date: -1 });
    return transactions;
};

export const calculateDateRange = (period)=>{
    let startDate;
    let endDate;
    if (period) {
        const now = new Date();
        startDate = new Date(now); // Start with today
        endDate = new Date(now);
        switch (period) {
            case '7d':
                startDate.setDate(now.getDate() - 7);
                break;
            case '30d':
                startDate.setDate(now.getDate() - 30);
                break;
            case '3m':
                startDate.setMonth(now.getMonth() - 3);
                break;
            case '1y':
                startDate.setFullYear(now.getFullYear() - 1);
                break;
            default:
                startDate = null; // Ignore invalid periods
        }
    }
    return {startDate,endDate};
}