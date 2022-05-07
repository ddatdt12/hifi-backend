const Skill = require('../../models/Skill');
const catchAsync = require('../../utils/catchAsync');
const Category = require('../../models/Category');
const User = require('../../models/User');
const Utils = require('../../utils');
const Room = require('../../models/Room');

const universities = require('../../data/universities.json').data;
const degrees = require('../../data/degrees.json').data;
const majors = require('../../data/majors.json').data;

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

const getAllUser = catchAsync(async (req, res, next) => {
	const users = await User.find({}).lean();
	res.status(200).json({
		message: 'Get all categories',
		users,
	});
});

const getRoomsByUserId = catchAsync(async (req, res, next) => {
	const { userId } = req.params;
	const rooms = await Room.find({ chatters: { $elemMatch: { $eq: userId } } })
		.populate('chatters')
		.lean();
	res.status(200).json({
		message: 'Get all room by user',
		value: rooms,
	});
});

const getAllRooms = catchAsync(async (req, res, next) => {
	const rooms = await Room.find({}).populate('chatters').lean();
	res.status(200).json({
		message: 'Get all room by user',
		value: rooms,
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
	getAllUser,
	getRoomsByUserId,
	getUniversities,
	getDegrees,
	getMajors,
	getAllRooms,
};
