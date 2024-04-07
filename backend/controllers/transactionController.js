const Transaction = require('../models/Transaction');

// Get all transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Create a new transaction
exports.createTransaction = async (req, res) => {
  try {
    // Simple validation
    if (!req.body.type || !req.body.amount) {
      return res.status(400).json({ success: false, message: "Please add type and amount." });
    }

    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).json({ success: true, data: transaction });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ success: false, message: "No transaction found" });
    }

    await transaction.remove();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
