const User = require('../../models/User');
const catchAsync = require('../../utils/catchAsync');

const readNotification = catchAsync(async (req, res, next) => {
	const { idUser, idNotification } = req.body;

	var user = await User.updateOne(
		{ _id: idUser, 'notifications._id': idNotification },
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
