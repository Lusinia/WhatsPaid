const router = require('koa-router')();
const controller = require('../controllers/taskController');

router
  .get('/', controller.getAll)
  .get('/result', controller.getResult)
  .post('/', controller.createTask)
  .put('/:id', controller.updateTask)
  .delete('/:id', controller.deleteTask);

module.exports = router.routes();
