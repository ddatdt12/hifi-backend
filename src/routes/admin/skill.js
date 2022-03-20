const express = require('express');

const router = express.Router();
const { skillController } = require('../../controllers/admin');

router
	.route('/')
	.get(skillController.getAllSkills)
	.post(skillController.createSkills);

module.exports = router;
