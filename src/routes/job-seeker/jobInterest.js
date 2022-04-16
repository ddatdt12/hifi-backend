const express = require('express');

const router = express.Router();

const jobInterestController = require('../../controllers/job-seeker/jobInterestController');

router
	.route('/')
	.get(jobInterestController.getJobInterests)
	.post(jobInterestController.createJobInterest);

router
	.route('/:id')
	.put(jobInterestController.updatejobInterest)
	.delete(jobInterestController.deleteJobInterest);
module.exports = router;
