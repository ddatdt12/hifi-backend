const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Award = new Schema(
	{
		userId: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
		title: { type: String, required: true },
		achievement: { type: String, required: true },
		year: {
			type: Number,
			required: true,
		},
		notes: String,
	},
	{
		timestamps: true,
	}
);
Award.virtual('user', {
	ref: 'User',
	localField: 'userId',
	foreignField: '_id',
});
module.exports = mongoose.model('Award', Award);
