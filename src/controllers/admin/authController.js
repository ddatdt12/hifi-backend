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
		return next(new AppError('Password is incorrect', 401));
	}

	res.status(200).json({
		message: 'Login sucessfully',
		data: admin,
		accessToken: admin.generateToken(),
	});
});

const resetPassword = catchAsync(async (req, res, next) => {
	const { username, password, confirmPassword } = req.body;

	if (password !== confirmPassword) {
		return next(
			new AppError("Password and confirm password doesn't match", 400)
		);
	}
	const admin = await Admin.findOne({
		username,
	});

	if (!admin) {
		return next(new AppError('Username is incorrect', 404));
	}

	await Admin.updateOne({ username }, { password: confirmPassword });

	res.status(200).json({
		message: 'Reset password sucessfully',
	});
});

const changePassword = catchAsync(async (req, res, next) => {
	const { username, currentPassword, password } = req.body;

	const admin = await Admin.findOne({
		username,
	});

	if (!admin) {
		return next(new AppError('Username is incorrect', 404));
	}

	const isMatch = await admin.comparePassword(currentPassword);

	if (!isMatch) {
		return next(new AppError('Current Password is incorrect', 401));
	}

	await Admin.updateOne({ username }, { password: password });

	res.status(200).json({
		message: 'Reset password sucessfully',
	});
});

const verifyAccessToken = catchAsync(async (req, res, next) => {
	res.status(200).json({
		message: 'Admin is logged in',
		data: req.user,
	});
});

module.exports = { login, verifyAccessToken, resetPassword, changePassword };
