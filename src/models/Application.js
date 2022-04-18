const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema(
	{
		userId: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
		postId: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
		resume: {
			fileName: { type: String, required: true },
			fileUrl: { type: String, required: true },
		},
		phoneNumber: { type: String, required: true },
		coverLetter: {
			type: String,
		},
		status: {
			type: String,
			enum: ['NEW', 'IN_REVIEW', 'INTERVIEWING', 'REJECTED', 'HIRED'],
			default: 'NEW',
		},
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
		},
		toObject: {
			virtuals: true,
		},
	}
);
ApplicationSchema.virtual('user', {
	justOne: true,
	ref: 'User',
	localField: 'userId',
	foreignField: '_id',
});
ApplicationSchema.virtual('post', {
	justOne: true,
	ref: 'Post',
	localField: 'postId',
	foreignField: '_id',
});
module.exports = mongoose.model('Application', ApplicationSchema);
