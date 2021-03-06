const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Company = require('../models/Company');
const User = require('../models/User');
const Admin = require('../models/Admin');

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

const checkUser = catchAsync(async (req, res, next) => {
	// 1) Getting token and check of it's there
	let accessToken;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		accessToken = req.headers.authorization.split(' ')[1];
	} else if (req.cookies.accessToken) {
		accessToken = req.cookies.accessToken;
	}
	if (!accessToken) {
		return next();
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

	const currentUser = await User.findById(decoded.id);
	if (currentUser) {
		req.idUser = currentUser._id;
	}

	next();
});

const protectAdmin = catchAsync(async (req, res, next) => {
	// 1) Getting token and check of it's there
	let accessToken;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		accessToken = req.headers.authorization.split(' ')[1];
	} else if (req.cookies.accessToken) {
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
	const currentAdmin = await Admin.findById(decoded.id);
	if (!currentAdmin) {
		return next(
			new AppError(
				'The user belonging to this token does no longer exist.',
				401
			)
		);
	}

	// GRANT ACCESS TO PROTECTED ROUTE
	currentAdmin.password = undefined;
	req.user = currentAdmin;
	next();
});

module.exports = {
	protectEmployer,
	protectJobSeeker,
	protectAdmin,
	checkUser,
};
