const catchAsync = require('../../utils/catchAsync');
const Skill = require('../../models/Skill');

const getSkills = catchAsync(async (req, res) => {
	const { q } = req.query;
	const skillQuery = Skill.find({}).lean();

	if (q) {
		skillQuery.find({
			text: new RegExp(q, 'gi'),
		});
	}
	res.status(200).json({
		message: 'create skills successfully',
		data: await skillQuery,
	});
});

const createSkill = catchAsync(async (req, res) => {
	const { text } = req.body;
	if (!text || !text.trim()) {
		return res.status(400).json({
			message: 'Skill name is required',
		});
	}

	if (await Skill.findOne({ text })) {
		return res.status(400).json({
			message: 'Skill name is existed',
		});
	}
	const skill = await Skill.create({ text });
	res.status(200).json({
		message: 'create skills successfully',
		data: skill,
	});
});
const createBatchSkills = catchAsync(async (req, res) => {
	const { skills } = req.body;
	if (!skills || !Array.isArray(skills) || skills.length === 0) {
		return res.status(400).json({
			message: 'Skills is required',
		});
	}

	const skillInDB = await Skill.findOne({ text: { $in: skills } });
	if (skillInDB) {
		return res.status(400).json({
			message: skillInDB.text + ' is existed',
			value: skillInDB.text,
		});
	}
	const skill = await Skill.create(skills.map((skill) => ({ text: skill })));
	res.status(200).json({
		message: 'create skills successfully',
		data: skill,
	});
});

const updateSkill = catchAsync(async (req, res) => {
	const { text } = req.body;

	const user = await Skill.findByIdAndUpdate(
		req.params.id,
		{ text },
		{ new: true, runValidators: true }
	);
	res.status(200).json({
		message: 'update skill successfully',
		data: user,
	});
});
const deleteSkill = catchAsync(async (req, res) => {
	await Skill.findByIdAndDelete(req.params.id);
	res.status(200).json({
		message: 'delete skill successfully',
		data: null,
	});
});

module.exports = {
	getSkills,
	createSkill,
	updateSkill,
	deleteSkill,
	createBatchSkills,
};
