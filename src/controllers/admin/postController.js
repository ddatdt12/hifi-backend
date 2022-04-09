const catchAsync = require('../../utils/catchAsync');
const Post = require('../../models/Post');

//@desc         get all post
//@route        GET /api/admin/posts
//@access       PRIVATE
const getAllPost = catchAsync(async (req, res, next) => {
	const posts = await Post.find({}).lean();
	res.status(200).json({
		message: 'Get all posts',
		posts,
	});
});

//@desc         approve post
//@route        PATCH /api/admin/posts/:id
//@access       PRIVATE
const approvePost = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	console.log(req.body);
	const { isApproved } = req.body;
	const posts = await Post.findByIdAndUpdate(
		id,
		{
			verficationStatus: 'pending',
			// verficationStatus: isApproved ? 'fulfilled' : 'rejected',
		},
		{ new: true, runValidators: true }
	);

	res.status(200).json({
		message: isApproved
			? 'This post has been approved'
			: 'This post is not approved',
		data: posts,
	});
});

//@desc         get by id
//@route        GET /api/admin/posts/:id
//@access       PRIVATE
const getPostById = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const post = await Post.findById(id).populate('skillTags').lean();
	res.status(200).json({
		message: 'Get post by id',
		data: post,
	});
});

//@desc         get post pending
//@route        GET /api/admin/posts/pending
//@access       PRIVATE
const getPostsPending = catchAsync(async (req, res, next) => {
	const posts = await Post.find({ verficationStatus: 'pending' })
		.populate({ path: 'jobCategories', populate: { path: 'category' } })
		.lean();
	res.status(200).json({
		message: 'Get posts pending',
		data: posts,
	});
});

//@desc         get post approved
//@route        GET /api/admin/posts/approved
//@access       PRIVATE
const getPostsApproved = catchAsync(async (req, res, next) => {
	const posts = await Post.find({ verficationStatus: 'fulfilled' }).lean();
	res.status(200).json({
		message: 'Get posts approved',
		data: posts,
	});
});

module.exports = {
	getAllPost,
	approvePost,
	getPostById,
	getPostsApproved,
	getPostsPending,
};
