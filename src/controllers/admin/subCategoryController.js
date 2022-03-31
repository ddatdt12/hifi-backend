const Category = require('../../models/Category');
const SubCategory = require('../../models/SubCategory');
const catchAsync = require('../../utils/catchAsync');

const getAllSubCategories = catchAsync(async (req, res, next) => {
	const { id } = res.params;
	const result = await SubCategory.find({ category: id });

	res.status(200).json(result);
});

const batchCreateSubCategories = catchAsync(async (req, res, next) => {
	const { id } = res.params;
	const { subCategories } = req.body;

	if (!subCategories || !Array.isArray(subCategories)) {
		return next(new AppError('Invalid data', 500));
	}

	if (id) {
		const category = await Category.findById(id);
		if (!category) {
			return next(new AppError('Category not exists!'));
		}
		subCategories.forEach((sub) => (sub.category = id));
	}
	const result = await SubCategory.create(subCategories);

	res.status(200).json(result);
});

const updateSubCategory = catchAsync(async (req, res, next) => {
	const { name } = req.body;
	const { id } = req.params;

	const result = await SubCategory.findByIdAndUpdate(
		id,
		{ name: name },
		{ new: true, runValidators: true }
	);

	res.status(200).json(result);
});

const deleteSubCategory = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const result = await SubCategory.findByIdAndDelete(id);

	res.status(200).json(result);
});

module.exports = {
	batchCreateSubCategories,
	getAllSubCategories,
	updateSubCategory,
	deleteSubCategory,
};
