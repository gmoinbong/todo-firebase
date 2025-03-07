import { Timestamp } from "firebase/firestore";
import { z } from "zod";

export const userSchema = z.object({
    uid: z.string(),
    name: z.string(),
    createdAt: z.instanceof(Timestamp).transform(timestamp => timestamp.toDate()),
    email: z.string().email(),
})