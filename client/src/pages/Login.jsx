import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const res = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("userId", data.id);
                setMessage("Login successful! Redirecting...");
                setTimeout(() => navigate("/"), 1500);
            } else {
                setMessage(data.error || "Login failed");
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
                        <h2>Welcome Back <span>👋</span></h2>
                        <p>Please enter your details to sign in.</p>
                    </header>

                    <form onSubmit={handleSubmit} className="auth-form">
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
                            Sign In
                        </button>
                    </form>

                    {message && (
                        <div className={`auth-message ${message.includes("successful") ? "success" : "error"}`}>
                            {message}
                        </div>
                    )}

                    <footer className="auth-footer">
                        Don't have an account?{" "}
                        <span className="auth-link" onClick={() => navigate("/signup")}>
                            Create an account
                        </span>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Login;