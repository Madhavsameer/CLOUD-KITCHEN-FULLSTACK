const express = require('express');
const router = express.Router();
const Food = require('../models/Food');

// Get all foods
router.get('/', async (req, res) => {
    try {
        const foods = await Food.find();
        res.json(foods);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Add a new food item
router.post('/', async (req, res) => {
    const { name, description, price, category, imageUrl } = req.body;

    try {
        const food = new Food({ name, description, price, category, imageUrl });
        await food.save();
        res.status(201).json(food);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
