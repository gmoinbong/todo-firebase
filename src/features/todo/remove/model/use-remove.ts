import { db } from "@/shared/config/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { handleErrorMessage } from "@/shared";

export const useRemoveTodo = () => {
    return async (id: string, userId: string) => {
        try {
            const docRef = doc(db, 'users', userId, 'todos', id);
            await deleteDoc(docRef);
        } catch (error) {
            handleErrorMessage(error);
        }
    };
};