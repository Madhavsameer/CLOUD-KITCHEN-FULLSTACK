// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Assuming you have a CSS file for styling


const DEV_URL = "http://localhost:5000"
 const PROD_URL = "https://cloud-kitchen-fullstack.onrender.com"
 const BASE_URL = process.env.NODE_ENV === 'production' ? PROD_URL : DEV_URL;
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post(`${BASE_URL}/api/auth/login`, { email, password })
            .then(response => {
                const token = response.data.token;
                const userRole = response.data.role; // Assuming role is returned from the backend

                localStorage.setItem('token', token);

                // Redirect based on role
                if (userRole === 'admin') {
                    navigate('/admin/dashboard');
                } else if (userRole === 'chef') {
                    navigate('/chef/dashboard');
                } else {
                    navigate('/');
                }

                window.location.reload();
            })
            .catch(error => setError(error.response?.data?.error || 'Server error'));
    };

    const handleSignUpRedirect = () => {
        navigate('/register');
    };

    return (
        <div className="login">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin}>
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
                <button type="submit">Login</button>
            </form>
            <button className="signup-button" onClick={handleSignUpRedirect}>
                Sign Up
            </button>
        </div>
    );
};

export default Login;
