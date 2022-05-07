const catchAsync = require('../../utils/catchAsync');
const { Post, Company, Subcategory } = require('../../models');
const ObjectId = require('mongodb').ObjectID;
const APIFeatures = require('../../utils/APIFeatures');

//@desc         get all post
//@route        GET /api/admin/posts
//@access       PRIVATE
const getAllPost = catchAsync(async (req, res, next) => {
	var objQuery = {};

	if (req.query.search) {
		objQuery = {
			$text: { $search: req.query.search },
		};
	}

	if (req.query.salary) {
		const salary = req.query.salary;
		if (!salary.negotiable) {
			var salaryVND = {
				'salary.negotiable': false,
				'salary.unit': 'vnd',
			};
			var salaryUSD = {
				'salary.negotiable': false,
				'salary.unit': 'usd',
			};

			if (salary.start) {
				salaryUSD = {
					...salaryUSD,
					'salary.max': { $gte: salary.start / 20000 },
				};
				salaryVND = {
					...salaryVND,
					'salary.max': { $gte: salary.start },
				};
			}
			if (salary.end) {
				salaryVND = {
					...salaryVND,
					'salary.min': { $lt: salary.end },
				};
				salaryUSD = {
					...salaryUSD,
					'salary.min': { $lt: salary.end / 20000 },
				};
			}
			objQuery = {
				...objQuery,
				$or: [salaryVND, salaryUSD],
			};
		} else {
			objQuery = {
				...objQuery,
				'salary.negotiable': true,
			};
		}
	}
	const page = req.query.page || 1;
	const limit = req.query.limit || 10;
	const offset = (page - 1) * limit;
	const tmp = await Post.paginate(objQuery, {
		populate: [
			'jobCategories',
			{ path: 'company', select: '_id name' },
			{
				path: 'skillTags',
				select: '_id text',
			},
		],
		offset,
		limit,
		lean: true,
	});
	res.status(200).json({
		message: 'Get all posts',
		// data: posts,
		totalItems: tmp.totalDocs,
		data: tmp.docs,
		totalPages: tmp.totalPages,
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
		.populate('jobCategories')
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
	//Level option
	//catelogy option
	const subCategories = await Subcategory.find({}, { name: 1 });

	res.status(200).json({
		message: '',
		data: {
			categoryOption: Array.from(subCategories),
		},
	});
});
module.exports = {
	getAllPost,
	getPostById,
	getFilterOption,
};
