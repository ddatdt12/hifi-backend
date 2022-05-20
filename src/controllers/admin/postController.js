const catchAsync = require('../../utils/catchAsync');
const { Post, Company, Category, Subcategory } = require('../../models');

//@desc         get all post
//@route        GET /api/admin/posts
//@access       PRIVATE
const getAllPost = catchAsync(async (req, res, next) => {
	let objQuery = {
		verficationStatus: { $in: ['pending', 'fulfilled', 'rejected'] },
	};

	//Search
	if (req.query.search) {
		objQuery = {
			...objQuery,
			$text: { $search: req.query.search },
		};
	}
	//filter by category
	if (req.query.category) {
		const arrIdCategory = req.query.category.split(',');
		const arrIdSubCategory = await Subcategory.find(
			{
				category: { $in: arrIdCategory },
			},
			{ select: '_id' }
		);
		objQuery = {
			...objQuery,
			jobCategory: { $in: arrIdSubCategory },
		};
	}
	//filter by company
	if (req.query.company) {
		const arrIdCompany = req.query.company.split(',');
		objQuery = {
			...objQuery,
			company: { $in: arrIdCompany },
		};
	}
	//filter by status
	if (req.query.verficationStatus) {
		objQuery = {
			...objQuery,
			verficationStatus: req.query.verficationStatus,
		};
	}

	const page = req.query.page || 1;
	const limit = req.query.limit || 10;
	const offset = (page - 1) * limit;
	const result = await Post.paginate(objQuery, {
		populate: [
			{ path: 'jobCategory', populate: { path: 'category' } },
			{
				path: 'company',
				select: '_id name',
			},
			{
				path: 'skillTags',
				select: '_id text',
			},
		],
		sort: 'createdAt',
		offset,
		limit,
		lean: true,
	});

	res.status(200).json({
		message: 'Get all posts',
		totalItems: result.totalDocs,
		data: result.docs,
		totalPages: result.totalPages,
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
	const post = await Post.findById(id)
		.populate({ path: 'jobCategory', populate: { path: 'category' } })
		.populate({
			path: 'company',
			select: '_id name',
		})
		.populate({
			path: 'skillTags',
			select: '_id text',
		})
		.lean();
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
