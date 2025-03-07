import { z } from "zod"
import { todoSchema } from "../lib/validation"

export type Todo = z.infer<typeof todoSchema>