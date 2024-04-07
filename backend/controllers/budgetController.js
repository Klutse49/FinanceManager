const Budget = require('../models/Budget');

// Get all budgets for a user
exports.getBudgets = async (req, res) => {
    try {
        // Assuming you have a middleware to set req.user based on the JWT token
        const budgets = await Budget.find({ user: req.user.id });
        res.json(budgets);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// Create a new budget
exports.createBudget = async (req, res) => {
    try {
        const newBudget = new Budget({
            ...req.body,
            user: req.user.id // Ensure the user is attached to the budget
        });

        const budget = await newBudget.save();
        res.status(201).json(budget);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// Update an existing budget
exports.updateBudget = async (req, res) => {
    try {
        let budget = await Budget.findById(req.params.id);

        if (!budget) {
            return res.status(404).json({ msg: 'Budget not found' });
        }

        // Ensure the logged-in user is the owner of the budget
        if (budget.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        budget = await Budget.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(budget);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// Delete a budget
exports.deleteBudget = async (req, res) => {
    try {
        const budget = await Budget.findById(req.params.id);

        if (!budget) {
            return res.status(404).json({ msg: 'Budget not found' });
        }

        // Ensure the logged-in user is the owner of the budget
        if (budget.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await Budget.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Budget removed' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};
