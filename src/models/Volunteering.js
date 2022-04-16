const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Volunteering = new Schema(
	{
		userId: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
		activityName: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			required: true,
		},
		startDate: { type: Date, required: true },
		endDate: { type: Date },
		isPresent: Boolean,
		notes: String,
	},
	{
		timestamps: true,
	}
);
Volunteering.virtual('user', {
	ref: 'User',
	localField: 'userId',
	foreignField: '_id',
});
module.exports = mongoose.model('Volunteering', Volunteering);
