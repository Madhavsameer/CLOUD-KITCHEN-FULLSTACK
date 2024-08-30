// src/components/AddFood.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AddFood.css'

const DEV_URL = "http://localhost:5000"
 const PROD_URL = "https://cloud-kitchen-fullstack.onrender.com"
 const BASE_URL = process.env.NODE_ENV === 'production' ? PROD_URL : DEV_URL;

const AddFood = () => {
    const [foodData, setFoodData] = useState({
        name: '',
        description: '',
        price: '',
        category: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFoodData({
            ...foodData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');

            const response = await axios.post(`${BASE_URL}/api/foods`, foodData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 201) {
                setSuccess('Food item added successfully!');
                setFoodData({
                    name: '',
                    description: '',
                    price: '',
                    category: ''
                });
                navigate('/dashboard'); // Redirect to dashboard or some other page
            }
        } catch (error) {
            setError('Failed to add food item. Please try again.');
        }
    };

    return (
        <div className="add-food-container">
            <h2>Add Food Item</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <form onSubmit={handleSubmit} className="add-food-form">
                <div className="form-group">
                    <label htmlFor="name">Food Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={foodData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={foodData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={foodData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={foodData.category}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="imageUrl">Image URL:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        value={foodData.imageUrl}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Add Food</button>
            </form>
        </div>
    );
};

export default AddFood;
