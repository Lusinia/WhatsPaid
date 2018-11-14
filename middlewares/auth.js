const User = require('../models/userModel');

module.exports = async (ctx, next) => {
  if (ctx.request.header.authorization) {
    const idToken = ctx.request.header.authorization.split(' ')[1];
    const user = await User.findOne({ idToken });
    ctx.isAuth = !!user;
    ctx.user = user;
  }

  await next();
};
