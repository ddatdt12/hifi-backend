const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobInterest = new Schema(
	{
		userId: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
		fields: [
			{
				job: { type: String, required: true },
				role: { type: String, required: true },
			},
		],
		preference: {
			type: {
				fullTime: Boolean,
				internship: Boolean,
				partTime: Boolean,
				freelance: Boolean,
			},
			currencyCode: String,
			workLocation: String,
			salaryExpectation: Number,
			willingToWorkRemotely: Boolean,
		},
	},
	{
		timestamps: true,
	}
);
JobInterest.virtual('user', {
	ref: 'User',
	localField: 'userId',
	foreignField: '_id',
});
module.exports = mongoose.model('JobInterest', JobInterest);
