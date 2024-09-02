// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

const DEV_URL = "http://localhost:5000"
 const PROD_URL = "https://cloud-kitchen-fullstack.onrender.com"
 const BASE_URL = process.env.NODE_ENV === 'production' ? PROD_URL : DEV_URL;

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get(`${BASE_URL}/api/auth/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                setUser(response.data.user);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching user profile', error);
                setLoading(false);
                navigate('/login');
            });
        } else {
            navigate('/login');
        }
    }, [navigate]);

    if (loading) return <p>Loading...</p>;
    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/');
    };

    return (
        <div>
            <h1>Profile</h1>
            <div className="navbar-user">
                {user ? (
                    <>
                        <span>Welcome, {user.name}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
            {user ? (
                <div>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p>
                    <img src={user.profile} alt='profile'></img>
                </div>
            ) : (
                <p>No user information available</p>
            )}
        </div>
    );
};

export default Profile;
