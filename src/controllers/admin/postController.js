const catchAsync = require('../../utils/catchAsync');
const { Post, Company, Category } = require('../../models');
const APIFeatures = require('../../utils/APIFeatures');

//@desc         get all post
//@route        GET /api/admin/posts
//@access       PRIVATE
const getAllPost = catchAsync(async (req, res, next) => {
	var features = new APIFeatures(
		Post.find({
			verficationStatus: { $in: ['pending', 'fulfilled', 'rejected'] },
		})
			.populate({ path: 'jobCategories', populate: { path: 'category' } })
			.populate({
				path: 'company',
				select: '_id name',
			})
			.lean(),
		req.query
	)
		.paginating()
		.searching()
		.sorting()
		.filtering(['company']);

	var posts = await features.query;
	const category = req.query.category?.split(',');
	if (category) {
		posts = posts.filter((e) =>
			category.includes(e.jobCategories[0]?.category._id.toString())
		);
	}

	res.status(200).json({
		message: 'Get all posts',
		data: posts,
	});
});

//@desc         approve/reject post
//@route        PATCH /api/admin/posts/:id
//@access       PRIVATE
const approvePost = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const { isApproved } = req.body;
	const posts = await Post.findByIdAndUpdate(
		id,
		{
			verficationStatus: isApproved ? 'fulfilled' : 'rejected',
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

//@desc         delete post
//@route        DELETE /api/admin/posts/:id
//@access       PRIVATE
const deletePost = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const result = await Post.findByIdAndUpdate(
		id,
		{
			verficationStatus: 'deleted',
		},
		{ new: true, runValidators: true }
	);
	res.status(200).json({
		message: 'Delete posts',
		data: result,
	});
});

//@desc         get option filter (company, catelogy)
//@route        GET /api/admin/posts/filter-option
//@access       PRIVATE
const getFilterOption = catchAsync(async (req, res, next) => {
	//company option
	const companies = await Company.find({}, { name: 1, _id: 1 });
	//catelogy option
	const categories = await Category.find({}, { name: 1 });

	res.status(200).json({
		message: '',
		data: {
			companyOption: Array.from(companies),
			categoryOption: Array.from(categories),
		},
	});
});

//@desc        	search by title, company name
//@route        GET /api/admin/posts/approved
//@access       PRIVATE
// const search = catchAsync(async (req, res, next) => {
// 	const posts = await Post.find({ verficationStatus: 'fulfilled' }).lean();
// 	res.status(200).json({
// 		message: 'Search by title or company name',
// 		data: posts,
// 	});
// });

module.exports = {
	getAllPost,
	approvePost,
	getPostById,
	deletePost,
	getFilterOption,
};