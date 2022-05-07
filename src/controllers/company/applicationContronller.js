const catchAsync = require('../../utils/catchAsync');
const Application = require('../../models/Application');
const AppError = require('../../utils/AppError');

const getAllApplications = catchAsync(async (req, res) => {
	const { postId } = req.params;
	const applications = await Application.find({ postId: postId })
		.populate('user')
		.lean();
	res.status(200).json({
		message: 'Get all applications successfully',
		data: applications,
	});
});

// const updateApplication = catchAsync(async (req, res, next) => {
// 	const { id } = req.params;
// 	const { resume, phoneNumber, coverLetter } = req.body;
// 	const application = await Application.findById(id);
// 	if (
// 		!application ||
// 		application.userId.toString() !== req.user._id.toString()
// 	) {
// 		return next(new AppError('No Application found with that id', 404));
// 	}

// 	const updatedApplication = await Application.findByIdAndUpdate(
// 		id,
// 		{ resume, phoneNumber, coverLetter },
// 		{ new: true, runValidators: true }
// 	);
// 	res.status(200).json({
// 		message: 'update application successfully',
// 		data: updatedApplication,
// 	});
// });

// const deleteApplication = catchAsync(async (req, res, next) => {
// 	const { id } = req.params;

// 	const app = await Application.findById(id);
// 	if (!app || app.userId.toString() !== req.user._id.toString()) {
// 		return next(new AppError('No Application found with that id', 404));
// 	}

// 	await Application.findByIdAndDelete(id);
// 	res.status(200).json({
// 		message: 'delete Application successfully',
// 	});
// });

module.exports = {
	getAllApplications,
};
