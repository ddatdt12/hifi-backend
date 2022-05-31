const express = require('express');

const router = express.Router();
const { skillController } = require('../../controllers/admin');

router
	.route('/')
	.get(skillController.getSkills)
	.post(skillController.createSkill);
router.post('/batch', skillController.createBatchSkills);
router
	.route('/:id')
	.put(skillController.updateSkill)
	.delete(skillController.deleteSkill);

module.exports = router;
