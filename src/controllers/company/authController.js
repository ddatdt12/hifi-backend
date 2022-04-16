const AppError = require('../../utils/AppError');
const catchAsync = require('../../utils/catchAsync');
const Company = require('../../models/Company');

//@desc         employer login
//@route        GET /api/employer/auth/login
//@access       PUBLIC
const login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;
	let company = await Company.findOne({ email }).select('+password');
	if (!company) {
		return next(new AppError('Email is not registered', 404));
	}
	const isMatch = await company.comparePassword(password);
	if (!isMatch) {
		return next(new AppError('Email or password is incorrect', 401));
	}
	company = await Company.populate(company, { path: 'industries' });
	res.status(200).json({
		message: 'Login sucessfully',
		data: company,
		accessToken: company.generateToken(),
	});
});

//@desc         employer register
//@route        GET /api/employer/auth/register
//@access       PUBLIC
const register = catchAsync(async (req, res, next) => {
	const { email, password, confirmPassword, location } = req.body;

	if (password !== confirmPassword) {
		return next(
			new AppError("Password and confirm password doesn't match", 400)
		);
	}
	const company = await Company.findOne({ email });
	if (company) {
		return next(new AppError('Email is already registered', 404));
	}

	req.body.locations = [location];
	const newCompany = await Company.create(req.body);
	newCompany.password = undefined;
	res.status(200).json({
		message: 'Register sucessfully',
		data: newCompany,
		accessToken: newCompany.generateToken(),
	});
});

//@desc         employer register
//@route        GET /api/employer/auth/register
//@access       PUBLIC
const verifyAccessToken = catchAsync(async (req, res, next) => {
	res.status(200).json({
		message: 'User is logged in',
		data: req.user,
	});
});

module.exports = { login, register, verifyAccessToken };
