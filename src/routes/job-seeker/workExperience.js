const express = require('express');

const router = express.Router();

const workExperienceController = require('../../controllers/job-seeker/workExperienceController');

router
	.route('/')
	.get(workExperienceController.getWorkExperiences)
	.post(workExperienceController.createWorkExperience);

router
	.route('/:id')
	.put(workExperienceController.updateWorkExperience)
	.delete(workExperienceController.deleteWorkExperience);
module.exports = router;
