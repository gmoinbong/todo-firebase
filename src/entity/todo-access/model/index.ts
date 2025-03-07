import { z } from "zod"
import { todoAccessSchema } from "../lib/validation"

export type TodoAccess = z.infer<typeof todoAccessSchema>