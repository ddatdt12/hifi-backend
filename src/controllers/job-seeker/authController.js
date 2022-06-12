const jwt = require('jsonwebtoken');

const catchAsync = require('../../utils/catchAsync');
const User = require('../../models/User');
const AppError = require('../../utils/AppError');
//@desc
//@route        GET /api/auth
//@access       PUBLIC
const authenicate = catchAsync(async (req, res, next) => {
	res.status(200).json({
		data: req.user,
	});
});

//@desc         FOR TESTING: Login = uid
//@route        POST /api/auth/login
//@access       PUBLIC
const login = catchAsync(async (req, res, next) => {
	const { uid, signInProvider = 'password' } = req.body;
	let user = await User.findOne({ uid });

	if (!user) {
		if (signInProvider === 'password') {
			return next(new AppError('User was not found', 404));
		}

		user = await User.create({
			...req.body,
		});
	}
	createSendToken(user, 200, res);
});

const register = catchAsync(async (req, res) => {
	const { uid, signInProvider, email, name, photoUrl } = req.body;

	const newUser = await User.create({
		uid,
		signInProvider,
		email,
		name,
		photoUrl,
	});

	createSendToken(newUser, 200, res);
});

const setJWTCookie = (res, cookies = 'over', expires = 5 * 1000) => {
	res.cookie('accessToken', cookies, {
		expires: new Date(Date.now() + expires),
		secure: process.env.NODE_ENV === 'development' ? false : true,
		httpOnly: true,
		sameSite: process.env.NODE_ENV === 'development' ? true : 'none',
		domain: process.env.NODE_ENV === 'development' ? '' : 'hifi.vercel.app',
		// secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
	});
};

const createSendToken = (user, statusCode, res) => {
	const accessToken = signToken(user._id);

	setJWTCookie(
		res,
		accessToken,
		process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
	);

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

module.exports = { login, register, authenicate };
