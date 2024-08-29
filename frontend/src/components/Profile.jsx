// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://localhost:5000/api/auth/profile', {
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

    return (
        <div>
            <h1>Profile</h1>
            {user ? (
                <div>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p>
                </div>
            ) : (
                <p>No user information available</p>
            )}
        </div>
    );
};

export default Profile;