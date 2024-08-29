import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Cloud Kitchen</h1>
            <ul>
                {/* <li>
                    <Link to="/">Menu</Link>
                </li>
                <li>
                    <Link to="/cart">Cart</Link>
                </li> */}
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
