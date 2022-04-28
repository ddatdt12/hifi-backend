const catchAsync = require('../../utils/catchAsync');
const User = require('../../models/User');

const getSkills = catchAsync(async (req, res) => {
	const user = await User.findById(req.user._id).populate('skills');
	console.log('User: ', user);
	res.status(200).json({
		message: 'create skills successfully',
		data: user,
	});
});

const updateSkills = catchAsync(async (req, res) => {
	const { skillIds = [] } = req.body;

	const user = await User.findByIdAndUpdate(
		req.user._id,
		{ skills: skillIds },
		{ new: true, runValidators: true }
	).populate('skills');
	res.status(200).json({
		message: 'create education successfully',
		data: user,
	});
});

module.exports = {
	getSkills,
	updateSkills,
};
