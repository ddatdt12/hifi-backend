const catchAsync = require('../../utils/catchAsync');
const User = require('../../models/User');
const Education = require('../../models/Education');
const AppError = require('../../utils/AppError');

//@desc         get me
//@route        POST /api/user/me
//@access       PUBLIC
const getEducations = catchAsync(async (req, res) => {
	const educations = await Education.find({ userId: req.user._id });
	res.status(200).json({
		message: 'Get educations successfully',
		data: educations,
	});
});
const createEducation = catchAsync(async (req, res, next) => {
	const { isPresent, endDate } = req.body;

	if (!isPresent && !endDate) {
		return next(new AppError('Please provide end date', 400));
	}
	const education = await Education.create({
		...req.body,
		userId: req.user._id,
	});

	res.status(200).json({
		message: 'create education successfully',
		data: education,
	});
});
const updateEducation = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const { isPresent, endDate } = req.body;

	const education = await Education.findById(id);

	if (!education || education.userId.toString() !== req.user._id.toString()) {
		return next(new AppError('No education found with that id', 404));
	}
	if (isPresent === false && !education.endDate && !endDate) {
		return next(new AppError('Please provide end date', 400));
	}
	const updatedEducation = await Education.findByIdAndUpdate(
		id,
		{ ...req.body },
		{ new: true, runValidators: true }
	);
	res.status(200).json({
		message: 'update award successfully',
		data: updatedEducation,
	});
});
const deleteEducation = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const education = await Education.findById(id);
	if (!education || education.userId.toString() !== req.user._id.toString()) {
		return next(new AppError('No education found with that id', 404));
	}

	await Education.findByIdAndDelete(id);
	res.status(200).json({
		message: 'delete education successfully',
	});
});

module.exports = {
	getEducations,
	createEducation,
	updateEducation,
	deleteEducation,
};
