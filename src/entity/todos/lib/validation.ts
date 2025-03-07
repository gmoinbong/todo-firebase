import { z } from "zod";

export const todoSchema = z.object({
    id: z.string(),
    name: z.string(),
    content: z.string(),
    createdAt: z.string().date(),
    status: z.enum(['pending', 'done'])
})