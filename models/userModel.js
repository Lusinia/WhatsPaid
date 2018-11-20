const mongoose = require('mongoose');

const UserSchema = {
  idToken: String,
  result: {
    debit:  {
      type: Number,
      default: 0
    },
    credit:  {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: 'грн'
    },
  },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task'}]
};

module.exports = mongoose.model('User', UserSchema);
