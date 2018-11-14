const User = require('../models/userModel');

const getUser = async (ctx) => {
  const { token } = ctx.request.body;

  const user = await User.findOne({ idToken: token });
  if (!user) {
    await User.create({ idToken: token });
  }
  ctx.sendOK('Ok');
};

module.exports = {
  getUser
};
