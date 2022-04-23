const Skill = require('../../models/Skill');
const catchAsync = require('../../utils/catchAsync');
const Category = require('../../models/Category');
const Utils = require('../../utils');
const universities = require('../../data/universities.json').data;
const degrees = require('../../data/degrees.json').data;
const majors = require('../../data/majors.json').majors;
const getSkills = catchAsync(async (req, res) => {
	const { q, selected, limit } = req.query;
	const selectedSkill = [];
	if (selected) {
		selected.split(',').forEach((id) => {
			if (Utils.isValidObjectId(id)) {
				selectedSkill.push(id);
			}
		});
	}
	const data = await Skill.search(q, selectedSkill, limit);
	res.status(200).json({
		message: 'search skills successfully',
		data,
	});
});

const getAllCategory = catchAsync(async (req, res, next) => {
	const categories = await Category.find({}).populate('subcategories').lean();
	res.status(200).json({
		message: 'Get all categories',
		data: categories,
	});
});
const getUniversities = catchAsync(async (req, res, next) => {
	res.status(200).json({
		message: 'Get all categories',
		data: universities,
	});
});
const getDegrees = catchAsync(async (req, res, next) => {
	res.status(200).json({
		message: 'Get all categories',
		data: degrees,
	});
});
const getMajors = catchAsync(async (req, res, next) => {
	res.status(200).json({
		message: 'Get all categories',
		data: majors.filter((m) => m.isMajor).map((m) => m.name),
	});
});
module.exports = {
	getSkills,
	getAllCategory,
	getUniversities,
	getDegrees,
	getMajors,
};
