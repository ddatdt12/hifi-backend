const catchAsync = require('../../utils/catchAsync');
const Application = require('../../models/Application');
const AppError = require('../../utils/AppError');

//@desc         get me
//@route        POST /api/user/me
//@access       PUBLIC
const getApplications = catchAsync(async (req, res) => {
	const applications = await Application.find()
		.populate('user')
		.populate('post');
	res.status(200).json({
		message: 'Get applications successfully',
		data: applications,
	});
});

const updateApplication = catchAsync(async (req, res) => {
	const { id } = req.params;
	const { resume, phoneNumber, coverLetter } = req.body;
	const updatedApplication = await Application.findByIdAndUpdate(
		id,
		{ resume, phoneNumber, coverLetter },
		{ new: true, runValidators: true }
	);
	res.status(200).json({
		message: 'update application successfully',
		data: updatedApplication,
	});
});

const deleteApplication = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const app = await Application.findById(id);
	if (!app || app.userId.toString() !== req.user._id.toString()) {
		return next(new AppError('No Application found with that id', 404));
	}

	await Application.findByIdAndDelete(id);
	res.status(200).json({
		message: 'delete Application successfully',
	});
});

module.exports = {
	getApplications,
	updateApplication,
	deleteApplication,
};
