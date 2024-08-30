import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Cart from './components/Cart';
import Profile from './components/Profile';
import AdminDashboard from './components/AdminDashboard';
import ChefDashboard from './components/ChefDashboard';

import AddFood from './components/AddFood';
import AboutUs from './components/AboutUs';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/chef/dashboard" element={<ChefDashboard />} />
                <Route path="addfood" element={<AddFood />} />
            </Routes>
        </Router>
    );
};

export default App;
