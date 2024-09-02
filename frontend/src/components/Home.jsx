import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Food.css';
import FoodList from './FoodList';
import TypeWriter from './TypeWriter';
import { CartContext } from '../contexts/CartContext'; // Import CartContext

const DEV_URL = "http://localhost:5000";
const PROD_URL = "https://cloud-kitchen-fullstack.onrender.com";
const BASE_URL = process.env.NODE_ENV === 'production' ? PROD_URL : DEV_URL;

const Home = () => {

    const [foods, setFoods] = useState([]);
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext); // Access addToCart from CartContext

    useEffect(() => {
        axios.get(`${BASE_URL}/api/foods`)
            .then(response => {
                setFoods(response.data);
                setFilteredFoods(response.data);
            })
            .catch(error => console.error('Error fetching food items', error));

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

        const selectedFood = foods.find(food => food._id === foodId);
        addToCart(selectedFood);
         // Add the selected food item to the cart
    };

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
            <TypeWriter />
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
                <FoodList foods={filteredFoods} handleAddToCart={handleAddToCart} />
            </section>
        </div>
    );
};

export default Home;
