const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Education = new Schema(
	{
		userId: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
		school: { type: String, required: true },
		degree: { type: String, required: true },
		fieldStudy: { type: String, required: true },
		startDate: { type: Date, required: true },
		endDate: { type: Date },
		isPresent: Boolean,
		notes: String,
	},
	{
		timestamps: true,
	}
);
Education.virtual('user', {
	ref: 'User',
	localField: 'userId',
	foreignField: '_id',
});
module.exports = mongoose.model('Education', Education);
