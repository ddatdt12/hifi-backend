const jwt = require('jsonwebtoken');

const AppError = require('../../utils/AppError');
const catchAsync = require('../../utils/catchAsync');

//@desc         FOR TESTING: Login = uid
//@route        POST /api/auth/login
//@access       PUBLIC
exports.login = catchAsync(async (req, res, next) => {
  createSendToken({ _id: 'test' }, 200, res);
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
