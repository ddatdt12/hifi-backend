const express = require('express');

const router = express.Router();

const awardController = require('../../controllers/job-seeker/awardController');

router
	.route('/')
	.get(awardController.getAwards)
	.post(awardController.createAward);

router
	.route('/:id')
	.put(awardController.updateAward)
	.delete(awardController.deleteAward);
module.exports = router;
