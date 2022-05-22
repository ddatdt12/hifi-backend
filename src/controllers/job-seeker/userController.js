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
const updateMe = catchAsync(async (req, res) => {
	if (req.body.candidateStatus) {
		const candidateStatus = req.body.candidateStatus;
		await JobInterest.findOne({ userId: req.user._id })
			.then((jobInterest) => {
				jobInterest.candidateStatus = candidateStatus;
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
