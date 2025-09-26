import z from "zod";

export const transactionSchema = z.object({
    amount: z.number().min(1,"Amount must be greater than 0"),
    type: z.enum(["income","expense"],"Invalid transaction type"),
    category: z.string(),
    description: z.string().optional(),
}).strict();
