const User = require('../../models/User');
const catchAsync = require('../../utils/catchAsync');

const readNotification = catchAsync(async (req, res, next) => {
	const { adminId, notificationId } = req.body;

	var user = await User.updateOne(
		{ _id: adminId, 'notifications._id': notificationId },
		{ $set: { 'notifications.$.isRead': true } }
	);

	if (user != null) {
		res.status(200).json({
			message: 'Notification is read',
			data: user,
		});
	}
});

module.exports = { readNotification };
