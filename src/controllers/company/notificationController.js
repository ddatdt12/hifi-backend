const Company = require('../../models/Company');
const catchAsync = require('../../utils/catchAsync');

const readNotification = catchAsync(async (req, res, next) => {
	const { idCompany, idNotification } = req.body;

	var company = await Company.updateOne(
		{ _id: idCompany, 'notifications._id': idNotification },
		{ $set: { 'notifications.$.isRead': true } }
	);

	if (company != null) {
		res.status(200).json({
			message: 'Notification is read',
			data: company,
		});
	}
});

module.exports = { readNotification };
