module.exports = async (ctx, next) => {
  ctx.sendOK = data => {
    ctx.response.status = 200;
    ctx.body = data;
  };

  ctx.sendCreated = data => {
    ctx.response.status = 201;
    ctx.body = data;
  };

  ctx.sendInfo = message => {
    ctx.body = message;
  };

  ctx.sendSuccess = () => {
    ctx.response.status = 200;
  };

  ctx.sendError = (error, status = 404) => {
    ctx.response.status = status;
    ctx.body = error;
  };

  await next();
};
