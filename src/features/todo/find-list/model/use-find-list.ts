import { useEffect, useState } from 'react';
import { db } from "@/shared/config/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Todo } from '@/entity/todos/model';

export const useFindTodos = (userId: string) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            setTodos([]);
            return;
        }

        const unsubscribe = onSnapshot(
            collection(db, 'users', userId, 'todos'),
            (snapshot) => {
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setTodos(data as Todo[]);
                setLoading(false);
            },
            (error) => {
                console.error("Error fetching todos:", error);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [userId]);

    return { todos, loading };
};