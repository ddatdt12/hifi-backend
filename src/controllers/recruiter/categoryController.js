const { convertBooleanQuery } = require("../../utils");
const AppError = require("../../utils/AppError");
const catchAsync = require("../../utils/catchAsync");
const Category = require("../../models/Category");
//@desc         get all category
//@route        GET /api/admin/categories (or 0)
//@access       PRIVATE
const getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find({}).lean();
  res.status(200).json({
    message: "Get all categories",
    categories,
  });
});

module.exports = { getAllCategories };
