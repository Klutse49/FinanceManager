const express = require('express');
const router = express.Router();
const Transaction = require('../models/C');

// Get financial data for chart
router.get('/finance-data', async (req, res) => {
    try {
        const userId = req.user._id; // Assuming you have the user id from the session or JWT token
        const aggregation = await Transaction.aggregate([
            { $match: { user: userId } },
            { $group: { _id: "$category", totalAmount: { $sum: "$amount" } } }
        ]);
        res.json(aggregation.map(data => ({ category: data._id, value: data.totalAmount })));
    } catch (error) {
        console.error('Error fetching finance data:', error);
        res.status(500).json({ message: 'Failed to fetch finance data' });
    }
});

module.exports = router;
