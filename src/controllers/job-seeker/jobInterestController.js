const catchAsync = require('../../utils/catchAsync');
const JobInterest = require('../../models/JobInterest');
const AppError = require('../../utils/AppError');

//@desc         get me
//@route        POST /api/user/me
//@access       PUBLIC
const getJobInterests = catchAsync(async (req, res) => {
	const education = await JobInterest.findOne({ userId: req.user._id });
	res.status(200).json({
		message: 'Get educations successfully',
		data: education,
	});
});
const createJobInterest = catchAsync(async (req, res) => {
	const jobInterest = await JobInterest.create({
		...req.body,
		userId: req.user._id,
	});

	res.status(200).json({
		message: 'create job interest successfully',
		data: jobInterest,
	});
});
const updatejobInterest = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const jobInterest = await JobInterest.findById(id);
	if (
		jobInterest &&
		jobInterest.userId.toString() !== req.user._id.toString()
	) {
		return next(new AppError('No job interest found with that id', 404));
	}

	const updatedJobInterest = await JobInterest.findByIdAndUpdate(
		id,
		{ ...req.body },
		{ new: true, runValidators: true }
	);
	res.status(200).json({
		message: 'update award successfully',
		data: updatedJobInterest,
	});
});
const deleteJobInterest = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const education = await JobInterest.findById(id);
	if (!education || education.userId.toString() !== req.user._id.toString()) {
		return next(new AppError('No award found with that id', 404));
	}

	await JobInterest.findByIdAndDelete(id);
	res.status(200).json({
		message: 'delete award successfully',
	});
});

module.exports = {
	getJobInterests,
	createJobInterest,
	updatejobInterest,
	deleteJobInterest,
};
