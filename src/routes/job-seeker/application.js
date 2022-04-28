const express = require('express');

const router = express.Router();

const applicationController = require('../../controllers/job-seeker/applicationContronller');

router
	.route('/')
	.get(applicationController.getApplications)
	.post(applicationController.createApplication);

router
	.route('/:id')
	.get(applicationController.getApplicationDetail)
	.put(applicationController.updateApplication)
	.delete(applicationController.deleteApplication);
module.exports = router;
