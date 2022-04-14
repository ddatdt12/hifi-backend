const { Company } = require('../../models');
const catchAsync = require('../../utils/catchAsync');

const getAllCompany = catchAsync(async (req, res, next) => {
	const { name, status } = req.query;

	const companies = await Company.find({
		name: name && { $regex: name || '', $options: 'i' },
		accountStatus: status,
	})
		.populate('industries')
		.lean();

	res.status(200).json({
		message: 'Get all companies',
		value: companies,
	});
});

const approveNewCompany = catchAsync(async (req, res, next) => {
	const { message } = req.body;
	const { id } = req.params;

	var result = await Company.updateOne(
		{ _id: id },
		{ accountStatus: 'fullfilled' }
	);

	res.status(200).json({
		message: 'Approve company success',
		value: result,
	});
});

const rejectNewCompany = catchAsync(async (req, res, next) => {
	const { message } = req.body;
	const { id } = req.params;

	var result = await Company.updateOne(
		{ _id: id },
		{ accountStatus: 'rejected' }
	);

	res.status(200).json({
		message: 'Reject company success',
		value: result,
	});
});

const deleteCompany = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	var result = await Company.updateOne(
		{ _id: id },
		{ accountStatus: 'deleted' }
	);

	res.status(200).json({
		message: 'Reject company success',
		value: result,
	});
});

module.exports = {
	getAllCompany,
	approveNewCompany,
	rejectNewCompany,
	deleteCompany,
};
