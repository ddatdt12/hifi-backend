const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/AppError');
const User = require('../../models/User');
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
//@route        POST /api/user/me
//@access       PUBLIC
const updateMe = catchAsync(async (req, res) => {
	const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
		new: true,
		runValidators: true,
	});
	res.status(200).json({
		message: 'Get me successfully',
		data: updatedUser,
	});
});

module.exports = { getMe, updateMe };
