import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    // ✅ Logout function
    const handleLogout = () => {
        localStorage.removeItem("userId");
        navigate("/login");
    };

    // ✅ Fetch todos
    const fetchTodos = async () => {
        try {
            const res = await fetch(`http://localhost:5000/todos/${userId}`);
            const data = await res.json();
            setTodos(data);
        } catch (err) {
            console.error("Error fetching todos:", err);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchTodos();
        } else {
            navigate("/login");
        }
    }, [userId]);

    // ✅ Create todo
    const handleAddTodo = async (e) => {
        e.preventDefault();
        if (!description.trim()) return;

        try {
            await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ description, userId }),
            });
            setDescription("");
            fetchTodos();
        } catch (err) {
            console.error("Error adding todo:", err);
        }
    };

    // ✅ Delete todo
    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:5000/todos/delete/${id}`, {
                method: "DELETE",
            });
            fetchTodos();
        } catch (err) {
            console.error("Error deleting todo:", err);
        }
    };

    return (
        <div className="home-container">
            {/* Navigation Bar */}
            <nav className="home-nav">
                <div className="home-logo">
                    <span>📝</span> Todo App
                </div>
                <button onClick={handleLogout} className="home-logout-btn">
                    Logout
                </button>
            </nav>

            {/* Main Content */}
            <main className="home-content">
                <header className="home-header">
                    <h1>Manage Your Day</h1>
                    <p>Be productive and stay focused.</p>
                </header>

                {/* Add Todo Form */}
                <form onSubmit={handleAddTodo} className="todo-form">
                    <input
                        type="text"
                        placeholder="What needs to be done?"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="todo-input"
                    />
                    <button type="submit" className="todo-add-btn">
                        Add Task
                    </button>
                </form>

                {/* Todo List */}
                <div className="todo-list">
                    {todos.length === 0 ? (
                        <div className="empty-state">
                            <p>No tasks yet. Start by adding one above!</p>
                        </div>
                    ) : (
                        todos.map((todo) => (
                            <div key={todo.id} className="todo-card">
                                <span className="todo-text">{todo.description}</span>
                                <button
                                    className="todo-delete-btn"
                                    onClick={() => handleDelete(todo.id)}
                                    title="Delete Task"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 6h18"></path>
                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                    </svg>
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default Home;