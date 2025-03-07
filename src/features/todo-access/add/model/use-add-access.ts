import { z } from "zod"
import { db } from "@/shared/config/firebase"
import { doc, setDoc } from "firebase/firestore"
import { handleErrorMessage } from "@/shared"
import { addAccessSchema } from "../lib/validation"
import { TodoAccess } from "@/entity/todo-access/model"

export type AddAccess = z.infer<typeof addAccessSchema>

export const useAddAccess = () => {
    return async (input: AddAccess) => {
        try {
            const { toUserId, byUserId, role } = input;

            const docId = doc(db, '').id
    
            const ref = doc(db, 'todo-access', docId);
    
            const todo: TodoAccess = {
                id: docId,
                toUserId,
                byUserId,
                role,
            }
    
            await setDoc(ref, todo)
        }
        catch(error) {
            handleErrorMessage(error)
        }
       
    }
}