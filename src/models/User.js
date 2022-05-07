const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		uid: {
			type: String,
			required: true,
		},
		signInProvider: {
			type: String,
		},
		email: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: [true, 'Vui lòng nhập tên'],
			maxlength: 30,
		},
		rooms: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'Room',
			},
		],
		favoritePost: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'Post',
			},
		],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('User', UserSchema);
