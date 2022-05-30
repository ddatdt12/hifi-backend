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
		preferredStartDate: Date,
		typesOfOpportunity: [String],
		currencyCode: String,
		workLocation: String,
		salaryExpectation: Number,
		willingToWorkRemotely: { type: Boolean, default: false },
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
