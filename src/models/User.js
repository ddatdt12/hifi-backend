const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		uid: {
			type: String,
		},
		signInProvider: {
			type: String,
		},
		email: {
			type: String,
			required: true,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		name: {
			type: String,
			required: [true, 'Vui lòng nhập tên'],
			maxlength: 80,
		},
		photoUrl: {
			type: String,
		},
		phoneNumber: String,
		location: {
			city: String,
			country: String,
		},
		age: Number,
		gender: {
			type: String,
			enum: ['Male', 'Female'],
		},
		nationality: String,
		about: String,
		skills: [{ type: mongoose.Types.ObjectId }],
		resume: {
			fileName: String,
			url: String,
		},
		socialNetwork: {
			facebook: String,
			linkedIn: String,
			github: String,
			twitter: String,
		},
	},
	{
		timestamps: true,
	}
);
UserSchema.virtual('preferences', {
	ref: 'JobInterest',
	localField: '_id',
	foreignField: 'category',
});
module.exports = mongoose.model('User', UserSchema);
