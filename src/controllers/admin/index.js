const User = require('../../models/User');
const AppError = require('../../utils/AppError');
const catchAsync = require('../../utils/catchAsync');
const jwt = require('jsonwebtoken');

//@desc         get user information
//@route        GET /api/users
//@access       PUBLIC
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, role: 'admin' });
  if (!user || password !== process.env.ADMIN_PASSWORD) {
    return next(AppError('Email hoặc mật khẩu không hợp lệ', 404));
  }

  res.status(200).json({
    accessToken: jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }),
  });
});

module.exports = {
  userController: require('./userController'),
  login,
};
