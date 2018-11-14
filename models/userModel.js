const mongoose = require('mongoose');

const UserSchema = {
  idToken: String,
  result: { type: mongoose.Schema.Types.ObjectId, ref: 'Result'},
  tasks: { type: mongoose.Schema.Types.ObjectId, ref: 'Task'}
};

module.exports = mongoose.model('User', UserSchema);
