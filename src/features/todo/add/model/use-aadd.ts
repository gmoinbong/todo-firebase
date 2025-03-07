import { z } from "zod"
import { addTodoSchema } from "../lib/validation"
import { db } from "@/shared/config/firebase"
import { doc, setDoc } from "firebase/firestore"
import { Todo } from "@/entity/todos/model"
import { handleErrorMessage } from "@/shared"

export type AddTodo = z.infer<typeof addTodoSchema>

export const useAdd = () => {
    return async (input: AddTodo) => {
        try {
            const { userId, content, name } = input;

            const docId = doc(db, '').id
    
            const ref = doc(db, 'users', userId, 'todos', docId);
    
            const todo: Todo = {
                id: docId,
                content,
                name,
                createdAt: new Date().toISOString(),
                status: 'pending'
            }
    
            await setDoc(ref, todo)
        }
        catch(error) {
            handleErrorMessage(error)
        }
       
    }
}