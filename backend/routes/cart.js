// routes/cart.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Order = require('../models/Order');
const Food = require('../models/Food');

// Add to Cart
router.post('/cart/add', authMiddleware, async (req, res) => {
    const { foodId, quantity } = req.body;
    try {
        let cart = await Order.findOne({ user: req.user.id, status: 'cart' });

        if (!cart) {
            cart = new Order({ user: req.user.id, items: [], totalPrice: 0, status: 'cart' });
        }

        const food = await Food.findById(foodId);
        if (!food) {
            return res.status(404).json({ error: 'Food item not found' });
        }

        const existingItemIndex = cart.items.findIndex(item => item.food.equals(foodId));
        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({ food: foodId, quantity });
        }

        cart.totalPrice += food.price * quantity;
        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Remove from Cart
router.delete('/cart/remove/:foodId', authMiddleware, async (req, res) => {
    try {
        let cart = await Order.findOne({ user: req.user.id, status: 'cart' });

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.food.equals(req.params.foodId));
        if (itemIndex > -1) {
            cart.totalPrice -= cart.items[itemIndex].quantity * cart.items[itemIndex].food.price;
            cart.items.splice(itemIndex, 1);
        }

        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get Cart Items
router.get('/cart', authMiddleware, async (req, res) => {
    try {
        const cart = await Order.findOne({ user: req.user.id, status: 'cart' }).populate('items.food');
        if (!cart) {
            return res.status(404).json({ error: 'Cart is empty' });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Place Order
router.post('/order', authMiddleware, async (req, res) => {
    try {
        const cart = await Order.findOne({ user: req.user.id, status: 'cart' });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ error: 'Your cart is empty' });
        }

        cart.status = 'ordered';
        await cart.save();

        res.json({ message: 'Order placed successfully', order: cart });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
