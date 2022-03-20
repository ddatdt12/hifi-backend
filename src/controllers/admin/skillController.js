const Skill = require('../../models/Skill');
const catchAsync = require('../../utils/catchAsync');

//FIXME: Need change in the future
const getAllSkills = catchAsync(async (req, res, next) => {
	const data = await Skill.find({}).lean();
	res.status(200).json({
		message: 'Get all skills',
		data,
	});
});

const createSkills = catchAsync(async (req, res, next) => {
	const { data } = req.body;
	const skills = await Skill.create(data);
	res.status(200).json({
		message: 'Create skills successfully',
		data: skills,
	});
});

module.exports = { getAllSkills, createSkills };
