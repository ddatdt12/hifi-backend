const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/AppError');
const WorkExperience = require('../../models/WorkExperience');

//@desc         get me
//@route        POST /api/user/me
//@access       PUBLIC
const getWorkExperiences = catchAsync(async (req, res) => {
	const workExperiences = await WorkExperience.find({ userId: req.user._id });
	res.status(200).json({
		message: 'Get award successfully',
		data: workExperiences,
	});
});
const createWorkExperience = catchAsync(async (req, res) => {
	const workExp = await WorkExperience.create({
		...req.body,
		userId: req.user._id,
	});

	res.status(200).json({
		message: 'create work experience successfully',
		data: workExp,
	});
});
const updateWorkExperience = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const award = await WorkExperience.findById(id);
	if (!award || award.userId.toString() !== req.user._id.toString()) {
		return next(new AppError('No award found with that id', 404));
	}

	const updatedWorkExp = await WorkExperience.findByIdAndUpdate(
		id,
		{ ...req.body },
		{ new: true, runValidators: true }
	);
	res.status(200).json({
		message: 'update work experience successfully',
		data: updatedWorkExp,
	});
});
const deleteWorkExperience = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const workExp = await WorkExperience.findById(id);
	if (!workExp || workExp.userId.toString() !== req.user._id.toString()) {
		return next(new AppError('No award found with that id', 404));
	}

	await WorkExperience.findByIdAndDelete(id);
	res.status(200).json({
		message: 'delete award successfully',
	});
});

module.exports = {
	getWorkExperiences,
	createWorkExperience,
	updateWorkExperience,
	deleteWorkExperience,
};
