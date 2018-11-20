const User = require('../models/userModel');

module.exports = async (ctx, next) => {
  console.log('ctx.request.header.authorization', ctx.request.header.authorization);
  console.log('await User.find()', await User.find());
  if (ctx.request.header.authorization) {
    const idToken = ctx.request.header.authorization.split(' ')[1];
    const user = await User.findOne({ idToken });
    ctx.isAuth = !!user;
    ctx.user = user;
  }

  await next();
};
