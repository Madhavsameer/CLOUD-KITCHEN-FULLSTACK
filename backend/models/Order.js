// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [
        {
            food: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
            quantity: { type: Number, default: 1 }
        }
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, default: 'cart' }, // 'cart' for active carts, 'ordered' for placed orders
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
