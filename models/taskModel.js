const mongoose = require('mongoose');

const TaskSchema = {
  name: {
    type: String,
    required: true
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
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
};

module.exports = mongoose.model('Task', TaskSchema);
