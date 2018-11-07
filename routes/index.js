const router = require('koa-router')();

const taskRoutes = require('./taskRoutes');

router.use('/api/tasks', taskRoutes);


module.exports = router;
