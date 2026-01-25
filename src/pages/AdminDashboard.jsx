import React, { useState, useEffect } from "react";
import "./AdminDashbard.css"

export default function AdminDashboard() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    // 🔴 Replace with your real backend API

    const API_URL = import.meta.env.VITE_API || "http://localhost:5000/api";

    // LOGIN
    const handleLogin = () => {
        // Demo admin credentials
        const adminEmail = "admin@marriage.com";
        const adminPassword = "Admin@123";

        if (username === adminEmail && password === adminPassword) {
            localStorage.setItem("adminToken", "demo-admin-token");
            setIsLoggedIn(true);
            fetchDashboardData();
        } else {
            alert("Invalid Admin Email or Password");
        }
    };


    // DASHBOARD DATA
    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("adminToken");

            const res = await fetch(`${API}/dashboard`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            setStats(data.stats);
            setUsers(data.users);
        } catch (err) {
            alert("Dashboard load failed");
        } finally {
            setLoading(false);
        }
    };

    // DELETE USER
    const deleteUser = async (id) => {
        if (!window.confirm("User permanently delete karna hai?")) return;

        const token = localStorage.getItem("adminToken");
        await fetch(`${API}/users/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });

        fetchDashboardData();
    };

    // BLOCK / UNBLOCK USER
    const toggleUserStatus = async (id) => {
        const token = localStorage.getItem("adminToken");
        await fetch(`${API}/users/${id}/toggle-status`, {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
        });

        fetchDashboardData();
    };

    // LOGIN SCREEN
    if (!isLoggedIn) {
        return (
            <div className="login-container">
                <div className="login-box">
                    <h2>Admin Login</h2>
                    <input
                        type="text"
                        placeholder="Admin Email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Admin Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button onClick={handleLogin}>Login</button>
                </div>
            </div>
        );
    }

    // LOADING
    if (loading) {
        return <h2 style={{ textAlign: "center" }}>Loading Dashboard...</h2>;
    }

    // DASHBOARD UI
    return (
        <div className="dashboard">
            <h1>Marriage Website Admin Panel</h1>

            {stats && (
                <div className="stats">
                    <div>Total Users: {stats.totalUsers}</div>
                    <div>Active Users: {stats.activeUsers}</div>
                    <div>Blocked Users: {stats.blockedUsers}</div>
                </div>
            )}

            <h2>User Management</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u._id}>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.status}</td>
                            <td>
                                <button onClick={() => toggleUserStatus(u._id)}>
                                    {u.status === "active" ? "Block" : "Unblock"}
                                </button>
                                <button className="danger" onClick={() => deleteUser(u._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
