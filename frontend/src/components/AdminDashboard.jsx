// src/components/AdminDashboard.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div>
            <h2>Admin Dashboard</h2>
            <p>Welcome to the admin dashboard!</p>
            {/* Add more admin-specific content here */}

            <Link to="/addfood">Home</Link>
        </div>
    );
};

export default AdminDashboard;
