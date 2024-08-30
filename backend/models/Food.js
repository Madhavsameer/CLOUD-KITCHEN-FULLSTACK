const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category:{type: String, required:true},
    imageUrl: { type: String, default:"https://th.bing.com/th/id/OIP.d_YzL5iaa66seM5luZJIdAHaFj?rs=1&pid=ImgDetMain" }
});

module.exports = mongoose.model('Food', FoodSchema);
