const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/AppError');
//@desc         get me
//@route        POST /api/user/me
//@access       PUBLIC
const getMe = catchAsync(async (req, res) => {
	res.status(200).json({
		message: 'Get me successfully',
		data: req.user,
	});
});

module.exports = { getMe };
