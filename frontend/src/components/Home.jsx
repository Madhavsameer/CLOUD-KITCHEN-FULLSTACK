import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Food.css';
import TypeWriter from './TypeWriter';

const DEV_URL = "http://localhost:5000";
const PROD_URL = "https://cloud-kitchen-fullstack.onrender.com";
const BASE_URL = process.env.NODE_ENV === 'production' ? PROD_URL : DEV_URL;

const Home = () => {
    const [foods, setFoods] = useState([]);
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch food items from API
        axios.get(`${BASE_URL}/api/foods`)
            .then(response => {
                setFoods(response.data);
                setFilteredFoods(response.data); // Initialize filtered foods with all foods
            })
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

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        const filtered = foods.filter(food => {
            const foodName = food.name ? food.name.toLowerCase() : '';
            const foodCategory = food.category ? food.category.toLowerCase() : '';
            return foodName.includes(term.toLowerCase()) || foodCategory.includes(term.toLowerCase());
        });

        setFilteredFoods(filtered);
    };

    const handleCategoryFilter = (category) => {
        const filtered = foods.filter(food => food.category && food.category.toLowerCase() === category.toLowerCase());
        setFilteredFoods(filtered);
    };

    const handleAddToCart = (foodId) => {
        if (!user) {
            alert('You need to be logged in to add items to the cart');
            navigate('/login');
            return;
        }

        // Add food item to cart (implementation needed)
        console.log('Add to cart:', foodId);
    };

    // Function to get time-based greeting
    const getGreeting = () => {
        const now = new Date();
        const hour = now.getHours();

        if (hour < 12) {
            return 'Good Morning';
        } else if (hour < 18) {
            return 'Good Afternoon';
        } else {
            return 'Good Evening';
        }
    };

    return (
        <div className="home">
            <TypeWriter/>
            <header>
                
                
                    
               
                

                {user && <h3 id='greet'>{`${getGreeting()}, ${user.name}!`}</h3>}
            </header>
            
            <section>
                <input
                    type="text"
                    placeholder="What's on your mind...😋?"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <div className="category-filters">
                    <button onClick={() => handleCategoryFilter('NonVeg')}>Non-veg</button>
                    <button onClick={() => handleCategoryFilter('FastFood')}>Fast-Food</button>
                    <button onClick={() => handleCategoryFilter('Beverages')}>Beverages</button>
                    <button onClick={() => handleCategoryFilter('Drinks')}>Drinks</button>
                    <button onClick={() => handleCategoryFilter('Snacks')}>Snacks</button>
                    <button onClick={() => setFilteredFoods(foods)}>Show All</button>
                </div>

                <h2>Featured Foods</h2>
                <div className="food-list">
                    {filteredFoods.map(food => (
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
