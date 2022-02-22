const catchAsync = require('../../utils/catchAsync');


//@desc         get user information
//@route        GET /api/users
//@access       PRIVATE
const getUsers = catchAsync(async (req, res, next) => {
  res.status(200).json({
    message: 'getUsers route',
  });
});

module.exports = { getUsers };
