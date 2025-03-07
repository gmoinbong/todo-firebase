import { z } from "zod";

export const todoAccessSchema = z.object({
    id: z.string(),
    byUserId: z.string(),
    toUserId: z.string(),
    role: z.enum(['admin', 'viewer'])
})