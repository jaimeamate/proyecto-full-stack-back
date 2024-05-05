const router = require('express').Router();
const apiUserRouter = require('@routes/api/userRoutes');
const apiAuthRouter = require('@routes/api/authRoutes');

router.use('/user', apiUserRouter);
router.use('/auth', apiAuthRouter);

module.exports = router;
