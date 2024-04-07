const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

const Resource = mongoose.model('Resource', resourceSchema);
