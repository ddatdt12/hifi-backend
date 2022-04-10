const jwt = require('jsonwebtoken');

const catchAsync = require('../../utils/catchAsync');
const User = require('../../models/User');
const AppError = require('../../utils/AppError');
//@desc         FOR TESTING: Login = uid
//@route        POST /api/auth/login
//@access       PUBLIC
const login = catchAsync(async (req, res, next) => {
	const user = await User.findOne({ uid: req.body.uid });

	typeof next === 'function' && console.log('Function');
	if (user) {
		return next(new Error('User was not found'));
	}
	createSendToken(user, 200, res);
});

const signUp = catchAsync(async (req, res) => {
	const { uid, signInProvider, email, name, photoUrl } = req.body;

	console.log(req.body);
	const newUser = await User.create({
		uid,
		signInProvider,
		email,
		name,
		photoUrl,
	});

	createSendToken(newUser, 200, res);
});

const createSendToken = (user, statusCode, res) => {
	const accessToken = signToken(user._id);

	res.status(statusCode).json({
		accessToken,
		data: user,
	});
};

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

module.exports = { login, signUp };
