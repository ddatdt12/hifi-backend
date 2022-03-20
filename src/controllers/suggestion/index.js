const Skill = require('../../models/Skill');
const catchAsync = require('../../utils/catchAsync');
const Category = require('../../models/Category');
const Utils = require('../../utils');

const getSkills = catchAsync(async (req, res) => {
	const { q, selected } = req.query;
	const selectedSkill = [];
	if (selected) {
		selected.split(',').forEach((id) => {
			if (Utils.isValidObjectId(id)) {
				selectedSkill.push(id);
			}
		});
	}
	const data = await Skill.search(q, selectedSkill);
	res.status(200).json({
		message: 'search skills successfully',
		data,
	});
});

const getAllCategory = catchAsync(async (req, res, next) => {
	const categories = await Category.find({}).populate('subcategories').lean();
	res.status(200).json({
		message: 'Get all categories',
		categories,
	});
});
module.exports = { getSkills, getAllCategory };
