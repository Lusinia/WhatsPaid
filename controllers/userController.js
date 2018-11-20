const User = require('../models/userModel');

const getUser = async (ctx) => {
  const { token } = ctx.request.body;
  if (token) {
    const user = await User.findOne({ idToken: token });
    if (!user) {
      const newUser = await User.create({ idToken: token });
      ctx.sendOK(newUser);
    } else {
      ctx.sendOK(user);
    }
  } else {
    ctx.sendError('no token found');
  }
};

const setDebit = async (ctx) => {
  const { data } = ctx.request.body;
  if (ctx.user) {
    try {
      const result = await User.findOneAndUpdate({
        _id: ctx.user._id
      }, { $set: { 'result.debit': data } }, { new: true });
      ctx.sendOK(result);
    } catch (e) {
      ctx.sendError(e.message);
    }
  } else {
    ctx.sendError('no user found');
  }
};

module.exports = {
  getUser,
  setDebit,
};
