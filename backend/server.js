const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors'); // Add this line

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors()); // Use CORS middleware

// Routes
app.use('/api/auth', authRoutes);
// app.use('/api/foods', foodRoutes);
// app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
