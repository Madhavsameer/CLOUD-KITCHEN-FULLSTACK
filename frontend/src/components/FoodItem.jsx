import React from 'react';
import '../styles/Food.css';  // Import the CSS file

const FoodItem = ({ food }) => {
    return (
        <div className="food-item">
           
            <img src={food.imageUrl} alt={food.name} />
            <h2>{food.name}</h2>
            <p>{food.description}</p>
            <p>Price: ${food.price}</p>
            <button>Add to Cart</button>
        </div>
    );
};

const FoodList = ({ foods=[] }) => {
    return (
        <div className="food-list">
            {foods.map((food) => (
                <FoodItem key={food.name} food={food} />
            ))}
        </div>
    );
};

export default FoodList;
