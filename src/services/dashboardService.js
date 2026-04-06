const db = require('../config/db');

const getSummary = () => {
    const stats = db.prepare(`
        SELECT 
            COALESCE(SUM(CASE WHEN type = 'Income' THEN amount ELSE 0 END), 0) as totalIncome,
            COALESCE(SUM(CASE WHEN type = 'Expense' THEN amount ELSE 0 END), 0) as totalExpense
        FROM records
    `).get();

    const categoryTotals = db.prepare(`
        SELECT category, SUM(amount) as total 
        FROM records 
        GROUP BY category
    `).all();

    return {
        totalIncome: stats.totalIncome,
        totalExpense: stats.totalExpense,
        netBalance: stats.totalIncome - stats.totalExpense,
        categoryBreakdown: categoryTotals
    };
};

module.exports = { getSummary };