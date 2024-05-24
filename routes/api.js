const router = require('express').Router();
const apiUserRouter = require('@routes/api/userRoutes');
const apiAuthRouter = require('@routes/api/authRoutes');
const apiActivityRouter = require('@routes/api/activityRoutes');


router.use('/user', apiUserRouter);
router.use('/auth', apiAuthRouter);
router.use('/activity', apiActivityRouter);


module.exports = router;
