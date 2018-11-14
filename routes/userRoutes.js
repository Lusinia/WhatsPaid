const router = require('koa-router')();
const controller = require('../controllers/userController');

router.post('/', controller.getUser);

module.exports = router.routes();
