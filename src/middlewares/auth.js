const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Company = require('../models/Company');
const User = require('../models/User');

const protectEmployer = catchAsync(async (req, res, next) => {
	// 1) Getting token and check of it's there
	let accessToken;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		accessToken = req.headers.authorization.split(' ')[1];
	}

	if (!accessToken) {
		return next(
			new AppError(
				'You are not logged in! Please log in to get access.',
				401
			)
		);
	}

	let decoded;
	// 2) Verification token
	try {
		decoded = await promisify(jwt.verify)(
			accessToken,
			process.env.JWT_SECRET
		);
	} catch (error) {
		return next(new AppError('Invalid Token', 403));
	}

	console.log('Decode: ', decoded);
	// 3) Check if user still exists
	const currentUser = await Company.findById(decoded.id);
	if (!currentUser) {
		return next(
			new AppError(
				'The user belonging to this token does no longer exist.',
				401
			)
		);
	}

	// GRANT ACCESS TO PROTECTED ROUTE
	req.user = currentUser;
	next();
});

const protectJobSeeker = catchAsync(async (req, res, next) => {
	// 1) Getting token and check of it's there
	let accessToken;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		accessToken = req.headers.authorization.split(' ')[1];
	} else if (req.cookies.accessToken) {
		console.log('Mic check: ', req.cookies);
		accessToken = req.cookies.accessToken;
	}
	if (!accessToken) {
		return next(
			new AppError(
				'You are not logged in! Please log in to get access.',
				401
			)
		);
	}

	let decoded;
	// 2) Verification token
	try {
		decoded = await promisify(jwt.verify)(
			accessToken,
			process.env.JWT_SECRET
		);
	} catch (error) {
		return next(new AppError('Invalid Token', 403));
	}

	// 3) Check if user still exists
	const currentUser = await User.findById(decoded.id);
	if (!currentUser) {
		return next(
			new AppError(
				'The user belonging to this token does no longer exist.',
				401
			)
		);
	}

	// GRANT ACCESS TO PROTECTED ROUTE
	req.user = currentUser;
	next();
});

module.exports = { protectEmployer, protectJobSeeker };
