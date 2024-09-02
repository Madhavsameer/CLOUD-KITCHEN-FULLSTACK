// src/components/Navbar.js
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../contexts/CartContext';
import '../styles/Navbar.css';
import { FaShoppingCart } from 'react-icons/fa';
import { MdAccountCircle } from 'react-icons/md'; // Import account icon from react-icons

const DEV_URL = "http://localhost:5000";
const PROD_URL = "https://cloud-kitchen-fullstack.onrender.com";
const BASE_URL = process.env.NODE_ENV === 'production' ? PROD_URL : DEV_URL;

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility
    const { cart } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get(`${BASE_URL}/api/auth/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => setUser(response.data.user))
            .catch(error => {
                console.error('Error fetching user profile', error);
                setUser(null);  
            });
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/');
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">MyCloudKitchen</Link>
            </div>
            <div className="navbar-links">
                <Link to="/about">About</Link>
            </div>
            <div className="navbar-user">
                {user ? (
                    <div className="profile-section">
                        <div className="profile-icon" onClick={toggleDropdown}>
                            <MdAccountCircle size={24} />
                            <span>My Profile</span>
                        </div>
                        {dropdownOpen && (
                            <div className="dropdown-menu">
                                <Link to="/profile" className="dropdown-item">Profile Details</Link>
                                <Link to="/orders" className="dropdown-item">My Orders</Link>
                                <button onClick={handleLogout} className="dropdown-item logout">Logout</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
            <div className="navbar-cart">
                <Link to="/cart" className="cart-icon">
                    <FaShoppingCart />
                    <span className="cart-count">{cart.length}</span>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
