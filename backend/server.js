require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet'); // Security middleware
const rateLimit = require('express-rate-limit'); // Basic rate limiting

// Import routes
const authRoutes = require('./routes/authRoutes');

// Initialize express app
const app = express();

// Basic rate limiting for all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Apply security middleware
app.use(helmet());

// Apply the rate limiter to all requests
app.use(limiter);

// Set up CORS middleware for development (adjust in production)
app.use(cors({
    origin: 'http://localhost:3000' // Adjust this in production
}));

// Middleware to parse cookies and JSON bodies
app.use(cookieParser());
app.use(express.json());

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

// Use routes
app.use('/api/auth', authRoutes);

// Basic route for testing server is up
app.get('/', (req, res) => res.send('API Running'));

// Fallback error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
