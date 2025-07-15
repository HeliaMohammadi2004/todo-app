'use client'; 
import TodoForm from "@/app/components/TodoForm";
import { Todo } from "./types/interface";
import { apiClient } from "./services/todo";
import { API_ENDPOINT } from "./services/api";
import { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";

export default function Home() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async() => {
            try {
                const response = await apiClient.get(API_ENDPOINT.todos.getIndex)
                setTodos(response.data.slice(0, 10))
            } catch (error) {
                console.error("Error in Fetching Task", error);
            } finally {
                setLoading(false)
            }
        })();
    }, []);

    const handleAdd = async (title: string) => {
        const newTodo = {
            title,
            completed: false
        };
        try {
            const response = await apiClient.post(API_ENDPOINT.todos.postStore, newTodo);
            const addedTodo = response.data;

            setTodos((prev) => [addedTodo, ...prev]);
        } catch (error) {
            console.error("Error in Adding Task", error);
        }
    }

    const handleDelete = async (id: number) => {
        try {
            const response = await apiClient.delete(API_ENDPOINT.todos.delete(id))
            setTodos((prev) => prev.filter((t) => t.id !== id));

        } catch (error) {
            console.error("Error in Deleting Task", error);
        }
    }

    const handleToggle = async (todo: Todo) => {
        try {
            const response = await apiClient.put(API_ENDPOINT.todos.putUpdate(todo.id),
            { 
                ...todo,
                completed: !todo.completed 
            })
            
            setTodos((prev) =>
                prev.map((t) => (t.id === todo.id ? {...t, completed: !todo.completed} : t))
            );

        } catch (error) {
            console.error("Error in Updating Task", error);
        }
    }

    if (loading) return <p>Loading...</p>

    return (
        <>
        <main>
            <h1>Task List</h1>
            <TodoForm onAdd={handleAdd}/>
            {todos.map((todo) => (
                <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
                />
            ))}
        </main>
        </>
    )
}