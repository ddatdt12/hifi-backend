const catchAsync = require('../../utils/catchAsync');
const Application = require('../../models/Application');
const AppError = require('../../utils/AppError');
const Company = require('../../models/Company');
const Post = require('../../models/Post');

//@desc         get me
//@route        POST /api/user/me
//@access       PUBLIC
const getApplications = catchAsync(async (req, res) => {
	const applications = await Application.find({ userId: req.user._id })
		.populate('user')
		.populate('post');
	res.status(200).json({
		message: 'Get Application successfully',
		data: applications,
	});
});
const createApplication = catchAsync(async (req, res, next) => {
	const { postId, resume, phoneNumber, coverLetter } = req.body;

	const post = await Post.findById(postId);

	if (!post) {
		return next(new AppError('Job Post not found', 404));
	}
	const existApp = await Application.findOne({
		userId: req.user._id,
		postId: postId,
	});
	if (existApp) {
		return next(new AppError('You have already applied for this job', 400));
	}
	const application = await Application.create({
		postId,
		resume,
		phoneNumber,
		coverLetter,
		userId: req.user._id,
	});

	res.status(200).json({
		message: 'create application successfully',
		data: application,
	});
});

const updateApplication = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const { resume, phoneNumber, coverLetter } = req.body;
	const application = await Application.findById(id);
	if (
		!application ||
		application.userId.toString() !== req.user._id.toString()
	) {
		return next(new AppError('No Application found with that id', 404));
	}

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
	createApplication,
	updateApplication,
	deleteApplication,
};
