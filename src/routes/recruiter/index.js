const express = require('express');

const router = express.Router();
const postRoute = require('./post');

router.use('/posts', postRoute);

module.exports = router;
