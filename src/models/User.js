const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		_id: {
			type: String,
		},
		signInProvider: {
			type: String,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
		},
		displayName: {
			type: String,
			required: [true, 'Vui lòng nhập tên'],
			maxlength: 80,
		},
		photoUrl: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('User', UserSchema);
