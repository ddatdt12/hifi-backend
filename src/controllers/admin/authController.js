const AppError = require('../../utils/AppError');
const catchAsync = require('../../utils/catchAsync');
const Admin = require('../../models/Admin');

const login = catchAsync(async (req, res, next) => {
	const { username, password } = req.body;
	let admin = await Admin.findOne({ username }).select('+password');

	if (!admin) {
		return next(new AppError('Username is invalid', 404));
	}

	const isMatch = await admin.comparePassword(password);

	if (!isMatch) {
		return next(new AppError('Email or password is incorrect', 401));
	}

	res.status(200).json({
		message: 'Login sucessfully',
		data: admin,
		accessToken: admin.generateToken(),
	});
});

const verifyAccessToken = catchAsync(async (req, res, next) => {
	res.status(200).json({
		message: 'Admin is logged in',
		data: req.user,
	});
});

module.exports = { login, verifyAccessToken };
