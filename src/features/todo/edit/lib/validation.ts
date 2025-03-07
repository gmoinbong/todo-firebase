import { todoSchema } from "@/entity/todos/lib/validation";

export const editTodoSchema = todoSchema.pick({
    id: true,
    name: true,
    content: true,
    status: true
});