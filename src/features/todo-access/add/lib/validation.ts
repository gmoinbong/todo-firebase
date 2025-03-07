import { todoAccessSchema } from "@/entity/todo-access/lib/validation";

export const addAccessSchema = todoAccessSchema.omit({ id: true })