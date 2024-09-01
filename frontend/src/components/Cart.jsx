import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import '../styles/Cart.css';

const Cart = () => {
    const { cart, removeFromCart, clearCart, getTotalPrice, updateQuantity } = useContext(CartContext);

    const handleIncrease = (foodId) => {
        updateQuantity(foodId, 1);
    };

    const handleDecrease = (foodId) => {
        updateQuantity(foodId, -1);
    };

    return (
        <div className="cart-container">
            <div className="cart-header">
                <h2>Your Cart</h2>
                {cart.length > 0 && <button onClick={clearCart}>Clear Cart</button>}
            </div>
            {cart.length > 0 ? (
                <div className="cart-items">
                    {cart.map(item => (
                        <div key={item._id} className="cart-item">
                            <img src={item.imageUrl} alt={item.name} />
                            <div className="cart-item-info">
                                <h3>{item.name}</h3>
                                <p>Price: ₹{item.price}</p>
                                <div className="cart-item-quantity">
                                    <button onClick={() => handleDecrease(item._id)} disabled={item.quantity <= 1}>-</button>
                                    <input type="text" value={item.quantity} readOnly />
                                    <button onClick={() => handleIncrease(item._id)}>+</button>
                                </div>
                            </div>
                            <div className="cart-item-actions">
                                <button onClick={() => removeFromCart(item._id)}>Remove</button>
                            </div>
                        </div>
                    ))}
                    <div className="cart-total">
                        <p>Total: ₹{getTotalPrice()}</p>
                    </div>
                    <div className="cart-checkout">
                        <button>Proceed to Checkout</button>
                    </div>
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;
