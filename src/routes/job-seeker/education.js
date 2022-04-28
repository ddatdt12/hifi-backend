const express = require('express');

const router = express.Router();

const educationController = require('../../controllers/job-seeker/educationController');

router
	.route('/')
	.get(educationController.getEducations)
	.post(educationController.createEducation);

router
	.route('/:id')
	.put(educationController.updateEducation)
	.delete(educationController.deleteEducation);
module.exports = router;
