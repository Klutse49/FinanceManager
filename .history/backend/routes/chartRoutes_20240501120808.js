// routes/chartRoutes.js
const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');

// GET: Retrieve finance data for charts
router.get('/', async (req, res) => {
  try {
    const budgets = await Budget.find();
    console.log('Budgets:', budgets);

    if (budgets.length === 0) {
      return res.status(404).json({ message: 'No budgets found' });
    }

    const financeData = budgets.map(budget => ({
      _id: budget._id,
      category: budget.category,
      limit: budget.limit
    }));

    res.json(financeData);
  } catch (error) {
    console.error('Error fetching finance data:', error);
    res.status(500).json({ message: 'Error fetching finance data' });
  }
});

module.exports = router;