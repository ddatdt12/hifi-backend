const AppError = require("../../utils/AppError");
const catchAsync = require("../../utils/catchAsync");
const Post = require("../../models/Post");
//@desc         get all posts
//@route        GET /api/recruiter/posts
//@access       PRIVATE
const getAllPost = catchAsync(async (req, res, next) => {
  const posts = await Post.find({}).lean();
  res.status(200).json({
    message: "Get all post successfully",
    posts,
  });
});

//@desc         create job post
//@route        GET /api/recruiter/posts
//@access       PRIVATE
const createJobPost = catchAsync(async (req, res, next) => {
  // const posts = await Post.find({}).lean();

  // TODO: SAVE data

  res.status(200).json({
    message: "create new post successfully",
    post: req.body?.post || {},
  });
});

module.exports = { getAllPost, createJobPost };
