import React from 'react';
import '../styles/Food.css';  // Import the CSS file

const FoodItem = ({ food, handleAddToCart }) => {
    return (
        <div className="food-item">
            <img src={food.imageUrl} alt={food.name} />
            <h2>{food.name}</h2>
            <p>{food.description}</p>
            <h4>₹{food.price}</h4>
            <button onClick={() => handleAddToCart(food._id)}>Add to Cart</button>
        </div>
    );
};

const FoodList = ({ foods = [], handleAddToCart }) => {
    return (
        <div className="food-list">
            {foods.map((food) => (
                <FoodItem key={food._id} food={food} handleAddToCart={handleAddToCart} />
            ))}
        </div>
    );
};

export default FoodList;
