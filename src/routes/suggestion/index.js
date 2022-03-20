const express = require('express');

const router = express.Router();
const suggestionController = require('../../controllers/suggestion');

router.get('/skills', suggestionController.getSkills);
router.get('/categories', suggestionController.getAllCategory);

module.exports = router;
