const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Ensure URI is obtained from environment variables
        const uri = process.env.MONGODB_URI;

        if (!uri) {
            throw new Error('MongoDB URI is not defined in environment variables');
        }

        // Connect to MongoDB
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        // Exit process with failure code if connection fails
        process.exit(1);
    }
};

module.exports = connectDB;
