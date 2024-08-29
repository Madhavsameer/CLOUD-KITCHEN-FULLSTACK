// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css'; // Assuming you have a CSS file for styling

const DEV_URL = "http://localhost:5000"
 const PROD_URL = "https://cloud-kitchen-fullstack.onrender.com"
 const BASE_URL = process.env.NODE_ENV === 'production' ? PROD_URL : DEV_URL;

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default role is 'user'
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        axios.post(`${BASE_URL}/api/auth/register`, { name, email, password, role })
            .then(response => {
                navigate('/login'); // Redirect to login after successful registration
            })
            .catch(error => setError(error.response?.data?.error || 'Server error'));
    };

    return (
        <div className="register">
            <h2>Register</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleRegister}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label htmlFor="role">Role:</label>
                <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="chef">Chef</option>
                </select>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
