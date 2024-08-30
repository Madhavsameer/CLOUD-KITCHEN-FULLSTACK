// src/components/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
 // Assuming you have a CSS file for styling
 import '../styles/Food.css'

 const DEV_URL = "http://localhost:5000"
 const PROD_URL = "https://cloud-kitchen-fullstack.onrender.com"
 const BASE_URL = process.env.NODE_ENV === 'production' ? PROD_URL : DEV_URL;

const Home = () => {
    const [foods, setFoods] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch food items from API
        axios.get(`${BASE_URL}/api/foods`)
            .then(response => setFoods(response.data))
            .catch(error => console.error('Error fetching food items', error));

        // Check if user is logged in and fetch profile
        const token = localStorage.getItem('token');
        if (token) {
            axios.get(`${BASE_URL}/api/auth/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => setUser(response.data.user))
            .catch(error => console.error('Error fetching user profile', error));
        }
    }, []);

    const handleAddToCart = (foodId) => {
        if (!user) {
            alert('You need to be logged in to add items to the cart');
            navigate('/login');
            return;
        }

        // Add food item to cart (implementation needed)
        console.log('Add to cart:', foodId);
    };
    

    return (
        <div className="home">
            <header>
                <h1>Welcome to Our Cloud Kitchen</h1>
                {user && <p>Hello, {user.name}!</p>}
            </header>
            <section>
                <h2>Featured Foods</h2>
                <div className="food-list">
                    {foods.map(food => (
                        <div key={food._id} className="food-item">
                           <img src={food.imageUrl} alt={food.name} />
                            <h3>{food.name}</h3>
                            <p>{food.description}</p>
                            <h4>₹{food.price}</h4>
                            <button onClick={() => handleAddToCart(food._id)}>
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
