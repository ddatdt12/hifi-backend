const Post = require('../../models/Post');
const AppError = require('../../utils/AppError');
const catchAsync = require('../../utils/catchAsync');

//@desc         get all post
//@route        GET /api/job-seeker/posts
//@access       PRIVATE
const getAllPosts = catchAsync(async (req, res) => {
	const posts = await Post.find({}).lean();
	res.status(200).json({
		message: 'Get all post successfully',
		data: posts,
	});
});

//@desc         get post detaill
//@route        GET /api/job-seeker/posts/:id
//@access       PRIVATE
const getPostDetail = catchAsync(async (req, res, next) => {
	const post = await Post.findById(req.params.id).populate('company').lean();

	if (!post) {
		return next(new AppError('No Post found with that id', 404));
	}

	res.status(200).json({
		message: 'Get all post successfully',
		data: post,
	});
});

module.exports = { getAllPosts, getPostDetail };
