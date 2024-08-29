import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
// import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register'; // Import Register component
// import './styles/styles.css';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/Menu" element={<Menu />} />
                {/* <Route path="/cart" element={<Cart />} /> */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} /> {/* Add Register route */}
            </Routes>
        </Router>
    );
};

export default App;
