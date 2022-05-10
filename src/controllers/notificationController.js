const Company = require('../models/Company');
const User = require('../models/User');

module.exports = (io) => {
	io.on('connection', (socket) => {
		console.log('New client connect notification ', socket.id);

		socket.on('joinNotification', (params) => {
			socket.join(params.receiver);
		});

		socket.on('sendNotification', (request) => {
			switch (request.receiverType) {
				case 'company':
					handleUpdateNotiCompany(request, socket);
					break;
				case 'employee':
					handleUpdateNotiUser(request, socket);
					break;
				default:
					break;
			}
		});

		socket.on('leaveNotification', (params) => {
			socket.leave(params.reciever);
		});
	});
};

const handleUpdateNotiUser = (request, socket) => {
	User.findOneAndUpdate(
		{ _id: request.receiver },
		{
			$push: {
				notifications: {
					message: request.message,
					createdAt: request.createdAt,
					redirectUrl: request.redirectUrl,
				},
			},
		}
	)
		.then((res) => {
			socket.to(request.receiver).emit('receiveNotification', request);
		})
		.catch((error) => {
			console.log(error);
		});
};

const handleUpdateNotiCompany = (request, socket) => {
	Company.findOneAndUpdate(
		{ _id: request.receiver },
		{
			$push: {
				notifications: {
					message: request.message,
					createdAt: request.createdAt,
					redirectUrl: request.redirectUrl,
				},
			},
		},
		{ new: true }
	)
		.then((res) => {
			socket.to(request.receiver).emit('receiveNotification', res);
		})
		.catch((error) => {
			console.log(error);
		});
};
