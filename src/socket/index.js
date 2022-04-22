const { Server } = require('socket.io');
const { sendDataClient } = require('./chatting');
const { joinRoom, disconnect } = require('./room');

const ConnectSocket = (server) => {
	const io = new Server(server, {
		cors: { origin: true, credentials: true },
	});

	io.on('connection', (socket) => {
		///Handle khi có connect từ client tới
		console.log('New client connected ' + socket.id);

		socket.on('joinRoom', (data) => {
			joinRoom(socket, data);
		});

		socket.on('sendDataClient', (data) => {
			sendDataClient(data, io);
		});

		socket.on('disconnect', () => {
			disconnect();
		});
	});
};

module.exports = ConnectSocket;
