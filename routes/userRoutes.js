const router = require('koa-router')();
const controller = require('../controllers/userController');

router
  .post('/result', controller.setDebit)
  .post('/', controller.getUser);

module.exports = router.routes();
