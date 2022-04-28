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
		birthDate: {
			type: Date,
		},
		photoUrl: {
			type: String,
		},
		phoneNumber: String,
		address: String,
		age: Number,
		gender: {
			type: String,
			enum: ['MALE', 'FEMALE'],
		},
		nationality: String,
		about: String,
		skills: [{ type: mongoose.Types.ObjectId, ref: 'Skill' }],
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
		candidateStatus: {
			type: String,
			enum: [
				'I_AM_LOOKING_FOR_JOB',
				'OPEN_FOR_OPPORTUNITIES',
				'I_AM_NOT_INTERESTED_IN_JOB',
			],
		},
		rooms: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'Room',
			},
		],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('User', UserSchema);
