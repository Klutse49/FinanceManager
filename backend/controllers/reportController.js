const Transaction = require('../models/Transaction');

exports.generateReport = async (req, res) => {
    const { year, month } = req.params; // Expecting year and month in the request parameters
    const userId = req.user.id; // Assuming authentication middleware sets req.user

    try {
        // Convert month to zero-indexed number (e.g., January = 0, December = 11)
        const monthIndex = parseInt(month, 10) - 1;

        const startDate = new Date(Date.UTC(year, monthIndex, 1, 0, 0, 0));
        const endDate = new Date(Date.UTC(year, monthIndex + 1, 0, 23, 59, 59));

        const transactions = await Transaction.aggregate([
            {
                $match: {
                    user: userId,
                    date: { $gte: startDate, $lte: endDate }
                }
            },
            {
                $group: {
                    _id: '$category', // Group by category
                    totalAmount: { $sum: '$amount' }, // Sum amounts by category
                    count: { $sum: 1 } // Count transactions by category
                }
            },
            {
                $lookup: { // Optional: Populate category details if you have a separate category collection
                    from: 'categories', // Should match your categories collection name
                    localField: '_id',
                    foreignField: '_id',
                    as: 'categoryDetails'
                }
            }
        ]);

        if (!transactions.length) {
            return res.status(404).json({ msg: 'No transactions found for the specified period' });
        }

        res.json({ year, month, transactions });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};
