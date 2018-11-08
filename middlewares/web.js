const { createReadStream } = require('fs');
const path  = require('path');

module.exports = async (ctx, next) => {
  if (ctx.response.status === 404) {
    ctx.type = 'html';
    ctx.body = createReadStream(path.join(__dirname, '/../../views/index.html'));
  }
  await next();
 };
