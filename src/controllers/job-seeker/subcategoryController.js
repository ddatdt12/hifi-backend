const catchAsync = require('../../utils/catchAsync');
const Subcategory = require('../../models/Subcategory');

const getSubByCategoryId = catchAsync(async (req, res) => {
	const listSub = await Subcategory.find({
		category: req.params.categoryId,
	});
	res.status(200).json({
		message: 'Get all subcategories',
		value: listSub,
	});
});

module.exports = { getSubByCategoryId };
