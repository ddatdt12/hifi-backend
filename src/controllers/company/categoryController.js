const catchAsync = require('../../utils/catchAsync');
const Category = require('../../models/Category');
const { getOrSetCache } = require('../../services/redis');
//@desc         get all category
//@route        GET /api/admin/categories (or 0)
//@access       PRIVATE
const getAllCategories = catchAsync(async (req, res) => {
	const categories = await getOrSetCache('categories', () =>
		Category.find({}).lean()
	);
	res.status(200).json({
		message: 'Get all categories',
		categories,
	});
});

module.exports = { getAllCategories };
