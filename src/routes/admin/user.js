const express = require('express');

const router = express.Router();
const { userController } = require('../../controllers/admin');

router.get('/', userController.getUsers);

module.exports = router;
