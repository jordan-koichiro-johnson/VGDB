const router = require('express').Router();
const apiRoutes = require('./api');

// profile, userlogin, userSignup are all in here
router.use('/api', apiRoutes);

module.exports = router;