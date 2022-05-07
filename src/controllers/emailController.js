const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const crypto = require('crypto');
const { sendVerificationEmail } = require('../services/email');
const User = require('../models/User');

const userTokenMap = new Map();
//@desc         Send Email Verification
//@route        POST /api/email/verify-account
//@access       PUBLIC
const sendEmailVerification = catchAsync(async (req, res, next) => {
	const { email } = req.body;

	const account = await User.findOne({ email });
	if (!account) {
		return next(new AppError('Account was not found', 404));
	}
	if (account.isVerified) {
		return next(new AppError('Account is already verified', 400));
	}
	const token = crypto.randomBytes(32).toString('hex');

	userTokenMap.set(account._id.toString(), token);
	const message = `Follow the link below to set a new password: \n${process.env.FRONT_END_URL}/account-verification/${account._id}/${token}`;
	await sendVerificationEmail({
		email,
		message,
	});

	res.status(200).json({
		message: 'Email sent successfully',
	});
});

//@desc         verify Token from account verification email
//@route        GET /api/email/verify-account/:accountId/:token'
//@access       PUBLIC
const verifyTokenEmail = catchAsync(async (req, res, next) => {
	const { accountId, token } = req.params;
	const userToken = userTokenMap.get(accountId);
	if (!userToken || userToken !== token) {
		return next(new AppError('Invalid token', 400));
	}

	await User.updateOne(
		{
			_id: accountId,
			isVerified: false,
		},
		{
			isVerified: true,
		}
	);
	userTokenMap.delete(accountId);
	res.status(200).json({
		message: 'Account verified successfully',
	});
});

module.exports = { sendEmailVerification, verifyTokenEmail };
