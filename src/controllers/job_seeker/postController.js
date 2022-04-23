const catchAsync = require('../../utils/catchAsync');
const { Post, Company, Category } = require('../../models');
const APIFeatures = require('../../utils/APIFeatures');

//@desc         get all post
//@route        GET /api/admin/posts
//@access       PRIVATE
const getAllPost = catchAsync(async (req, res, next) => {
	var features = new APIFeatures(
		Post.find({
			// verficationStatus: 'fulfilled',
		})
			.populate({
				path: 'skillTags',
				select: '_id text',
			})
			.populate('company')
			.populate('salary')
			.lean(),
		req.query
	)
		.paginating()
		.searching()
		.sorting()
		.filtering(['company']);

	const posts = await features.query;

	res.status(200).json({
		message: 'Get all posts',
		data: posts,
	});
});

//@desc         get by id
//@route        GET /api/admin/posts/:id
//@access       PRIVATE
const getPostById = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const post = await Post.findById(id)
		.populate({
			path: 'skillTags',
			select: '_id text',
		})
		.populate('company')
		.populate('salary')
		.lean();
	res.status(200).json({
		message: 'Get post by id',
		data: post,
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
module.exports = {
	getAllPost,
	getPostById,
	getFilterOption,
};
