const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

//@desc         FOR TESTING: Login = uid
//@route        GET /api/auth/login
//@access       PUBLIC
const checkEmailUser = catchAsync(async (req, res, next) => {
	return next(
		new AppError(
			'The email address has been registered for an employee account. Please sign up for the employer site with another email.',
			404
		)
	);
});

module.exports = { checkEmailUser };
