const jwt = require('jsonwebtoken');

const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/User');

//@desc         FOR TESTING: Login = uid
//@route        POST /api/auth/login
//@access       PUBLIC
const login = catchAsync(async (req, res, next) => {
	const user = await User.findById(req.body._id);

	if (!user) {
		return res.status(200).send({ message: 'User was not found' });
	}
	createSendToken(user, 200, res);
});

const signUp = catchAsync(async (req, res, next) => {
	try {
		const input = req.body;
		const user = await User.create(input);

		createSendToken(user, 200, res);
	} catch (error) {
		// if user exist, send accessToken to response
		const user = await User.findById(req.body._id);
		createSendToken(user, 200, res);
	}
});

const createSendToken = (user, statusCode, res) => {
	const accessToken = signToken(user._id);

	res.status(statusCode).json({
		accessToken,
		user,
	});
};

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

module.exports = { login, signUp };
