const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const User = require('../models/User');

const protect = catchAsync(async (req, res, next) => {
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
      new AppError('You are not logged in! Please log in to get access.', 401),
    );
  }

  let decoded;
  // 2) Verification token
  try {
    decoded = await promisify(jwt.verify)(accessToken, process.env.JWT_SECRET);
  } catch (error) {
    return next(new AppError('Invalid Token', 403));
  }

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401,
      ),
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

const requireAdmin = catchAsync(async (req, res, next) => {
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
      new AppError('You are not logged in! Please log in to get access.', 401),
    );
  }

  let decoded;
  // 2) Verification token
  try {
    decoded = await promisify(jwt.verify)(accessToken, process.env.JWT_SECRET);
  } catch (error) {
    return next(new AppError('Invalid Token', 401));
  }
  
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('Tài khoản không tồn tại', 404));
  }

  if (currentUser.role !== 'admin') {
    return next(new AppError('Bạn không có quyền truy cập!', 403));
  }
  next();
});

module.exports = { protect, requireAdmin };
