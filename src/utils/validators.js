const { z } = require('zod');

const recordSchema = z.object({
    amount: z.number().positive(),
    type: z.enum(['Income', 'Expense']),
    category: z.string().min(1),
    date: z.string(), // YYYY-MM-DD
    notes: z.string().optional()
});

module.exports = { recordSchema };