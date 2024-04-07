require('dotenv').config(); 
const express = require('express');
const connectDB = require('./config/db'); 

const app = express();

// Routes
const resourceRoutes = require('./routes/resourceRoutes');
const contactFormRoutes = require('./routes/contactformRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const reportRoutes = require('./routes/reportRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

// Connect to MongoDB
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Mount your route handlers
app.use('/api/resources', resourceRoutes);
app.use('/api/contact', contactFormRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/transactions', transactionRoutes);


// Test route to ensure API is running
app.get('/', (req, res) => res.send('API Running'));

// Fallback error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5000; // Default to port 5000 if environment variable not set
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
