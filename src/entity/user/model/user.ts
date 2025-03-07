import { z } from "zod";
import { userSchema } from "../lib";

export type User = z.infer<typeof userSchema>