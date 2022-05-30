const catchAsync = require('../../utils/catchAsync');
const User = require('../../models/User');
const Award = require('../../models/Award');
const AppError = require('../../utils/AppError');

//@desc         get me
//@route        POST /api/user/me
//@access       PUBLIC
const getAwards = catchAsync(async (req, res) => {
	const awards = await Award.find({ userId: req.user._id });
	res.status(200).json({
		message: 'Get award successfully',
		data: awards,
	});
});
const createAward = catchAsync(async (req, res) => {
	const award = await Award.create({ ...req.body, userId: req.user._id });

	res.status(200).json({
		message: 'create award successfully',
		data: award,
	});
});
const updateAward = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const award = await Award.findById(id);
	if (!award || award.userId.toString() !== req.user._id.toString()) {
		return next(new AppError('No award found with that id', 404));
	}

	const updatedAward = await Award.findByIdAndUpdate(
		id,
		{ ...req.body },
		{ new: true, runValidators: true }
	);
	res.status(200).json({
		message: 'update award successfully',
		data: updatedAward,
	});
});
const deleteAward = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const award = await Award.findById(id);
	if (!award || award.userId.toString() !== req.user._id.toString()) {
		return next(new AppError('No award found with that id', 404));
	}

	await Award.findByIdAndDelete(id);
	res.status(200).json({
		message: 'delete award successfully',
	});
});

module.exports = { getAwards, createAward, updateAward, deleteAward };
