const { Company } = require('../../models');
const { getOrSetCache, deleteKeyIfExist } = require('../../services/redis');
const catchAsync = require('../../utils/catchAsync');

const getAllCompany = catchAsync(async (req, res, next) => {
	const { name, status } = req.query;
	if (!name && !status) {
		const companies = await getOrSetCache('companies', () =>
			Company.find({})
		);
		return res.status(200).json({
			message: 'Get all companies',
			data: companies,
		});
	}

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
	const { id } = req.params;

	var result = await Company.updateOne(
		{ _id: id },
		{ accountStatus: 'fullfilled' }
	);
	await deleteKeyIfExist('companies');

	res.status(200).json({
		message: 'Approve company success',
		value: result,
	});
});

const rejectNewCompany = catchAsync(async (req, res, next) => {
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
