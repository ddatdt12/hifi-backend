const catchAsync = require('../../utils/catchAsync');
const Post = require('../../models/Post');
const Subcategory = require('../../models/Subcategory');
const Company = require('../../models/Company');
const Category = require('../../models/Category');
const { getOrSetCache, deleteKeyIfExist } = require('../../services/redis');

//@desc         create job post
//@route        POST /api/recruiter/posts
//@access       PRIVATE
const createJobPost = catchAsync(async (req, res) => {
	const post = await Post.create({ ...req.body, company: req.user._id });

	res.status(200).json({
		message: 'create new post successfully',
		post,
	});
});

//@desc         get all post
//@route        GET /api/admin/posts
//@access       PRIVATE
const getAllPost = catchAsync(async (req, res) => {
	let objQuery = {
		verficationStatus: { $in: ['pending', 'fulfilled', 'rejected'] },
		company: req.user._id,
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
		sort: '-createdAt',
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

//@desc         get by id
//@route        GET /api/admin/posts/:id
//@access       PRIVATE
const getPostById = catchAsync(async (req, res) => {
	const { id } = req.params;
	const post = await getOrSetCache('posts:' + id, () =>
		Post.findById(id)
			.populate({ path: 'jobCategory', populate: { path: 'category' } })
			.populate({
				path: 'company',
			})
			.populate({
				path: 'skillTags',
				select: '_id text',
			})
			.lean()
	);
	res.status(200).json({
		message: 'Get post by id',
		data: post,
	});
});

//@desc         get by id
//@route        PUT /api/admin/posts/:id
//@access       PRIVATE
const updatePost = catchAsync(async (req, res) => {
	const { id } = req.params;
	const post = await Post.findByIdAndUpdate(id, req.body, {
		new: true,
		runValidators: true,
	});
	deleteKeyIfExist('posts:' + id).catch((err) =>
		console.log('clear cache error', err)
	);
	res.status(200).json({
		message: 'Update post successfully',
		data: post,
	});
});

//@desc         delete post
//@route        DELETE /api/admin/posts/:id
//@access       PRIVATE
const deletePost = catchAsync(async (req, res) => {
	const { id } = req.params;
	const result = await Post.findByIdAndUpdate(
		id,
		{
			verficationStatus: 'deleted',
		},
		{ new: true, runValidators: true }
	);
	deleteKeyIfExist('posts:' + id).catch((err) =>
		console.log('clear cache error', err)
	);

	res.status(200).json({
		message: 'Delete posts',
		data: result,
	});
});

//@desc         get option filter (company, catelogy)
//@route        GET /api/admin/posts/filter-option
//@access       PRIVATE
const getFilterOption = catchAsync(async (req, res) => {
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

//@desc         get job post
//@route        GET /api/employer/posts/company/:idCompany
//@access       PRIVATE
const getAllPostByCompany = catchAsync(async (req, res) => {
	const { idCompany } = req.params;
	const posts = await Post.find({ idCompany: idCompany }).select(['title']);
	res.status(200).json({
		message: 'Get all post by company successfully',
		data: posts,
	});
});

module.exports = {
	getAllPost,
	createJobPost,
	getPostById,
	deletePost,
	updatePost,
	getFilterOption,
	getAllPostByCompany,
};
