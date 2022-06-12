const catchAsync = require('../../utils/catchAsync');
const Application = require('../../models/Application');
const { Post, FavoritePost, Subcategory } = require('../../models');
const { getOrSetCache } = require('../../services/redis');

//@desc         get all post
//@route        GET /api/admin/posts
//@access       PRIVATE
const getAllPost = catchAsync(async (req, res) => {
	var objQuery = {
		verficationStatus: 'fulfilled',
		applicationDeadline: { $gte: Date.now() },
	};

	//search
	if (req.query.search) {
		objQuery = {
			...objQuery,
			$text: { $search: req.query.search },
		};
	}
	//filter by category
	if (req.query.jobCategory) {
		const arrIdSubCategory = req.query.jobCategory.split(',');
		objQuery = {
			...objQuery,
			jobCategory: { $in: arrIdSubCategory },
		};
	}

	//filter by salary
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
	const result = await Post.paginate(objQuery, {
		populate: [
			{
				path: 'jobCategory',
				select: '_id name',
			},
			{ path: 'company', select: '_id name logo locations' },
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
	let data = result.docs;
	if (req.idUser) {
		data = await Promise.all(
			result.docs.map(async (e) => {
				const isExisted =
					(await FavoritePost.findOne({
						post: e._id,
						user: req.idUser,
					}).count()) > 0;

				const locationMap = new Map(
					e?.company.locations.map((l) => [l._id.toString(), l])
				);

				return {
					...e,
					locations: e.locations
						.map((l) => locationMap.get(l.toString()))
						.filter((l) => l),
					isFavorited: isExisted,
				};
			})
		);
	}

	console.log(
		'data: ',
		data.map((l) => ({
			locations: l.locations,
			companyLoca: l.company.locations,
		}))
	);
	res.status(200).json({
		message: 'Get all posts',
		totalItems: result.totalDocs,
		data: data,
		totalPages: result.totalPages,
	});
});

//@desc         get by id
//@route        GET /api/admin/posts/:id
//@access       PRIVATE
const getPostById = catchAsync(async (req, res) => {
	const { id } = req.params;

	let post = await getOrSetCache('posts:' + id, () =>
		Post.findById(id)
			.populate({
				path: 'skillTags',
				select: '_id text',
			})
			.populate('jobCategory')
			.populate('company')
			.populate('salary')
			.lean()
	);

	const locationMap = new Map(post?.company.locations.map((l) => [l._id, l]));

	post.locations = post.locations
		.map((l) => locationMap.get(l))
		.filter((l) => l);

	if (req.idUser) {
		const application = await Application.findOne({
			userId: req.idUser,
			postId: id,
		});
		const isExisted =
			(await FavoritePost.findOne({
				post: id,
				user: req.idUser,
			}).count()) > 0;
		post = {
			...post,
			application,
			isFavorited: isExisted,
		};
	}

	res.status(200).json({
		message: 'Get post by id',
		data: post,
	});
});

//@desc         get option filter (company, catelogy)
//@route        GET /api/admin/posts/filter-option
//@access       PRIVATE
const getFilterOption = catchAsync(async (req, res) => {
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

const addFavoritePost = catchAsync(async (req, res) => {
	const { userId, postId } = req.body;
	if (userId && postId) {
		const favoritePost = {
			user: userId,
			post: postId,
		};
		const result = await FavoritePost.create(favoritePost);

		res.status(200).json({
			message: 'Favorited',
			data: result,
		});
	}
});

const deleteFavoritePost = catchAsync(async (req, res) => {
	const { userId, postId } = req.body;
	const result = await FavoritePost.deleteOne({ user: userId, post: postId });
	res.status(200).json({
		message: 'Deleted',
		data: {
			status: true,
		},
	});
});

const getFavoritePosts = catchAsync(async (req, res) => {
	const { idUser } = req.params;
	const page = req.query.page || 1;
	const limit = req.query.limit || 10;
	const offset = (page - 1) * limit;
	const result = await FavoritePost.paginate(
		{ user: idUser },
		{
			select: 'post',
			populate: [
				{
					path: 'post',
					populate: [
						{
							path: 'jobCategory',
							select: '_id name',
						},
						{ path: 'company', select: '_id name logo' },
						{
							path: 'skillTags',
							select: '_id text',
						},
					],
				},
			],
			sort: 'updatedAt',
			offset,
			limit,
			lean: true,
		}
	);
	res.status(200).json({
		message: 'Get favorite post',
		totalItems: result.totalDocs,
		data: result.docs,
		totalPages: result.totalPages,
	});
});
module.exports = {
	getAllPost,
	getPostById,
	getFilterOption,
	addFavoritePost,
	deleteFavoritePost,
	getFavoritePosts,
};
