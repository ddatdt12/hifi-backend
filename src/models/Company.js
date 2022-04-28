const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const CompanySchema = new Schema(
	{
		email: {
			type: String,
			required: [true, 'Email is required'],
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
			select: false,
		},
		name: {
			type: String,
			required: [true, 'Please enter company name!'],
		},
		phoneNumber: {
			type: String,
		},
		industries: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'Subcategory',
			},
		],
		address: String,
		locations: [
			{
				officeName: String,
				city: String,
				address: String,
			},
		],
		size: {
			type: String,
		},
		logo: {
			type: String,
		},
		images: [String],
		contactName: String,
		summary: String,
		accountStatus: {
			type: String,
			enum: ['pending', 'rejected', 'fullfilled', 'deleted'],
			default: 'pending',
		},
	},
	{
		timestamps: true,
	}
);

CompanySchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	this.password = await bcrypt.hash(this.password, 12);
	next();
});

CompanySchema.methods.comparePassword = async function (password) {
	const isMatch = await bcrypt.compare(password, this.password);
	this.password = undefined;
	return isMatch;
};

CompanySchema.methods.generateToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

module.exports = mongoose.model('Company', CompanySchema);
