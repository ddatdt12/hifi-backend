const express = require('express');

const router = express.Router();
const { companyController } = require('../../controllers/admin');

router.route('/').get(companyController.getAllCompany);
router.route('/:id').delete(companyController.deleteCompany);
router.route('/:id/approve').post(companyController.approveNewCompany);
router.route('/:id/reject').post(companyController.rejectNewCompany);

module.exports = router;
