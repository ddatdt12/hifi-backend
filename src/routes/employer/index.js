const express = require('express');

const router = express.Router();
const postRoute = require('./post');
const authRoute = require('./auth');

router.use('/posts', postRoute);
router.use('/auth', authRoute);

module.exports = router;
