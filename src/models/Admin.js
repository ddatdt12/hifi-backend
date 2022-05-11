const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AdminSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			default: 'Admin',
		},
		username: {
			type: String,
			required: [true, 'Username is required'],
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
		},
		notifications: [
			{
				message: String,
				createdAt: Date,
				redirectUrl: String,
				isRead: {
					type: Boolean,
					default: false,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

AdminSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	this.password = await bcrypt.hash(this.password, 12);
	next();
});

AdminSchema.methods.comparePassword = async function (password) {
	const isMatch = await bcrypt.compare(password, this.password);
	this.password = undefined;
	return isMatch;
};

AdminSchema.methods.generateToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

module.exports = mongoose.model('Admin', AdminSchema);
