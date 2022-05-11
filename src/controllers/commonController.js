const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const Company = require('../models/Company');
//@desc         FOR TESTING: Login = uid
//@route        GET /api/auth/login
//@access       PUBLIC
const checkEmailUser = catchAsync(async (req, res, next) => {
	const { email } = req.query;

	const company = await Company.findOne({ email });

	if (company) {
		return next(
			new AppError(
				'The email address has been registered for an employee account. Please sign up for the employer site with another email.',
				400
			)
		);
	}

	res.status(200).json({
		message: 'The email address is available',
	});
});

module.exports = { checkEmailUser };
