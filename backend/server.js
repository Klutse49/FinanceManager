require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware to parse cookies and JSON bodies
app.use(cookieParser());
app.use(express.json());

// Set CORS for development
app.use(cors({
    origin: 'http://localhost:3000'
}));

// Connect to MongoDB
connectDB();

// Define routes
const resourceRoutes = require('./routes/resourceRoutes');
const contactFormRoutes = require('./routes/contactFormRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const reportRoutes = require('./routes/reportRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const authRoutes = require('./routes/authRoutes');

// Mount routes
app.use('/api/resources', resourceRoutes);
app.use('/api/contact', contactFormRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/auth', authRoutes);


app.post('/login', (req, res) => {
    const refreshToken = 'some_secure_token_here';
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        path: '/',
        sameSite: 'strict'
    });
    res.send('Logged in successfully');
});

// Test route to ensure API is running
app.get('/', (req, res) => res.send('API Running'));

// Fallback error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
