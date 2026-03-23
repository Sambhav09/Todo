import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Signup = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const res = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("userId", data.user.id);
                setMessage("Signup successful! Welcome, " + data.user.username);
                setTimeout(() => navigate("/"), 1500);
            } else {
                setMessage(data.error || "Signup failed");
            }
        } catch (err) {
            setMessage("Network error");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-visual"></div>
                <div className="auth-form-section">
                    <header className="auth-header">
                        <h2>Create Account <span>🚀</span></h2>
                        <p>Join us to start managing your tasks.</p>
                    </header>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="auth-field">
                            <label className="auth-label">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                required
                                className="auth-input"
                                placeholder="johndoe"
                            />
                        </div>

                        <div className="auth-field">
                            <label className="auth-label">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="auth-input"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div className="auth-field">
                            <label className="auth-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="auth-input"
                                placeholder="••••••••"
                            />
                        </div>

                        <button type="submit" className="auth-button">
                            Create Account
                        </button>
                    </form>

                    {message && (
                        <div className={`auth-message ${message.includes("successful") ? "success" : "error"}`}>
                            {message}
                        </div>
                    )}

                    <footer className="auth-footer">
                        Already have an account?{" "}
                        <span className="auth-link" onClick={() => navigate("/login")}>
                            Sign In
                        </span>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Signup;