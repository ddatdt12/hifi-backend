const User = require('../../models/User');
const AppError = require('../../utils/AppError');
const { User } = require('../../models');
const catchAsync = require('../../utils/catchAsync');

//@desc         get user information
//@route        GET /api/admin/users
//@access       PRIVATE
const getUsers = catchAsync(async (req, res) => {
	const users = await User.find({});
	res.status(200).json({
		message: 'getUsers route',
		data: users,
	});
});

module.exports = { getUsers };
