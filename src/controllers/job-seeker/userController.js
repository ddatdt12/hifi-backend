const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/AppError');
const User = require('../../models/User');
const JobInterest = require('../../models/JobInterest');
//@desc         get me
//@route        GET /api/user/me
//@access       PUBLIC
const getMe = catchAsync(async (req, res) => {
	res.status(200).json({
		message: 'Get me successfully',
		data: req.user,
	});
});

//@desc         update profile
//@route        PUT /api/job-seeker/me
//@access       PUBLIC
const updateMe = catchAsync(async (req, res, next) => {
	if (req.body.candidateStatus) {
		const candidateStatus = req.body.candidateStatus;
		if (candidateStatus !== 'I_AM_LOOKING_FOR_JOB') {
			req.body.preferredStartDate = null;
		} else if (!req.body.preferredStartDate) {
			return next(
				new AppError('Please provide preferred start date', 400)
			);
		}
		await JobInterest.findOne({ userId: req.user._id })
			.then((jobInterest) => {
				jobInterest.preferredStartDate = req.body.preferredStartDate;
				return jobInterest.save();
			})
			.catch((err) => {
				console.log(err);
			});
	}
	const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
		new: true,
		runValidators: true,
	});
	res.status(200).json({
		message: 'Update me successfully',
		data: updatedUser,
	});
});

module.exports = { getMe, updateMe };
