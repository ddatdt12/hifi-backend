const catchAsync = require('../../utils/catchAsync');
const Category = require('../../models/Category');
const { getOrSetCache } = require('../../services/redis');
const Subcategory = require('../../models/Subcategory');
const Post = require('../../models/Post');
//@desc         get all category
//@route        GET /api/admin/categories (or 0)
//@access       PRIVATE
const getAllCategories = catchAsync(async (req, res) => {
	Category.find({})
		.limit(6)
		.lean()
		.then(async (categories) => {
			let result = categories.map(async (category) => {
				const newCategory = getTotalJobs(category);
				return await newCategory;
			});
			res.status(200).json({
				message: 'Get all categories',
				value: await Promise.all(result),
			});
		});
});

const getTotalJobs = async (category) => {
	const listSub = await Subcategory.find({
		category: category._id,
	});
	const arrIdSubCategory = listSub.map((subcategory) => subcategory._id);
	const posts = await Post.find({
		jobCategory: { $in: arrIdSubCategory },
	}).lean();
	const newCategory = { ...category, jobs: posts.length };
	return newCategory;
};

module.exports = { getAllCategories };
