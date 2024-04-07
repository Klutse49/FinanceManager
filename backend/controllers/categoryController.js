const Category = require('../models/Category');

// Get all categories for a user
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ user: req.user.id });
        res.json(categories);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// Create a new category
exports.createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        // Prevent duplicate categories
        let category = await Category.findOne({ name, user: req.user.id });
        if (category) {
            return res.status(400).json({ msg: 'Category already exists' });
        }

        category = new Category({
            name,
            user: req.user.id
        });

        await category.save();
        res.status(201).json(category);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// Update an existing category
exports.updateCategory = async (req, res) => {
    const { name } = req.body;
    try {
        let category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }

        // Check user authorization
        if (category.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        category = await Category.findByIdAndUpdate(req.params.id, { $set: { name } }, { new: true });
        res.json(category);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }

        // Check user authorization
        if (category.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await Category.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Category removed' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};
