const { Server } = require('socket.io');

const ConnectMessage = (server) => {
	const io = new Server(server, {
		cors: { origin: true, credentials: true },
		path: '/message',
	});

	require('../controllers/messageController')(io);
};

const ConnectNotification = (server) => {
	const io = new Server(server, {
		cors: { origin: true, credentials: true },
		path: '/notification',
	});

	require('../controllers/notificationController')(io);
};

module.exports = { ConnectMessage, ConnectNotification };
