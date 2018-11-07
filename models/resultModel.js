const mongoose = require('mongoose');

const ResultSchema = {
  costs: Number,
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  currency: {
    type: String,
    default: 'грн'
  }
};

module.exports = mongoose.model('Result', ResultSchema);
