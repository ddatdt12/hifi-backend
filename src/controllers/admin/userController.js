const AppError = require('../../utils/AppError');
const { User } = require('../../models');
const catchAsync = require('../../utils/catchAsync');

//@desc         get user information
//@route        GET /api/admin/users
//@access       PRIVATE
const getUsers = catchAsync(async (req, res, next) => {
	const users = await User.find({}).lean();
	res.status(200).json({
		message: 'getUsers route',
		value: users,
	});
});

module.exports = { getUsers };
