const mongoose = require('mongoose');

const TaskSchema = {
  name: {
    type: String,
    required: true,
    trim: true
  },
  image: String,
  cost: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'грн'
  },
  date: {
    type: Date,
    default: new Date()
  }
};

module.exports = mongoose.model('Task', TaskSchema);
