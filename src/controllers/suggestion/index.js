const Skill = require('../../models/Skill');
const catchAsync = require('../../utils/catchAsync');
const Category = require('../../models/Category');
const User = require('../../models/User');
const Utils = require('../../utils');
const Room = require('../../models/Room');
const Post = require('../../models/Post');
const Subcategory = require('../../models/Subcategory');
const Company = require('../../models/Company');

const universities = require('../../data/universities.json').data;
const degrees = require('../../data/degrees.json').data;
const majors = require('../../data/majors.json').data;

const getSkills = catchAsync(async (req, res) => {
	const { q, selected, ids, limit } = req.query;

	if (ids) {
		const skills = await Skill.find({
			_id: { $in: ids.split(',') },
		});
		return res.status(200).json({
			message: 'get skills successfully',
			data: skills,
		});
	}

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
	const rooms = await Room.find({
		chatters: { $elemMatch: { chatterId: userId } },
	})
		.sort({ 'messages.createdAt': -1 })
		.lean();
	res.status(200).json({
		message: 'Get all room by user',
		value: rooms,
	});
});

const getAllRooms = catchAsync(async (req, res) => {
	const rooms = await Room.find({}).populate().lean();
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

const getPosts = catchAsync(async (req, res, next) => {
	const categoryId = req.params.categoryId;
	const listSub = await Subcategory.find({ category: categoryId });
	const arrIdSubCategory = listSub.map((subcategory) => subcategory._id);

	const posts = await Post.find({
		verficationStatus: 'fulfilled',
		applicationDeadline: { $gte: Date.now() },
		jobCategory: { $in: arrIdSubCategory },
	})
		.limit(8)
		.populate('company')
		.lean();

	res.status(200).json({
		message: 'Get all posts in landingpage by category',
		value: posts,
	});
});

const getCompanies = catchAsync(async (req, res, next) => {
	const { limit } = req.query;

	const companies = await Company.find()
		.select(['-notifications'])
		.limit(limit)
		.populate('industries')
		.lean();

	res.status(200).json({
		message: 'Get all companies',
		data: companies,
	});
});

const getCompany = catchAsync(async (req, res, next) => {
	const { idCompany } = req.params;

	const company = await Company.findOne({ _id: idCompany })
		.select(['-notifications'])
		.populate('industries')
		.lean();

	const posts = await Post.find({
		idCompany: idCompany,
		verficationStatus: 'fulfilled',
		applicationDeadline: { $gte: Date.now() },
	}).lean();

	res.status(200).json({
		message: 'Get company',
		data: { ...company, posts: posts },
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
	getPosts,
	getCompanies,
	getCompany,
};
