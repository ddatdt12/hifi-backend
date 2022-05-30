const catchAsync = require('../../utils/catchAsync');
const User = require('../../models/User');
const Volunteering = require('../../models/Volunteering');
const AppError = require('../../utils/AppError');

//@desc         get me
//@route        POST /api/user/me
//@access       PUBLIC
const getVolunteerings = catchAsync(async (req, res) => {
	const voluns = await Volunteering.find({ userId: req.user._id });
	res.status(200).json({
		message: 'Get volunteerings successfully',
		data: voluns,
	});
});
const createVolunteering = catchAsync(async (req, res) => {
	const award = await Volunteering.create({
		...req.body,
		userId: req.user._id,
	});

	res.status(200).json({
		message: 'create award successfully',
		data: award,
	});
});
const updateVolunteering = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const volunteer = await Volunteering.findById(id);
	if (!volunteer || volunteer.userId.toString() !== req.user._id.toString()) {
		return next(
			new AppError('No volunteering experience found with that id', 404)
		);
	}

	const updatedExperience = await Volunteering.findByIdAndUpdate(
		id,
		{ ...req.body },
		{ new: true, runValidators: true }
	);
	res.status(200).json({
		message: 'update volunteering successfully',
		data: updatedExperience,
	});
});
const deleteVolunteering = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const volunteering = await Volunteering.findById(id);
	if (
		!volunteering ||
		volunteering.userId.toString() !== req.user._id.toString()
	) {
		return next(new AppError('No volunteering found with that id', 404));
	}

	await Volunteering.findByIdAndDelete(id);
	res.status(200).json({
		message: 'delete volunteering successfully',
	});
});

module.exports = {
	getVolunteerings,
	createVolunteering,
	updateVolunteering,
	deleteVolunteering,
};
