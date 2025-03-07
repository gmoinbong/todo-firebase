import { useState } from "react";
import { Todo } from "@/entity/todos/model";
import { useAddTodo } from "../add/model";
import { useEditTodo } from "../edit/model";
import { useFindTodos } from "../find-list/model/use-find-list";
import { useRemoveTodo } from "../remove/model";
import { useUserData } from "@/features/user/profile/hooks/use-user-data";

export const TodoList = () => {
    const { userData } = useUserData();
    const userId = userData?.uid ?? "";
    const { todos, loading } = useFindTodos(userId);
    const addTodo = useAddTodo();
    const editTodo = useEditTodo();
    const removeTodo = useRemoveTodo();

    const [newName, setNewName] = useState("");
    const [newContent, setNewContent] = useState("");
    const [editId, setEditId] = useState<string | null>(null);
    const [editName, setEditName] = useState("");
    const [editContent, setEditContent] = useState("");

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newName.trim()) return;
        addTodo({ userId, name: newName, content: newContent });
        setNewName("");
        setNewContent("");
    };

    const handleToggleStatus = (todo: Todo) =>
        editTodo({ id: todo.id, userId, data: { status: todo.status === "done" ? "pending" : "done" } });

    const handleEdit = (todo: Todo) => {
        setEditId(todo.id);
        setEditName(todo.name);
        setEditContent(todo.content);
    };

    const handleSaveEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editName.trim() || !editId) return;
        await editTodo({ id: editId, userId, data: { name: editName, content: editContent } });
        setEditId(null);
        setEditName("");
        setEditContent("");
    };

    if (!userId) return <div className="p-4 text-red-500">Please login to view todos</div>;

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Todo List</h1>

            <form onSubmit={handleAdd} className="mb-8 bg-white p-6 rounded-lg shadow-md">
                <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full p-2 border rounded-md mb-2" placeholder="Task name" required />
                <textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} className="w-full p-2 border rounded-md h-24" placeholder="Task details" />
                <button type="submit" className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-md">Add Todo</button>
            </form>

            {loading ? (
                <div className="text-center text-gray-500">Loading tasks...</div>
            ) : (
                <div className="space-y-4">
                    {todos.map((todo) => (
                        <div key={todo.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            {editId === todo.id ? (
                                <form onSubmit={handleSaveEdit} className="space-y-4">
                                    <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full p-2 border rounded-md mb-2" required />
                                    <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} className="w-full p-2 border rounded-md h-24" />
                                    <div className="flex gap-2">
                                        <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded-md">Save</button>
                                        <button type="button" onClick={() => setEditId(null)} className="bg-gray-500 text-white px-3 py-1 rounded-md">Cancel</button>
                                    </div>
                                </form>
                            ) : (
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className={`text-lg font-semibold ${todo.status === "done" ? "line-through text-gray-400" : ""}`}>{todo.name}</h3>
                                        {todo.content && <p className="text-gray-600 mt-1">{todo.content}</p>}
                                        <p className="text-sm text-gray-400 mt-2">Created: {new Date(todo.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex items-center gap-2 ml-4">
                                        <button onClick={() => handleToggleStatus(todo)} className={`p-2 rounded-md ${todo.status === "done" ? "bg-green-100 text-green-600 hover:bg-green-200" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{todo.status === "done" ? "✓" : "◯"}</button>
                                        <button onClick={() => handleEdit(todo)} className="p-2 text-blue-500 hover:bg-blue-100 rounded-md">✎</button>
                                        <button onClick={() => removeTodo(todo.id, userId)} className="p-2 text-red-500 hover:bg-red-100 rounded-md">🗑️</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
