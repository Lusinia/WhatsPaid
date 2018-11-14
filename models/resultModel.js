const mongoose = require('mongoose');

const ResultSchema = {
  debit: Number,
  credit: Number,
  currency: {
    type: String,
    default: 'грн'
  }
};

module.exports = mongoose.model('Result', ResultSchema);
