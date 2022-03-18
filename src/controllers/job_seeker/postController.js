const { convertBooleanQuery } = require("../../utils");
const AppError = require("../../utils/AppError");
const catchAsync = require("../../utils/catchAsync");
const Category = require("../../models/Category");

//@desc         get all post
//@route        GET /api/job-seeker/posts
//@access       PRIVATE
const getAllPost = catchAsync(async (req, res, next) => {
  const posts = await Post.find({}).lean();
  res.status(200).json({
    message: "Get all post successfully",
    posts,
  });
});

module.exports = { getAllPost };
