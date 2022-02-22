const express = require('express');

const router = express.Router();
const userRoute = require('./user');

const { login } = require('../../controllers/admin');
const { requireAdmin } = require('../../middlewares/auth');

router.post('/auth/login', login);

router.use('/users', userRoute);

module.exports = router;
