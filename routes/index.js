const router = require('koa-router')();

const taskRoutes = require('./taskRoutes');
const userRoutes = require('./userRoutes');

router.use('/api/tasks', taskRoutes);
router.use('/api/auth', userRoutes);


module.exports = router;
