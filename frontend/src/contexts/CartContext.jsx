// CartContext.js

import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (food) => {
        setCart(prevCart => {
            const itemIndex = prevCart.findIndex(item => item._id === food._id);
            if (itemIndex > -1) {
                // Item already exists, update quantity
                const updatedCart = [...prevCart];
                updatedCart[itemIndex].quantity += 1;
                return updatedCart;
            }
            // Item not in cart, add new item
            return [...prevCart, { ...food, quantity: 1 }];
        });
    };

    const removeFromCart = (foodId) => {
        setCart(prevCart => prevCart.filter(item => item._id !== foodId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const updateQuantity = (foodId, amount) => {
        setCart(prevCart => {
            return prevCart.map(item => {
                if (item._id === foodId) {
                    const newQuantity = item.quantity + amount;
                    return { ...item, quantity: Math.max(newQuantity, 1) }; // Prevent quantity from going below 1
                }
                return item;
            });
        });
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getTotalPrice, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
