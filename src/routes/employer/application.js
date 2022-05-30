const express = require('express');

const router = express.Router();

const { applicationContronller } = require('../../controllers/company');

router.route('/posts/:postId').get(applicationContronller.getAllApplications);
router.route('/:id').patch(applicationContronller.updateApplication);

module.exports = router;
