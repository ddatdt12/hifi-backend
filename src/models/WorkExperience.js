const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkExperience = new Schema(
	{
		userId: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
		jobTitle: { type: String, required: true },
		company: { type: String, required: true },
		startDate: { type: Date, required: true },
		endDate: { type: Date },
		isPresent: Boolean,
		notes: String,
	},
	{
		timestamps: true,
	}
);
WorkExperience.virtual('user', {
	ref: 'User',
	localField: 'userId',
	foreignField: '_id',
});
module.exports = mongoose.model('WorkExperience', WorkExperience);
