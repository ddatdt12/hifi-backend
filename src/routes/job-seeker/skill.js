const express = require('express');

const router = express.Router();

const skillController = require('../../controllers/job-seeker/skillController');

router
	.route('/')
	.get(skillController.getSkills)
	.post(skillController.updateSkills);

module.exports = router;
