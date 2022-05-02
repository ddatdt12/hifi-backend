const catchAsync = require('../../utils/catchAsync');
const Post = require('../../models/Post');
//@desc         get all posts
//@route        GET /api/recruiter/posts
//@access       PRIVATE
const getAllPost = catchAsync(async (req, res) => {
	const posts = await Post.find({})
		.populate('jobCategories')
		.populate('skillTags')
		.lean();
	res.status(200).json({
		message: 'Get all post successfully',
		data: posts,
	});
});

//@desc         create job post
//@route        POST /api/recruiter/posts
//@access       PRIVATE
const createJobPost = catchAsync(async (req, res) => {
	const post = await Post.create(req.body);

	console.log(req.body);
	res.status(200).json({
		message: 'create new post successfully',
		post,
	});
});

//@desc         create job post
//@route        GET /api/recruiter/posts/:idCompany
//@access       PRIVATE
const getAllPostByCompany = catchAsync(async (req, res) => {
	const { idCompany } = req.params;
	const posts = await Post.find({ idCompany: idCompany }).select(['title']);
	res.status(200).json({
		message: 'Get all post by company successfully',
		data: posts,
	});
});

module.exports = { getAllPost, createJobPost, getAllPostByCompany };
