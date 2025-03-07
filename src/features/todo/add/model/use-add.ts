import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/shared/config/firebase";
import { handleErrorMessage } from "@/shared";

export const useAddTodo = () => {
  return async (input: { userId: string; name: string; content: string }) => {
    try {
      const { userId, name, content } = input;
      
      const docId = doc(collection(db, 'users', userId, 'todos')).id;
      
      const docRef = doc(db, 'users', userId, 'todos', docId);
      
      await setDoc(docRef, {
        name,
        content,
        createdAt: new Date().toISOString(),
        status: 'pending'
      });
    } catch (error) {
      handleErrorMessage(error);
    }
  };
};