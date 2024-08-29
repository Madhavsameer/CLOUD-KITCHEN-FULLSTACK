const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Food = require('../models/Food');

// Create a new order
router.post('/', async (req, res) => {
    const { user, items } = req.body;
    
    try {
        const total = await calculateTotal(items);
        const order = new Order({ user, items, total });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

const calculateTotal = async (items) => {
    let total = 0;
    for (const item of items) {
        const food = await Food.findById(item.food);
        total += food.price * item.quantity;
    }
    return total;
};

module.exports = router;
