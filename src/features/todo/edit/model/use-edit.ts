import { db } from "@/shared/config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { handleErrorMessage } from "@/shared";
import { Todo } from "@/entity/todos/model";

export const useEditTodo = () => {
  return async (input: { 
    id: string; 
    userId: string;
    data: Partial<Todo>
  }) => {
    try {
      const docRef = doc(db, 'users', input.userId, 'todos', input.id);
      await updateDoc(docRef, input.data);
    } catch (error) {
      handleErrorMessage(error);
    }
  };
};