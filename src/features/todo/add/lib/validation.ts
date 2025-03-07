import { todoSchema } from "@/entity/todos/lib/validation";
import { z } from "zod";

export const addTodoSchema = z.object({
    userId: z.string()
}).merge(todoSchema.pick({ name: true, content: true }))