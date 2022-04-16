const express = require('express');

const router = express.Router();

const volunteeringController = require('../../controllers/job-seeker/volunteeringController');

router
	.route('/')
	.get(volunteeringController.getVolunteerings)
	.post(volunteeringController.createVolunteering);

router
	.route('/:id')
	.put(volunteeringController.updateVolunteering)
	.delete(volunteeringController.deleteVolunteering);
module.exports = router;
